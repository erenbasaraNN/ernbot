// Discord Bot - Ana dosya
import {
  Client,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js"

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

    this.commands = new Collection()
    this.tickets = new Map()
    this.giveaways = new Map()
    this.settings = new Map()

    this.setupEvents()
    this.setupCommands()
  }

  setupEvents() {
    this.client.once("ready", () => {
      console.log(`Bot ${this.client.user.tag} olarak giriş yaptı!`)
      this.client.user.setActivity("Sunucu Yönetimi", { type: "WATCHING" })
    })

    this.client.on("interactionCreate", async (interaction) => {
      if (interaction.isChatInputCommand()) {
        await this.handleCommand(interaction)
      } else if (interaction.isButton()) {
        await this.handleButton(interaction)
      } else if (interaction.isSelectMenu()) {
        await this.handleSelectMenu(interaction)
      }
    })

    this.client.on("guildMemberAdd", async (member) => {
      await this.handleMemberJoin(member)
    })

    this.client.on("guildMemberRemove", async (member) => {
      await this.handleMemberLeave(member)
    })

    this.client.on("messageDelete", async (message) => {
      await this.logEvent("MESSAGE_DELETE", message)
    })

    this.client.on("messageUpdate", async (oldMessage, newMessage) => {
      await this.logEvent("MESSAGE_UPDATE", { old: oldMessage, new: newMessage })
    })
  }

  setupCommands() {
    // Ticket Komutları
    this.commands.set("ticket", {
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
    })

    // Çekiliş Komutları
    this.commands.set("giveaway", {
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
              description: "Çekiliş ID",
              type: 3,
              required: true,
            },
          ],
        },
      ],
    })

    // Rol Yönetimi Komutları
    this.commands.set("role", {
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
    })
  }

  async handleCommand(interaction) {
    const { commandName, options } = interaction

    try {
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
        default:
          await interaction.reply({ content: "Bilinmeyen komut!", ephemeral: true })
      }
    } catch (error) {
      console.error("Komut hatası:", error)
      await interaction.reply({ content: "Bir hata oluştu!", ephemeral: true })
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

    // Kullanıcının aktif ticket'ı var mı kontrol et
    const existingTicket = Array.from(this.tickets.values()).find(
      (ticket) => ticket.userId === user.id && ticket.guildId === guild.id && ticket.status === "open",
    )

    if (existingTicket) {
      return await interaction.reply({
        content: "Zaten aktif bir ticket'ınız bulunmaktadır!",
        ephemeral: true,
      })
    }

    // Ticket kanalı oluştur
    const ticketChannel = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      parent: "1234567890123456789", // Ticket kategorisi ID'si
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

    // Ticket bilgilerini kaydet
    const ticketId = `${guild.id}-${user.id}-${Date.now()}`
    this.tickets.set(ticketId, {
      id: ticketId,
      userId: user.id,
      guildId: guild.id,
      channelId: ticketChannel.id,
      subject: subject,
      status: "open",
      createdAt: new Date(),
    })

    // Ticket embed'i oluştur
    const embed = new EmbedBuilder()
      .setTitle("🎫 Yeni Ticket")
      .setDescription(
        `**Konu:** ${subject}\n**Oluşturan:** ${user}\n**Oluşturma Tarihi:** <t:${Math.floor(Date.now() / 1000)}:F>`,
      )
      .setColor("#00ff00")
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
      content: `Ticket başarıyla oluşturuldu! ${ticketChannel}`,
      ephemeral: true,
    })

    // Log kaydı
    await this.logEvent("TICKET_CREATE", {
      user: user,
      channel: ticketChannel,
      subject: subject,
    })
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

    const embed = new EmbedBuilder()
      .setTitle("🎉 ÇEKİLİŞ!")
      .setDescription(
        `**Ödül:** ${prize}\n**Kazanan Sayısı:** ${winnerCount}\n**Süre:** ${duration} dakika\n\n🎉 Katılmak için tıklayın!`,
      )
      .setColor("#ff6b6b")
      .setTimestamp(Date.now() + duration * 60 * 1000)
      .setFooter({ text: "Bitiş zamanı" })

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("join_giveaway").setLabel("Katıl").setStyle(ButtonStyle.Primary).setEmoji("🎉"),
    )

    const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true })

    // Çekiliş bilgilerini kaydet
    const giveawayId = `${interaction.guild.id}-${message.id}`
    this.giveaways.set(giveawayId, {
      id: giveawayId,
      messageId: message.id,
      channelId: interaction.channel.id,
      guildId: interaction.guild.id,
      prize: prize,
      winnerCount: winnerCount,
      endTime: Date.now() + duration * 60 * 1000,
      participants: new Set(),
      ended: false,
    })

    // Çekilişi otomatik sonlandır
    setTimeout(
      () => {
        this.endGiveawayById(giveawayId)
      },
      duration * 60 * 1000,
    )
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
    const giveaway = Array.from(this.giveaways.values()).find((g) => g.messageId === messageId)

    if (!giveaway) {
      return await interaction.reply({
        content: "Çekiliş bulunamadı!",
        ephemeral: true,
      })
    }

    if (giveaway.ended) {
      return await interaction.reply({
        content: "Bu çekiliş sona ermiştir!",
        ephemeral: true,
      })
    }

    if (giveaway.participants.has(interaction.user.id)) {
      return await interaction.reply({
        content: "Zaten bu çekilişe katıldınız!",
        ephemeral: true,
      })
    }

    giveaway.participants.add(interaction.user.id)

    await interaction.reply({
      content: "Çekilişe başarıyla katıldınız! 🎉",
      ephemeral: true,
    })
  }

  async endGiveawayById(giveawayId) {
    const giveaway = this.giveaways.get(giveawayId)
    if (!giveaway || giveaway.ended) return

    giveaway.ended = true

    const channel = this.client.channels.cache.get(giveaway.channelId)
    if (!channel) return

    const participants = Array.from(giveaway.participants)

    if (participants.length === 0) {
      const embed = new EmbedBuilder()
        .setTitle("🎉 Çekiliş Sona Erdi!")
        .setDescription(`**Ödül:** ${giveaway.prize}\n\n❌ Kimse katılmadı!`)
        .setColor("#ff0000")

      await channel.send({ embeds: [embed] })
      return
    }

    // Kazananları seç
    const winners = []
    const winnerCount = Math.min(giveaway.winnerCount, participants.length)

    for (let i = 0; i < winnerCount; i++) {
      const randomIndex = Math.floor(Math.random() * participants.length)
      const winner = participants.splice(randomIndex, 1)[0]
      winners.push(winner)
    }

    const winnerMentions = winners.map((id) => `<@${id}>`).join(", ")

    const embed = new EmbedBuilder()
      .setTitle("🎉 Çekiliş Sona Erdi!")
      .setDescription(`**Ödül:** ${giveaway.prize}\n**Kazananlar:** ${winnerMentions}\n\nTebrikler! 🎊`)
      .setColor("#00ff00")

    await channel.send({ embeds: [embed] })

    // Log kaydı
    await this.logEvent("GIVEAWAY_END", {
      prize: giveaway.prize,
      winners: winners,
      participantCount: giveaway.participants.size,
    })
  }

  async logEvent(type, data) {
    // Log kanalına event gönder
    const logChannelId = "1234567890123456789" // Log kanal ID'si
    const logChannel = this.client.channels.cache.get(logChannelId)

    if (!logChannel) return

    const embed = new EmbedBuilder().setTitle(`📋 ${type}`).setTimestamp().setColor("#ffa500")

    switch (type) {
      case "TICKET_CREATE":
        embed.setDescription(`**Kullanıcı:** ${data.user}\n**Kanal:** ${data.channel}\n**Konu:** ${data.subject}`)
        break
      case "GIVEAWAY_END":
        embed.setDescription(
          `**Ödül:** ${data.prize}\n**Kazananlar:** ${data.winners.length}\n**Katılımcılar:** ${data.participantCount}`,
        )
        break
      case "MESSAGE_DELETE":
        if (data.author && !data.author.bot) {
          embed.setDescription(
            `**Kanal:** ${data.channel}\n**Yazar:** ${data.author}\n**İçerik:** ${data.content || "İçerik yok"}`,
          )
        }
        break
    }

    await logChannel.send({ embeds: [embed] })
  }

  async handleMemberJoin(member) {
    // Hoş geldin mesajı
    const welcomeChannelId = "1234567890123456789"
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId)

    if (welcomeChannel) {
      const embed = new EmbedBuilder()
        .setTitle("👋 Hoş Geldin!")
        .setDescription(`${member} sunucumuza hoş geldin!\n\nŞu anda **${member.guild.memberCount}** üyeyiz!`)
        .setColor("#00ff00")
        .setThumbnail(member.user.displayAvatarURL())

      await welcomeChannel.send({ embeds: [embed] })
    }

    // Oto rol ver
    const autoRoleId = "1234567890123456789"
    const autoRole = member.guild.roles.cache.get(autoRoleId)

    if (autoRole) {
      await member.roles.add(autoRole)
    }

    // Log kaydı
    await this.logEvent("MEMBER_JOIN", { member })
  }

  async handleMemberLeave(member) {
    // Ayrılma mesajı
    const leaveChannelId = "1234567890123456789"
    const leaveChannel = member.guild.channels.cache.get(leaveChannelId)

    if (leaveChannel) {
      const embed = new EmbedBuilder()
        .setTitle("👋 Görüşürüz!")
        .setDescription(`**${member.user.tag}** sunucudan ayrıldı.\n\nŞu anda **${member.guild.memberCount}** üyeyiz.`)
        .setColor("#ff0000")
        .setThumbnail(member.user.displayAvatarURL())

      await leaveChannel.send({ embeds: [embed] })
    }

    // Log kaydı
    await this.logEvent("MEMBER_LEAVE", { member })
  }

  async start(token) {
    try {
      await this.client.login(token)
      console.log("Bot başarıyla başlatıldı!")
    } catch (error) {
      console.error("Bot başlatılırken hata:", error)
    }
  }
}

// Bot'u başlat
const bot = new DiscordBot()

// Bot token'ını buraya ekleyin
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"

bot.start(BOT_TOKEN)

console.log("Discord Bot sistemi hazır!")
console.log("Özellikler:")
console.log("- Ticket Sistemi")
console.log("- Çekiliş Sistemi")
console.log("- Rol Yönetimi")
console.log("- Log Sistemi")
console.log("- Hoş geldin/Ayrılma mesajları")
console.log("- Oto rol verme")
