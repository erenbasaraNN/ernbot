# 📋 Detaylı Kurulum Talimatları

Bu rehber, Discord Bot Yönetim Paneli'ni lokalinizde çalıştırmanız için gereken tüm adımları içerir.

## 🔧 Ön Gereksinimler

### 1. Node.js Kurulumu
- [Node.js 18+](https://nodejs.org/) indirin ve kurun
- Terminal'de kontrol edin:
\`\`\`bash
node --version
npm --version
\`\`\`

### 2. Git Kurulumu
- [Git](https://git-scm.com/) indirin ve kurun
- Terminal'de kontrol edin:
\`\`\`bash
git --version
\`\`\`

## 🚀 Adım Adım Kurulum

### Adım 1: Projeyi İndirin
\`\`\`bash
# Projeyi klonlayın (GitHub'dan indirdiyseniz)
git clone <repository-url>
cd discord-bot-panel

# Veya ZIP olarak indirdiyseniz, klasöre gidin
cd discord-bot-panel
\`\`\`

### Adım 2: Dependencies Yükleyin
\`\`\`bash
# NPM packages yükleyin
npm install

# Kurulum tamamlandığında şu mesajı görmelisiniz:
# "added XXX packages in XXs"
\`\`\`

### Adım 3: Discord Bot Oluşturun

#### 3.1 Discord Developer Portal'a Gidin
1. https://discord.com/developers/applications adresine gidin
2. Discord hesabınızla giriş yapın
3. "New Application" butonuna tıklayın
4. Bot adını girin (örn: "Sunucu Yöneticisi")
5. "Create" butonuna tıklayın

#### 3.2 Bot Token Alın
1. Sol menüden "Bot" sekmesine tıklayın
2. "Reset Token" butonuna tıklayın
3. Çıkan token'ı kopyalayın ve güvenli bir yere kaydedin
4. ⚠️ **ÖNEMLİ**: Bu token'ı kimseyle paylaşmayın!

#### 3.3 Bot İzinlerini Ayarlayın
"Bot" sekmesinde aşağıdaki izinleri etkinleştirin:
- ✅ Send Messages
- ✅ Embed Links
- ✅ Attach Files
- ✅ Read Message History
- ✅ Use Slash Commands
- ✅ Manage Channels
- ✅ Manage Roles
- ✅ Add Reactions
- ✅ View Channels

#### 3.4 Client ID Alın
1. Sol menüden "General Information" sekmesine gidin
2. "Application ID" değerini kopyalayın

### Adım 4: Supabase Veritabanı Oluşturun

#### 4.1 Supabase Hesabı Oluşturun
1. https://supabase.com adresine gidin
2. "Start your project" butonuna tıklayın
3. GitHub/Google ile giriş yapın

#### 4.2 Yeni Proje Oluşturun
1. "New Project" butonuna tıklayın
2. Proje adını girin (örn: "discord-bot-db")
3. Güçlü bir veritabanı şifresi oluşturun
4. Bölge seçin (Europe West - Ireland önerilir)
5. "Create new project" butonuna tıklayın
6. ⏳ Proje oluşturulmasını bekleyin (2-3 dakika)

#### 4.3 API Anahtarlarını Alın
1. Proje dashboard'ında "Settings" > "API" sekmesine gidin
2. Aşağıdaki değerleri kopyalayın:
   - Project URL
   - anon/public key
   - service_role key (⚠️ Gizli tutun!)

### Adım 5: Environment Variables Ayarlayın

#### 5.1 .env Dosyası Oluşturun
\`\`\`bash
# .env.example dosyasını kopyalayın
cp .env.example .env

# Windows'ta:
copy .env.example .env
\`\`\`

#### 5.2 .env Dosyasını Düzenleyin
`.env` dosyasını bir metin editörü ile açın ve aşağıdaki değerleri girin:

\`\`\`env
# Discord Bot Configuration
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here

# Database Configuration (Supabase)
DATABASE_URL=your_supabase_database_url_here
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here

# Bot Settings
BOT_PREFIX=!
BOT_OWNER_ID=your_discord_user_id_here

# Development Settings
NODE_ENV=development
PORT=3000
\`\`\`

#### 5.3 Değerleri Doldurun
- `DISCORD_BOT_TOKEN`: Adım 3.2'de aldığınız bot token
- `DISCORD_CLIENT_ID`: Adım 3.4'te aldığınız client ID
- `SUPABASE_URL`: Adım 4.3'te aldığınız Project URL
- `SUPABASE_ANON_KEY`: Adım 4.3'te aldığınız anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Adım 4.3'te aldığınız service role key
- `NEXTAUTH_SECRET`: Rastgele güçlü bir şifre oluşturun
- `BOT_OWNER_ID`: Discord kullanıcı ID'niz

#### 5.4 Discord Kullanıcı ID'nizi Bulun
1. Discord'da Developer Mode'u etkinleştirin:
   - Discord > Settings > Advanced > Developer Mode ✅
2. Profilinize sağ tıklayın > "Copy User ID"

### Adım 6: Veritabanını Hazırlayın
\`\`\`bash
# Veritabanı tablolarını oluşturun
npm run db:migrate

# Başarılı olursa şu mesajı görmelisiniz:
# "✅ Migration'lar başarıyla tamamlandı!"
\`\`\`

### Adım 7: Bot'u Sunucuya Ekleyin

#### 7.1 Davet Linki Oluşturun
1. Discord Developer Portal > "OAuth2" > "URL Generator"
2. Scopes seçin:
   - ✅ bot
   - ✅ applications.commands
3. Bot Permissions seçin:
   - ✅ Administrator (kolay yol)
   - Veya gerekli izinleri tek tek seçin
4. Oluşan URL'yi kopyalayın

#### 7.2 Bot'u Sunucuya Ekleyin
1. Davet linkini tarayıcıda açın
2. Sunucunuzu seçin
3. İzinleri onaylayın
4. "Authorize" butonuna tıklayın

### Adım 8: Uygulamayı Başlatın

#### 8.1 Discord Bot'u Başlatın
\`\`\`bash
# Yeni terminal penceresi açın
npm run bot:dev

# Başarılı olursa şu mesajları görmelisiniz:
# "✅ Bot YourBotName#1234 olarak giriş yaptı!"
# "📊 1 sunucuda aktif"
# "✅ Slash komutları başarıyla kaydedildi!"
\`\`\`

#### 8.2 Web Panelini Başlatın
\`\`\`bash
# Başka bir terminal penceresi açın
npm run dev

# Başarılı olursa şu mesajı görmelisiniz:
# "Ready - started server on 0.0.0.0:3000"
\`\`\`

### Adım 9: Test Edin

#### 9.1 Web Panel Testi
1. Tarayıcıda http://localhost:3000 adresine gidin
2. Dashboard'ı görmelisiniz
3. Sunucu seçiciyi test edin

#### 9.2 Discord Bot Testi
Discord sunucunuzda şu komutları test edin:
\`\`\`
/help
/ticket create konu:Test ticket
/giveaway start sure:1 odul:Test ödülü kazanan:1
\`\`\`

## ✅ Başarılı Kurulum Kontrol Listesi

- [ ] Node.js kuruldu
- [ ] Proje indirildi
- [ ] Dependencies yüklendi
- [ ] Discord bot oluşturuldu
- [ ] Bot token alındı
- [ ] Supabase projesi oluşturuldu
- [ ] API anahtarları alındı
- [ ] .env dosyası düzenlendi
- [ ] Veritabanı migration'ları çalıştırıldı
- [ ] Bot sunucuya eklendi
- [ ] Discord bot çalışıyor
- [ ] Web panel çalışıyor
- [ ] Komutlar test edildi

## 🐛 Sık Karşılaşılan Sorunlar

### "Bot token invalid" Hatası
- Bot token'ının doğru kopyalandığını kontrol edin
- Token'da boşluk olmadığından emin olun
- Yeni token oluşturmayı deneyin

### "Database connection failed" Hatası
- Supabase URL ve anahtarlarını kontrol edin
- İnternet bağlantınızı kontrol edin
- Supabase projesinin aktif olduğunu kontrol edin

### "Port 3000 already in use" Hatası
\`\`\`bash
# Port'u kullanan işlemi bulun
lsof -ti:3000

# İşlemi sonlandırın
kill -9 <process_id>

# Veya farklı port kullanın
PORT=3001 npm run dev
\`\`\`

### Bot Komutları Çalışmıyor
- Bot'un sunucuda gerekli izinlere sahip olduğunu kontrol edin
- Slash komutlarının kaydedildiğini kontrol edin
- Bot'un online olduğunu kontrol edin

## 📞 Yardım Alın

Sorun yaşıyorsanız:
1. Hata mesajlarını tam olarak kopyalayın
2. Hangi adımda takıldığınızı belirtin
3. İşletim sisteminizi belirtin
4. GitHub Issues'da sorun bildirin

## 🎉 Tebrikler!

Kurulum tamamlandı! Artık Discord bot yönetim panelinizi kullanabilirsiniz.

### Sonraki Adımlar:
1. Bot ayarlarını web panelinden yapılandırın
2. Ticket kategorileri oluşturun
3. Hoş geldin mesajlarını ayarlayın
4. Log kanallarını belirleyin
5. Yetkileri yapılandırın

İyi kullanımlar! 🚀
