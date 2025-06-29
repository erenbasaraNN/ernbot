const {
  Client,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  REST,
  Routes,
} = require("discord.js")
const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

class DiscordBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
      ],
    })

    // Supabase client
    this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    this.commands = new Collection()
    this.tickets = new Map()
    this.giveaways = new Map()
    this.settings = new Map()

    this.setupEvents()
    this.setupCommands()
    this.registerSlashCommands()
  }

  setupEvents() {
    this.client.once("ready", async () => {
      console.log(`✅ Bot ${this.client.user.tag} olarak giriş yaptı!`)
      console.log(`📊 ${this.client.guilds.cache.size} sunucuda aktif`)

      this.client.user.setActivity("Sunucu Yönetimi | /help", { type: "WATCHING" })

      // Veritabanından ayarları yükle
      await this.loadSettings()
    })

    this.client.on("interactionCreate", async (interaction) => {
      try {
        if (interaction.isChatInputCommand()) {
          await this.handleCommand(interaction)
        } else if (interaction.isButton()) {
          await this.handleButton(interaction)
        } else if (interaction.isStringSelectMenu()) {
          await this.handleSelectMenu(interaction)
        }
      } catch (error) {
        console.error("Interaction hatası:", error)
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({ content: "Bir hata oluştu!", ephemeral: true })
        }
      }
    })

    this.client.on("guildCreate", async (guild) => {
      console.log(`➕ Yeni sunucuya eklendi: ${guild.name} (${guild.id})`)
      await this.initializeGuild(guild)
    })

    this.client.on("guildDelete", async (guild) => {
      console.log(`➖ Sunucudan çıkarıldı: ${guild.name} (${guild.id})`)
    })

    this.client.on("guildMemberAdd", async (member) => {
      await this.handleMemberJoin(member)
    })

    this.client.on("guildMemberRemove", async (member) => {
      await this.handleMemberLeave(member)
    })

    this.client.on("messageDelete", async (message) => {
      if (!message.author || message.author.bot) return
      await this.logEvent("MESSAGE_DELETE", message.guild.id, {
        user: message.author,
        channel: message.channel,
        content: message.content,
      })
    })

    this.client.on("messageUpdate", async (oldMessage, newMessage) => {
      if (!oldMessage.author || oldMessage.author.bot) return
      await this.logEvent("MESSAGE_UPDATE", oldMessage.guild.id, {
        user: oldMessage.author,
        channel: oldMessage.channel,
        oldContent: oldMessage.content,
        newContent: newMessage.content,
      })
    })
  }

  async setupCommands() {
    const commands = [
      {
        name: "ticket",
        description: "Ticket sistemi komutları",
        options: [
          {
            name: "create",
            description: "Yeni ticket oluştur",
            type: 1,
            options: [
              {
                name: "konu",
                description: "Ticket konusu",
                type: 3,
                required: true,
              },
            ],
          },
          {
            name: "close",
            description: "Ticket'ı kapat",
            type: 1,
          },
          {
            name: "add",
            description: "Kullanıcıyı ticket'a ekle",
            type: 1,
            options: [
              {
                name: "kullanici",
                description: "Eklenecek kullanıcı",
                type: 6,
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "giveaway",
        description: "Çekiliş sistemi komutları",
        options: [
          {
            name: "start",
            description: "Yeni çekiliş başlat",
            type: 1,
            options: [
              {
                name: "sure",
                description: "Çekiliş süresi (dakika)",
                type: 4,
                required: true,
              },
              {
                name: "odul",
                description: "Çekiliş ödülü",
                type: 3,
                required: true,
              },
              {
                name: "kazanan",
                description: "Kazanan sayısı",
                type: 4,
                required: true,
              },
            ],
          },
          {
            name: "end",
            description: "Çekilişi sonlandır",
            type: 1,
            options: [
              {
                name: "id",
                description: "Çekiliş mesaj ID'si",
                type: 3,
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "role",
        description: "Rol yönetimi komutları",
        options: [
          {
            name: "give",
            description: "Kullanıcıya rol ver",
            type: 1,
            options: [
              {
                name: "kullanici",
                description: "Rol verilecek kullanıcı",
                type: 6,
                required: true,
              },
              {
                name: "rol",
                description: "Verilecek rol",
                type: 8,
                required: true,
              },
            ],
          },
          {
            name: "remove",
            description: "Kullanıcıdan rol al",
            type: 1,
            options: [
              {
                name: "kullanici",
                description: "Rolü alınacak kullanıcı",
                type: 6,
                required: true,
              },
              {
                name: "rol",
                description: "Alınacak rol",
                type: 8,
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "help",
        description: "Bot komutları hakkında yardım",
      },
      {
        name: "setup",
        description: "Bot kurulum menüsü (Sadece yöneticiler)",
      },
    ]

    this.commands = commands
  }

  async registerSlashCommands() {
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN)

    try {
      console.log("🔄 Slash komutları kaydediliyor...")

      await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: this.commands })

      console.log("✅ Slash komutları başarıyla kaydedildi!")
    } catch (error) {
      console.error("❌ Slash komut kayıt hatası:", error)
    }
  }

  async loadSettings() {
    try {
      const { data: guilds } = await this.supabase.from("bot_settings").select("*")

      if (guilds) {
        guilds.forEach((guild) => {
          this.settings.set(guild.guild_id, guild)
        })
      }

      console.log(`📋 ${guilds?.length || 0} sunucu ayarı yüklendi`)
    } catch (error) {
      console.error("Ayar yükleme hatası:", error)
    }
  }

  async initializeGuild(guild) {
    try {
      // Sunucu bilgilerini veritabanına kaydet
      await this.supabase.from("guilds").upsert({
        id: guild.id,
        name: guild.name,
        owner_id: guild.ownerId,
        member_count: guild.memberCount,
      })

      // Varsayılan bot ayarlarını oluştur
      await this.supabase.from("bot_settings").upsert({
        guild_id: guild.id,
        prefix: "!",
        language: "tr",
        welcome_enabled: false,
        leave_enabled: false,
        moderation_enabled: true,
      })

      console.log(`✅ ${guild.name} sunucusu başarıyla başlatıldı`)
    } catch (error) {
      console.error("Sunucu başlatma hatası:", error)
    }
  }

  async handleCommand(interaction) {
    const { commandName } = interaction

    switch (commandName) {
      case "ticket":
        await this.handleTicketCommand(interaction)
        break
      case "giveaway":
        await this.handleGiveawayCommand(interaction)
        break
      case "role":
        await this.handleRoleCommand(interaction)
        break
      case "help":
        await this.handleHelpCommand(interaction)
        break
      case "setup":
        await this.handleSetupCommand(interaction)
        break
      default:
        await interaction.reply({ content: "Bilinmeyen komut!", ephemeral: true })
    }
  }

  async handleTicketCommand(interaction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "create":
        await this.createTicket(interaction)
        break
      case "close":
        await this.closeTicket(interaction)
        break
      case "add":
        await this.addUserToTicket(interaction)
        break
    }
  }

  async createTicket(interaction) {
    const subject = interaction.options.getString("konu")
    const guild = interaction.guild
    const user = interaction.user

    try {
      // Kullanıcının aktif ticket'ı var mı kontrol et
      const { data: existingTickets } = await this.supabase
        .from("tickets")
        .select("*")
        .eq("guild_id", guild.id)
        .eq("user_id", user.id)
        .eq("status", "open")

      if (existingTickets && existingTickets.length > 0) {
        return await interaction.reply({
          content: "❌ Zaten aktif bir ticket'ınız bulunmaktadır!",
          ephemeral: true,
        })
      }

      // Ticket kategorisini bul
      const settings = this.settings.get(guild.id)
      let category = null

      if (settings?.ticket_category_id) {
        category = guild.channels.cache.get(settings.ticket_category_id)
      }

      // Ticket kanalı oluştur
      const ticketChannel = await guild.channels.create({
        name: `ticket-${user.username}`,
        type: ChannelType.GuildText,
        parent: category?.id,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: user.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
          },
        ],
      })

      // Ticket bilgilerini veritabanına kaydet
      const ticketId = `${guild.id}-${user.id}-${Date.now()}`
      await this.supabase.from("tickets").insert({
        id: ticketId,
        guild_id: guild.id,
        user_id: user.id,
        channel_id: ticketChannel.id,
        subject: subject,
        status: "open",
      })

      // Ticket embed'i oluştur
      const embed = new EmbedBuilder()
        .setTitle("🎫 Yeni Ticket")
        .setDescription(
          `**Konu:** ${subject}\n**Oluşturan:** ${user}\n**Oluşturma Tarihi:** <t:${Math.floor(Date.now() / 1000)}:F>`,
        )
        .setColor(0x00ff00)
        .setFooter({ text: `Ticket ID: ${ticketId}` })

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("close_ticket")
          .setLabel("Ticket'ı Kapat")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🔒"),
      )

      await ticketChannel.send({ embeds: [embed], components: [row] })

      await interaction.reply({
        content: `✅ Ticket başarıyla oluşturuldu! ${ticketChannel}`,
        ephemeral: true,
      })

      // Log kaydı
      await this.logEvent("TICKET_CREATE", guild.id, {
        user: user,
        channel: ticketChannel,
        subject: subject,
      })
    } catch (error) {
      console.error("Ticket oluşturma hatası:", error)
      await interaction.reply({
        content: "❌ Ticket oluşturulurken bir hata oluştu!",
        ephemeral: true,
      })
    }
  }

  async handleGiveawayCommand(interaction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "start":
        await this.startGiveaway(interaction)
        break
      case "end":
        await this.endGiveaway(interaction)
        break
    }
  }

  async startGiveaway(interaction) {
    const duration = interaction.options.getInteger("sure")
    const prize = interaction.options.getString("odul")
    const winnerCount = interaction.options.getInteger("kazanan")

    if (duration < 1 || duration > 10080) {
      // Max 1 hafta
      return await interaction.reply({
        content: "❌ Çekiliş süresi 1 dakika ile 1 hafta arasında olmalıdır!",
        ephemeral: true,
      })
    }

    if (winnerCount < 1 || winnerCount > 20) {
      return await interaction.reply({
        content: "❌ Kazanan sayısı 1 ile 20 arasında olmalıdır!",
        ephemeral: true,
      })
    }

    try {
      const endTime = Date.now() + duration * 60 * 1000

      const embed = new EmbedBuilder()
        .setTitle("🎉 ÇEKİLİŞ!")
        .setDescription(
          `**Ödül:** ${prize}\n**Kazanan Sayısı:** ${winnerCount}\n**Süre:** ${duration} dakika\n\n🎉 Katılmak için butona tıklayın!`,
        )
        .setColor(0xff6b6b)
        .setTimestamp(endTime)
        .setFooter({ text: "Bitiş zamanı" })

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("join_giveaway").setLabel("Katıl").setStyle(ButtonStyle.Primary).setEmoji("🎉"),
      )

      const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true })

      // Çekiliş bilgilerini veritabanına kaydet
      const giveawayId = `${interaction.guild.id}-${message.id}`
      await this.supabase.from("giveaways").insert({
        id: giveawayId,
        guild_id: interaction.guild.id,
        channel_id: interaction.channel.id,
        message_id: message.id,
        title: "Çekiliş",
        prize: prize,
        winner_count: winnerCount,
        end_time: new Date(endTime).toISOString(),
        created_by: interaction.user.id,
      })

      // Çekilişi otomatik sonlandır
      setTimeout(
        () => {
          this.endGiveawayById(giveawayId)
        },
        duration * 60 * 1000,
      )

      console.log(`🎉 Yeni çekiliş başlatıldı: ${giveawayId}`)
    } catch (error) {
      console.error("Çekiliş başlatma hatası:", error)
      await interaction.reply({
        content: "❌ Çekiliş başlatılırken bir hata oluştu!",
        ephemeral: true,
      })
    }
  }

  async handleButton(interaction) {
    const { customId } = interaction

    switch (customId) {
      case "close_ticket":
        await this.closeTicketButton(interaction)
        break
      case "join_giveaway":
        await this.joinGiveaway(interaction)
        break
    }
  }

  async joinGiveaway(interaction) {
    const messageId = interaction.message.id

    try {
      // Çekilişi veritabanından bul
      const { data: giveaway } = await this.supabase.from("giveaways").select("*").eq("message_id", messageId).single()

      if (!giveaway) {
        return await interaction.reply({
          content: "❌ Çekiliş bulunamadı!",
          ephemeral: true,
        })
      }

      if (giveaway.status === "ended") {
        return await interaction.reply({
          content: "❌ Bu çekiliş sona ermiştir!",
          ephemeral: true,
        })
      }

      // Kullanıcı zaten katılmış mı kontrol et
      const { data: existingParticipant } = await this.supabase
        .from("giveaway_participants")
        .select("*")
        .eq("giveaway_id", giveaway.id)
        .eq("user_id", interaction.user.id)
        .single()

      if (existingParticipant) {
        return await interaction.reply({
          content: "❌ Zaten bu çekilişe katıldınız!",
          ephemeral: true,
        })
      }

      // Kullanıcıyı çekilişe ekle
      await this.supabase.from("giveaway_participants").insert({
        giveaway_id: giveaway.id,
        user_id: interaction.user.id,
      })

      await interaction.reply({
        content: "✅ Çekilişe başarıyla katıldınız! 🎉",
        ephemeral: true,
      })
    } catch (error) {
      console.error("Çekilişe katılma hatası:", error)
      await interaction.reply({
        content: "❌ Çekilişe katılırken bir hata oluştu!",
        ephemeral: true,
      })
    }
  }

  async logEvent(eventType, guildId, data) {
    try {
      await this.supabase.from("logs").insert({
        guild_id: guildId,
        event_type: eventType,
        user_id: data.user?.id,
        channel_id: data.channel?.id,
        data: data,
      })
    } catch (error) {
      console.error("Log kaydetme hatası:", error)
    }
  }

  async handleMemberJoin(member) {
    const settings = this.settings.get(member.guild.id)

    if (settings?.welcome_enabled && settings?.welcome_channel) {
      const welcomeChannel = member.guild.channels.cache.get(settings.welcome_channel)

      if (welcomeChannel) {
        const embed = new EmbedBuilder()
          .setTitle("👋 Hoş Geldin!")
          .setDescription(
            settings.welcome_message
              .replace("{user}", member.toString())
              .replace("{server}", member.guild.name)
              .replace("{memberCount}", member.guild.memberCount.toString()),
          )
          .setColor(0x00ff00)
          .setThumbnail(member.user.displayAvatarURL())

        await welcomeChannel.send({ embeds: [embed] })
      }
    }

    // Oto rol ver
    if (settings?.auto_role) {
      const autoRole = member.guild.roles.cache.get(settings.auto_role)
      if (autoRole) {
        await member.roles.add(autoRole)
      }
    }

    // Log kaydı
    await this.logEvent("MEMBER_JOIN", member.guild.id, { user: member.user })
  }

  async handleMemberLeave(member) {
    const settings = this.settings.get(member.guild.id)

    if (settings?.leave_enabled && settings?.leave_channel) {
      const leaveChannel = member.guild.channels.cache.get(settings.leave_channel)

      if (leaveChannel) {
        const embed = new EmbedBuilder()
          .setTitle("👋 Görüşürüz!")
          .setDescription(
            settings.leave_message
              .replace("{user}", member.user.tag)
              .replace("{server}", member.guild.name)
              .replace("{memberCount}", member.guild.memberCount.toString()),
          )
          .setColor(0xff0000)
          .setThumbnail(member.user.displayAvatarURL())

        await leaveChannel.send({ embeds: [embed] })
      }
    }

    // Log kaydı
    await this.logEvent("MEMBER_LEAVE", member.guild.id, { user: member.user })
  }

  async start(token) {
    try {
      await this.client.login(token)
      console.log("🚀 Bot başarıyla başlatıldı!")
    } catch (error) {
      console.error("❌ Bot başlatılırken hata:", error)
      process.exit(1)
    }
  }
}

// Bot'u başlat
const bot = new DiscordBot()

if (!process.env.DISCORD_BOT_TOKEN) {
  console.error("❌ DISCORD_BOT_TOKEN environment variable bulunamadı!")
  process.exit(1)
}

bot.start(process.env.DISCORD_BOT_TOKEN)

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 Bot kapatılıyor...")
  bot.client.destroy()
  process.exit(0)
})
