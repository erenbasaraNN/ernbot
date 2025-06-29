const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function runMigrations() {
  console.log("🔄 Veritabanı migration'ları çalıştırılıyor...")

  try {
    // Tabloları oluştur
    const { error } = await supabase.rpc("exec_sql", {
      sql: `
        -- Sunucular tablosu
        CREATE TABLE IF NOT EXISTS guilds (
            id VARCHAR(20) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            icon VARCHAR(255),
            owner_id VARCHAR(20) NOT NULL,
            member_count INTEGER DEFAULT 0,
            settings JSONB DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Kullanıcılar tablosu
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(20) PRIMARY KEY,
            username VARCHAR(32) NOT NULL,
            discriminator VARCHAR(4) NOT NULL,
            avatar VARCHAR(255),
            email VARCHAR(255),
            permissions JSONB DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Ticket sistemi tablosu
        CREATE TABLE IF NOT EXISTS tickets (
            id VARCHAR(50) PRIMARY KEY,
            guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
            user_id VARCHAR(20) NOT NULL,
            channel_id VARCHAR(20) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            status VARCHAR(20) DEFAULT 'open',
            category VARCHAR(50) DEFAULT 'general',
            assigned_to VARCHAR(20),
            priority INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            closed_at TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Çekiliş sistemi tablosu
        CREATE TABLE IF NOT EXISTS giveaways (
            id VARCHAR(50) PRIMARY KEY,
            guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
            channel_id VARCHAR(20) NOT NULL,
            message_id VARCHAR(20) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            prize VARCHAR(255) NOT NULL,
            winner_count INTEGER DEFAULT 1,
            requirements JSONB DEFAULT '{}',
            start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            end_time TIMESTAMP NOT NULL,
            status VARCHAR(20) DEFAULT 'active',
            created_by VARCHAR(20) NOT NULL
        );

        -- Çekiliş katılımcıları tablosu
        CREATE TABLE IF NOT EXISTS giveaway_participants (
            giveaway_id VARCHAR(50) REFERENCES giveaways(id) ON DELETE CASCADE,
            user_id VARCHAR(20) NOT NULL,
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (giveaway_id, user_id)
        );

        -- Log sistemi tablosu
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
            event_type VARCHAR(50) NOT NULL,
            user_id VARCHAR(20),
            target_id VARCHAR(20),
            channel_id VARCHAR(20),
            data JSONB DEFAULT '{}',
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Bot ayarları tablosu
        CREATE TABLE IF NOT EXISTS bot_settings (
            guild_id VARCHAR(20) PRIMARY KEY REFERENCES guilds(id) ON DELETE CASCADE,
            prefix VARCHAR(10) DEFAULT '!',
            language VARCHAR(5) DEFAULT 'tr',
            timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
            welcome_enabled BOOLEAN DEFAULT FALSE,
            welcome_channel VARCHAR(20),
            welcome_message TEXT DEFAULT 'Hoş geldin {user}! Sunucumuzda {memberCount} üye var.',
            leave_enabled BOOLEAN DEFAULT FALSE,
            leave_channel VARCHAR(20),
            leave_message TEXT DEFAULT 'Görüşürüz {user}!',
            auto_role VARCHAR(20),
            ticket_category_id VARCHAR(20),
            moderation_enabled BOOLEAN DEFAULT TRUE,
            anti_spam BOOLEAN DEFAULT FALSE,
            anti_raid BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- İndeksler
        CREATE INDEX IF NOT EXISTS idx_tickets_guild_id ON tickets(guild_id);
        CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
        CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
        CREATE INDEX IF NOT EXISTS idx_giveaways_guild_id ON giveaways(guild_id);
        CREATE INDEX IF NOT EXISTS idx_giveaways_status ON giveaways(status);
        CREATE INDEX IF NOT EXISTS idx_logs_guild_id ON logs(guild_id);
        CREATE INDEX IF NOT EXISTS idx_logs_event_type ON logs(event_type);
        CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
      `,
    })

    if (error) {
      console.error("❌ Migration hatası:", error)
      return
    }

    console.log("✅ Migration'lar başarıyla tamamlandı!")
  } catch (error) {
    console.error("❌ Migration hatası:", error)
  }
}

runMigrations()
