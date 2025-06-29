# Discord Bot Yönetim Paneli

Kapsamlı Discord bot yönetim paneli - Web arayüzü ile bot ayarlarınızı kolayca yönetin.

## 🚀 Özellikler

### 🎫 Ticket Sistemi
- Otomatik ticket oluşturma
- Kategori yönetimi
- Ticket durumu takibi
- Destek ekibi atamaları

### 🎉 Çekiliş Sistemi
- Otomatik çekiliş yönetimi
- Katılımcı takibi
- Kazanan seçimi
- Çekiliş geçmişi

### 🛡️ Rol & Kanal Yönetimi
- Otomatik rol verme
- Kanal izinleri
- Yetki sistemi

### 📝 Mesaj & Log Sistemi
- Otomatik mesajlar
- Hoş geldin/Ayrılma mesajları
- Detaylı log takibi
- Embed oluşturucu

### ⚙️ Yönetim Özellikleri
- Web tabanlı ayar paneli
- Çoklu sunucu desteği
- Yetki tabanlı erişim
- Gerçek zamanlı istatistikler

## 📋 Gereksinimler

- Node.js 18+
- Discord Bot Token
- Supabase hesabı (veritabanı için)
- Discord Developer Application

## 🛠️ Kurulum

### 1. Projeyi İndirin
\`\`\`bash
git clone <repository-url>
cd discord-bot-panel
\`\`\`

### 2. Dependencies Yükleyin
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables Ayarlayın
\`\`\`bash
cp .env.example .env
\`\`\`

`.env` dosyasını düzenleyin ve gerekli değerleri girin.

### 4. Veritabanını Hazırlayın
\`\`\`bash
npm run db:migrate
\`\`\`

### 5. Discord Bot'u Başlatın
\`\`\`bash
npm run bot:dev
\`\`\`

### 6. Web Panelini Başlatın
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Discord Bot Kurulumu

### 1. Discord Developer Portal
1. https://discord.com/developers/applications adresine gidin
2. "New Application" butonuna tıklayın
3. Bot adını girin ve oluşturun

### 2. Bot Token Alın
1. Sol menüden "Bot" sekmesine gidin
2. "Reset Token" butonuna tıklayın
3. Token'ı kopyalayın ve `.env` dosyasına ekleyin

### 3. Bot İzinlerini Ayarlayın
Gerekli izinler:
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Use Slash Commands
- Manage Channels
- Manage Roles
- Kick Members
- Ban Members

### 4. Bot'u Sunucuya Ekleyin
1. "OAuth2" > "URL Generator" sekmesine gidin
2. "bot" ve "applications.commands" seçin
3. Gerekli izinleri seçin
4. Oluşan URL ile bot'u sunucunuza ekleyin

## 🗄️ Supabase Kurulumu

### 1. Supabase Projesi Oluşturun
1. https://supabase.com adresine gidin
2. Yeni proje oluşturun
3. Proje URL ve API anahtarlarını alın

### 2. Veritabanı Bağlantısını Ayarlayın
`.env` dosyasında Supabase bilgilerini güncelleyin:
\`\`\`env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

### 3. Tabloları Oluşturun
\`\`\`bash
npm run db:migrate
\`\`\`

## 🚀 Production Deployment

### Vercel (Web Panel)
1. Vercel hesabınıza giriş yapın
2. GitHub repository'nizi bağlayın
3. Environment variables'ları ayarlayın
4. Deploy edin

### Railway/Heroku (Discord Bot)
1. Platform hesabınıza giriş yapın
2. Yeni proje oluşturun
3. GitHub repository'nizi bağlayın
4. Environment variables'ları ayarlayın
5. Deploy edin

## 📝 Kullanım

### Web Panel
1. http://localhost:3000 adresine gidin
2. Discord ile giriş yapın
3. Sunucunuzu seçin
4. Bot ayarlarını yapılandırın

### Discord Komutları
- `/ticket create <konu>` - Yeni ticket oluştur
- `/giveaway start <süre> <ödül> <kazanan>` - Çekiliş başlat
- `/role give <kullanıcı> <rol>` - Rol ver
- `/help` - Yardım menüsü
- `/setup` - Bot kurulum menüsü

## 🐛 Sorun Giderme

### Bot Çalışmıyor
1. Bot token'ının doğru olduğunu kontrol edin
2. Bot'un sunucuda gerekli izinlere sahip olduğunu kontrol edin
3. Console'da hata mesajlarını kontrol edin

### Veritabanı Bağlantı Hatası
1. Supabase URL ve anahtarlarını kontrol edin
2. Veritabanı tablolarının oluşturulduğunu kontrol edin
3. İnternet bağlantınızı kontrol edin

### Web Panel Açılmıyor
1. Port 3000'in kullanımda olmadığını kontrol edin
2. Environment variables'ların doğru olduğunu kontrol edin
3. Dependencies'lerin yüklendiğini kontrol edin

## 📞 Destek

Sorun yaşıyorsanız:
1. GitHub Issues'da sorun bildirin
2. Discord sunucumuzda yardım isteyin
3. Dokümantasyonu kontrol edin

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.
\`\`\`

Şimdi adım adım kurulum talimatları:
