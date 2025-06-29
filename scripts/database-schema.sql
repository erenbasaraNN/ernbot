-- Discord Bot Yönetim Paneli Veritabanı Şeması

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

-- Sunucu üyeleri tablosu
CREATE TABLE IF NOT EXISTS guild_members (
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(32),
    roles JSONB DEFAULT '[]',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (guild_id, user_id)
);

-- Ticket sistemi tablosu
CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(50) PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
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

-- Ticket mesajları tablosu
CREATE TABLE IF NOT EXISTS ticket_messages (
    id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(50) REFERENCES tickets(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    message_id VARCHAR(20) NOT NULL,
    content TEXT,
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    created_by VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE
);

-- Çekiliş katılımcıları tablosu
CREATE TABLE IF NOT EXISTS giveaway_participants (
    giveaway_id VARCHAR(50) REFERENCES giveaways(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (giveaway_id, user_id)
);

-- Çekiliş kazananları tablosu
CREATE TABLE IF NOT EXISTS giveaway_winners (
    id SERIAL PRIMARY KEY,
    giveaway_id VARCHAR(50) REFERENCES giveaways(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    selected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roller tablosu
CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(20) PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    color INTEGER DEFAULT 0,
    permissions BIGINT DEFAULT 0,
    position INTEGER DEFAULT 0,
    mentionable BOOLEAN DEFAULT FALSE,
    hoist BOOLEAN DEFAULT FALSE,
    managed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kanallar tablosu
CREATE TABLE IF NOT EXISTS channels (
    id VARCHAR(20) PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type INTEGER NOT NULL,
    topic TEXT,
    position INTEGER DEFAULT 0,
    parent_id VARCHAR(20),
    nsfw BOOLEAN DEFAULT FALSE,
    rate_limit_per_user INTEGER DEFAULT 0,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Embed şablonları tablosu
CREATE TABLE IF NOT EXISTS embed_templates (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(256),
    description TEXT,
    color INTEGER DEFAULT 0,
    thumbnail VARCHAR(255),
    image VARCHAR(255),
    footer_text VARCHAR(2048),
    footer_icon VARCHAR(255),
    author_name VARCHAR(256),
    author_icon VARCHAR(255),
    fields JSONB DEFAULT '[]',
    created_by VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Otomatik mesajlar tablosu
CREATE TABLE IF NOT EXISTS auto_messages (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    trigger_type VARCHAR(50) NOT NULL, -- 'join', 'leave', 'keyword', 'scheduled'
    trigger_data JSONB DEFAULT '{}',
    channel_id VARCHAR(20) NOT NULL,
    message_content TEXT,
    embed_data JSONB,
    enabled BOOLEAN DEFAULT TRUE,
    created_by VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Log ayarları tablosu
CREATE TABLE IF NOT EXISTS log_settings (
    guild_id VARCHAR(20) PRIMARY KEY REFERENCES guilds(id) ON DELETE CASCADE,
    message_logs BOOLEAN DEFAULT TRUE,
    message_log_channel VARCHAR(20),
    member_logs BOOLEAN DEFAULT TRUE,
    member_log_channel VARCHAR(20),
    role_logs BOOLEAN DEFAULT TRUE,
    role_log_channel VARCHAR(20),
    channel_logs BOOLEAN DEFAULT TRUE,
    channel_log_channel VARCHAR(20),
    moderation_logs BOOLEAN DEFAULT TRUE,
    moderation_log_channel VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yetki sistemi tablosu
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(20) REFERENCES guilds(id) ON DELETE CASCADE,
    user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    permission_type VARCHAR(50) NOT NULL, -- 'admin', 'moderator', 'ticket_manager', etc.
    granted_by VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE(guild_id, user_id, permission_type)
);

-- Bot ayarları tablosu
CREATE TABLE IF NOT EXISTS bot_settings (
    guild_id VARCHAR(20) PRIMARY KEY REFERENCES guilds(id) ON DELETE CASCADE,
    prefix VARCHAR(10) DEFAULT '!',
    language VARCHAR(5) DEFAULT 'tr',
    timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
    welcome_enabled BOOLEAN DEFAULT FALSE,
    welcome_channel VARCHAR(20),
    welcome_message TEXT,
    leave_enabled BOOLEAN DEFAULT FALSE,
    leave_channel VARCHAR(20),
    leave_message TEXT,
    auto_role VARCHAR(20),
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

-- Trigger'lar (otomatik güncelleme için)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guilds_updated_at BEFORE UPDATE ON guilds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Örnek veri ekleme
INSERT INTO guilds (id, name, owner_id, member_count) VALUES 
('1234567890', 'Test Sunucusu', '123456789012345678', 100),
('0987654321', 'Ana Sunucu', '876543210987654321', 500)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, username, discriminator) VALUES 
('123456789012345678', 'BotOwner', '0001'),
('876543210987654321', 'Moderator', '0002'),
('111222333444555666', 'TestUser', '0003')
ON CONFLICT (id) DO NOTHING;

-- Başlangıç ayarları
INSERT INTO bot_settings (guild_id, prefix, welcome_enabled, welcome_message) VALUES 
('1234567890', '!', TRUE, 'Hoş geldin {user}! Sunucumuzda {memberCount} üye var.'),
('0987654321', '/', TRUE, 'Merhaba {user}! {server} sunucusuna hoş geldin!')
ON CONFLICT (guild_id) DO NOTHING;

COMMIT;
