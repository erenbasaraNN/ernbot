# 🚀 Discord Bot Yönetim Paneli - Sıfırdan Kurulum Rehberi

Bu rehber, hiç programlama deneyimi olmayan kişiler için hazırlanmıştır. Her adımı detaylı olarak açıklayacağım.

## 📋 İçindekiler
1. [Gerekli Programları İndirme](#1-gerekli-programları-indirme)
2. [Discord Bot Oluşturma](#2-discord-bot-oluşturma)
3. [Supabase Veritabanı Kurulumu](#3-supabase-veritabanı-kurulumu)
4. [Proje Kurulumu](#4-proje-kurulumu)
5. [Ayar Dosyası Düzenleme](#5-ayar-dosyası-düzenleme)
6. [Uygulamayı Çalıştırma](#6-uygulamayı-çalıştırma)
7. [Docker ile Kurulum](#7-docker-ile-kurulum)
8. [Sorun Giderme](#8-sorun-giderme)

---

## 1. Gerekli Programları İndirme

### 1.1 Node.js Kurulumu (Zorunlu)

**Node.js nedir?** JavaScript kodlarını bilgisayarınızda çalıştırmaya yarayan bir programdır.

#### Windows için:
1. https://nodejs.org adresine gidin
2. Yeşil "LTS" yazan büyük butona tıklayın (örn: "18.19.0 LTS")
3. İndirilen `.msi` dosyasını çift tıklayarak açın
4. Kurulum sihirbazında:
   - "Next" butonlarına tıklayın
   - "I accept the terms" kutucuğunu işaretleyin
   - "Add to PATH" seçeneğinin işaretli olduğundan emin olun
   - "Install" butonuna tıklayın
5. Kurulum bitince bilgisayarı yeniden başlatın

#### Mac için:
1. https://nodejs.org adresine gidin
2. "LTS" yazan butona tıklayın
3. İndirilen `.pkg` dosyasını çift tıklayın
4. Kurulum talimatlarını takip edin
5. Terminal'i açın ve şu komutu yazın:
\`\`\`bash
node --version
\`\`\`

#### Linux (Ubuntu/Debian) için:
\`\`\`bash
# Terminal açın (Ctrl+Alt+T)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

**Kurulum Kontrolü:**
1. **Windows:** Başlat menüsünde "cmd" yazın, Command Prompt'u açın
2. **Mac/Linux:** Terminal'i açın
3. Şu komutu yazın:
\`\`\`bash
node --version
\`\`\`
4. Bir versiyon numarası görmelisiniz (örn: v18.19.0)

### 1.2 Git Kurulumu (Zorunlu)

**Git nedir?** Kod dosyalarını indirmek ve yönetmek için kullanılan bir araçtır.

#### Windows için:
1. https://git-scm.com/download/win adresine gidin
2. "64-bit Git for Windows Setup" linkine tıklayın
3. İndirilen dosyayı çalıştırın
4. Kurulum sırasında:
   - Tüm varsayılan ayarları kabul edin
   - "Git Bash" seçeneğinin işaretli olduğundan emin olun

#### Mac için:
1. Terminal'i açın
2. Şu komutu yazın:
\`\`\`bash
git --version
\`\`\`
3. Eğer Git yoksa, otomatik kurulum başlayacak

#### Linux için:
\`\`\`bash
sudo apt update
sudo apt install git
\`\`\`

**Kurulum Kontrolü:**
\`\`\`bash
git --version
\`\`\`

### 1.3 Metin Editörü (Önerilen)

**Neden gerekli?** Ayar dosyalarını düzenlemek için.

**Önerilen Editörler:**
- **Visual Studio Code** (Ücretsiz, kolay): https://code.visualstudio.com
- **Notepad++** (Windows, basit): https://notepad-plus-plus.org
- **Sublime Text** (Ücretli ama güçlü): https://www.sublimetext.com

**VS Code Kurulumu:**
1. https://code.visualstudio.com adresine gidin
2. "Download for Windows/Mac/Linux" butonuna tıklayın
3. İndirilen dosyayı çalıştırın ve kurulum talimatlarını takip edin

---

## 2. Discord Bot Oluşturma

### 2.1 Discord Developer Portal'a Giriş

1. **Tarayıcınızı açın** (Chrome, Firefox, Safari, Edge)
2. **https://discord.com/developers/applications** adresine gidin
3. **Discord hesabınızla giriş yapın**
   - Eğer Discord hesabınız yoksa, önce https://discord.com adresinden hesap oluşturun

### 2.2 Yeni Uygulama Oluşturma

1. **"New Application" butonuna tıklayın** (sağ üst köşede mavi buton)
2. **Uygulama adını girin:**
   - Örnek: "Sunucu Yöneticisi" veya "Bot Asistanım"
   - Bu ad, bot'unuzun adı olacak
3. **"Create" butonuna tıklayın**

### 2.3 Bot Token Alma (ÇOK ÖNEMLİ!)

1. **Sol menüden "Bot" sekmesine tıklayın**
2. **"Reset Token" butonuna tıklayın** (kırmızı buton)
3. **Çıkan uyarıyı okuyun ve "Yes, do it!" butonuna tıklayın**
4. **Uzun bir metin (token) görünecek - BU ÇOK ÖNEMLİ!**
   - Örnek: `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt`
5. **"Copy" butonuna tıklayarak kopyalayın**
6. **Bu token'ı güvenli bir yere kaydedin** (Notepad'e yapıştırın)

⚠️ **UYARI:** Bu token'ı kimseyle paylaşmayın! Bu, bot'unuzun şifresidir.

### 2.4 Bot İzinlerini Ayarlama

**Hala "Bot" sekmesinde:**
1. **"Privileged Gateway Intents" bölümünü bulun**
2. **Şu kutucukları işaretleyin:**
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
3. **"Save Changes" butonuna tıklayın**

### 2.5 Client ID Alma

1. **Sol menüden "General Information" sekmesine tıklayın**
2. **"Application ID" yazan yerin altındaki uzun sayıyı kopyalayın**
   - Örnek: `1234567890123456789`
3. **Bu ID'yi de güvenli bir yere kaydedin**

### 2.6 Client Secret Alma

1. **Sol menüden "OAuth2" > "General" sekmesine gidin**
2. **"Client Secret" bölümünde "Reset Secret" butonuna tıklayın**
3. **Çıkan secret'ı kopyalayın ve kaydedin**

---

## 3. Supabase Veritabanı Kurulumu

### 3.1 Supabase Nedir?

**Supabase**, bot'unuzun verilerini (ticket'lar, çekilişler, ayarlar) saklayacağı ücretsiz veritabanı hizmetidir.

### 3.2 Supabase Hesabı Oluşturma

1. **https://supabase.com adresine gidin**
2. **"Start your project" butonuna tıklayın**
3. **GitHub ile giriş yapın:**
   - Eğer GitHub hesabınız yoksa, https://github.com adresinden oluşturun
   - "Sign in with GitHub" butonuna tıklayın
   - GitHub'da oturum açın ve izinleri onaylayın

### 3.3 Yeni Proje Oluşturma

1. **"New Project" butonuna tıklayın** (yeşil buton)
2. **Organization seçin** (genellikle kullanıcı adınız)
3. **Proje bilgilerini doldurun:**
   - **Name:** `discord-bot-database` (veya istediğiniz ad)
   - **Database Password:** Güçlü bir şifre oluşturun
     - En az 8 karakter
     - Büyük-küçük harf, sayı ve özel karakter içermeli
     - Örnek: `MyBot2024!Pass`
   - **Region:** `Europe West (Ireland)` seçin (Türkiye'ye en yakın)
4. **"Create new project" butonuna tıklayın**
5. **⏳ 2-3 dakika bekleyin** (proje oluşturuluyor)

### 3.4 API Anahtarlarını Alma

**Proje oluşturulduktan sonra:**

1. **Sol menüden "Settings" (⚙️ simgesi) tıklayın**
2. **"API" sekmesine tıklayın**
3. **Şu bilgileri kopyalayın ve kaydedin:**

   **Project URL:**
   - `https://abcdefghijklmnop.supabase.co` gibi bir link
   - "Copy" butonuna tıklayın

   **anon public key:**
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ile başlayan uzun metin
   - "Copy" butonuna tıklayın

   **service_role key:**
   - ⚠️ **Bu çok gizli!** "Reveal" butonuna tıklayın
   - Çıkan uzun metni kopyalayın
   - Bu anahtarı kimseyle paylaşmayın!

---

## 4. Proje Kurulumu

### 4.1 Proje Dosyalarını İndirme

#### Yöntem 1: ZIP Dosyası İndirme (Kolay)
1. **GitHub sayfasında "Code" butonuna tıklayın**
2. **"Download ZIP" seçeneğine tıklayın**
3. **İndirilen ZIP dosyasını masaüstüne çıkarın**
4. **Çıkarılan klasörün adını `discord-bot-panel` yapın**

#### Yöntem 2: Git ile Klonlama
\`\`\`bash
# Terminal/Command Prompt açın
# Masaüstüne gidin
cd Desktop

# Projeyi klonlayın
git clone https://github.com/your-username/discord-bot-panel.git

# Proje klasörüne girin
cd discord-bot-panel
\`\`\`

### 4.2 Terminal/Command Prompt Açma

#### Windows:
1. **Proje klasörünü açın** (discord-bot-panel)
2. **Klasör içinde boş bir alana Shift+Sağ tık yapın**
3. **"PowerShell penceresini burada aç" seçeneğine tıklayın**

#### Mac:
1. **Terminal uygulamasını açın**
2. **Şu komutu yazın:**
\`\`\`bash
cd Desktop/discord-bot-panel
\`\`\`

#### Linux:
1. **Proje klasörüne sağ tıklayın**
2. **"Open in Terminal" seçeneğine tıklayın**

### 4.3 Gerekli Paketleri Yükleme

**Terminal/PowerShell'de şu komutu yazın:**
\`\`\`bash
npm install
\`\`\`

**Bu komut:**
- Tüm gerekli paketleri indirecek
- 2-5 dakika sürebilir
- İnternet bağlantısı gerektirir

**Başarılı olursa şöyle bir mesaj görürsünüz:**
\`\`\`
added 1234 packages in 45s
\`\`\`

**Hata alırsanız:**
- İnternet bağlantınızı kontrol edin
- Node.js'in doğru kurulduğunu kontrol edin: `node --version`

---

## 5. Ayar Dosyası Düzenleme

### 5.1 .env Dosyası Oluşturma

1. **Proje klasöründe `.env.example` dosyasını bulun**
2. **Bu dosyayı kopyalayın ve `.env` olarak yeniden adlandırın**

#### Windows'ta:
- `.env.example` dosyasına sağ tık > "Kopyala"
- Boş alana sağ tık > "Yapıştır"
- Yeni dosyaya sağ tık > "Yeniden adlandır" > `.env` yazın

#### Mac/Linux'ta:
\`\`\`bash
cp .env.example .env
\`\`\`

### 5.2 .env Dosyasını Düzenleme

1. **`.env` dosyasını metin editörü ile açın**
   - VS Code: Dosyaya sağ tık > "Open with Code"
   - Notepad++: Dosyaya sağ tık > "Edit with Notepad++"

2. **Şu değerleri doldurun:**

\`\`\`env
# Discord Bot Configuration
DISCORD_BOT_TOKEN=MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt
DISCORD_CLIENT_ID=1234567890123456789
DISCORD_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz123456

# Database Configuration (Supabase)
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secret-random-string-here-123456789

# Bot Settings
BOT_PREFIX=!
BOT_OWNER_ID=your_discord_user_id_here

# Development Settings
NODE_ENV=development
PORT=3000
\`\`\`

### 5.3 Değerleri Doldurma Rehberi

#### DISCORD_BOT_TOKEN:
- Adım 2.3'te kaydettiğiniz bot token'ını buraya yapıştırın
- Örnek: `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GhIjKl.MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt`

#### DISCORD_CLIENT_ID:
- Adım 2.5'te kaydettiğiniz Application ID'yi buraya yapıştırın
- Örnek: `1234567890123456789`

#### DISCORD_CLIENT_SECRET:
- Adım 2.6'da kaydettiğiniz Client Secret'ı buraya yapıştırın

#### SUPABASE_URL:
- Adım 3.4'te kaydettiğiniz Project URL'yi buraya yapıştırın
- Örnek: `https://abcdefghijklmnop.supabase.co`

#### SUPABASE_ANON_KEY:
- Adım 3.4'te kaydettiğiniz anon public key'i buraya yapıştırın

#### SUPABASE_SERVICE_ROLE_KEY:
- Adım 3.4'te kaydettiğiniz service_role key'i buraya yapıştırın

#### NEXTAUTH_SECRET:
- Rastgele güçlü bir şifre oluşturun
- Örnek: `my-super-secret-bot-password-2024-xyz`

#### BOT_OWNER_ID:
**Discord kullanıcı ID'nizi bulmak için:**
1. Discord'ı açın
2. Ayarlar > Gelişmiş > Geliştirici Modu'nu açın
3. Profilinize sağ tık > "Kullanıcı ID'sini Kopyala"
4. Bu ID'yi buraya yapıştırın

### 5.4 Dosyayı Kaydetme

- **Ctrl+S** (Windows/Linux) veya **Cmd+S** (Mac) ile kaydedin
- Dosyayı kapatın

---

## 6. Uygulamayı Çalıştırma

### 6.1 Veritabanını Hazırlama

**Terminal/PowerShell'de şu komutu çalıştırın:**
\`\`\`bash
npm run db:migrate
\`\`\`

**Başarılı olursa şu mesajı görürsünüz:**
\`\`\`
✅ Migration'lar başarıyla tamamlandı!
\`\`\`

**Hata alırsanız:**
- Supabase bilgilerinin doğru olduğunu kontrol edin
- İnternet bağlantınızı kontrol edin

### 6.2 Discord Bot'u Başlatma

**Yeni bir terminal penceresi açın ve şu komutu çalıştırın:**
\`\`\`bash
npm run bot:dev
\`\`\`

**Başarılı olursa şu mesajları görürsünüz:**
\`\`\`
✅ Bot YourBotName#1234 olarak giriş yaptı!
📊 1 sunucuda aktif
🔄 Slash komutları kaydediliyor...
✅ Slash komutları başarıyla kaydedildi!
\`\`\`

**Bu terminal penceresini açık bırakın!**

### 6.3 Web Panelini Başlatma

**Başka bir yeni terminal penceresi açın ve şu komutu çalıştırın:**
\`\`\`bash
npm run dev
\`\`\`

**Başarılı olursa şu mesajları görürsünüz:**
\`\`\`
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
\`\`\`

### 6.4 Bot'u Discord Sunucusuna Ekleme

1. **Discord Developer Portal'a geri dönün**
2. **OAuth2 > URL Generator sekmesine gidin**
3. **Scopes bölümünde şunları seçin:**
   - ✅ bot
   - ✅ applications.commands
4. **Bot Permissions bölümünde şunları seçin:**
   - ✅ Administrator (en kolay yol)
   - Veya gerekli izinleri tek tek seçin
5. **Alttaki URL'yi kopyalayın**
6. **Bu URL'yi yeni sekmede açın**
7. **Sunucunuzu seçin ve "Yetkilendir" butonuna tıklayın**

### 6.5 Test Etme

#### Web Panel Testi:
1. **Tarayıcıda http://localhost:3000 adresine gidin**
2. **Dashboard'ı görmelisiniz**

#### Discord Bot Testi:
**Discord sunucunuzda şu komutları deneyin:**
\`\`\`
/help
/ticket create konu:Test ticket
\`\`\`

---

## 7. Docker ile Kurulum (İleri Seviye)

### 7.1 Docker Nedir?

**Docker**, uygulamaları "konteyner" adı verilen izole ortamlarda çalıştırmaya yarayan bir teknolojidir. Bu sayede:
- Tüm bağımlılıklar otomatik yüklenir
- Farklı bilgisayarlarda aynı şekilde çalışır
- Kurulum daha kolaydır

### 7.2 Docker Kurulumu

#### Windows için:
1. **https://www.docker.com/products/docker-desktop/ adresine gidin**
2. **"Docker Desktop for Windows" butonuna tıklayın**
3. **İndirilen dosyayı çalıştırın**
4. **Kurulum sihirbazını takip edin**
5. **Bilgisayarı yeniden başlatın**
6. **Docker Desktop'ı açın ve oturum açın**

#### Mac için:
1. **https://www.docker.com/products/docker-desktop/ adresine gidin**
2. **"Docker Desktop for Mac" butonuna tıklayın**
3. **İndirilen .dmg dosyasını açın**
4. **Docker'ı Applications klasörüne sürükleyin**
5. **Docker'ı çalıştırın**

#### Linux için:
\`\`\`bash
# Ubuntu/Debian için
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
\`\`\`

**Kurulum Kontrolü:**
\`\`\`bash
docker --version
docker-compose --version
\`\`\`

### 7.3 Docker ile Projeyi Çalıştırma

#### 7.3.1 .env Dosyasını Hazırlayın
- Yukarıdaki adımları takip ederek `.env` dosyasını oluşturun

#### 7.3.2 Docker Compose ile Başlatma
\`\`\`bash
# Proje klasöründe terminal açın
# Tüm servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f
\`\`\`

#### 7.3.3 Veritabanını Hazırlama
\`\`\`bash
# Migration'ları çalıştır
docker-compose exec web npm run db:migrate
\`\`\`

#### 7.3.4 Servisleri Durdurma
\`\`\`bash
# Tüm servisleri durdur
docker-compose down

# Verileri de sil
docker-compose down -v
\`\`\`

### 7.4 Docker Komutları Rehberi

\`\`\`bash
# Çalışan konteynerleri görüntüle
docker ps

# Tüm konteynerleri görüntüle
docker ps -a

# Konteyner loglarını görüntüle
docker logs <container_name>

# Konteyner içine gir
docker exec -it <container_name> /bin/bash

# Konteyneri yeniden başlat
docker restart <container_name>

# Kullanılmayan imajları temizle
docker system prune
\`\`\`

---

## 8. Sorun Giderme

### 8.1 Sık Karşılaşılan Hatalar

#### "Bot token invalid" Hatası
**Sebep:** Bot token'ı yanlış veya eksik
**Çözüm:**
1. Discord Developer Portal'da yeni token oluşturun
2. `.env` dosyasında token'ı güncelleyin
3. Bot'u yeniden başlatın

#### "Database connection failed" Hatası
**Sebep:** Supabase bağlantı bilgileri yanlış
**Çözüm:**
1. Supabase dashboard'ında API anahtarlarını kontrol edin
2. `.env` dosyasındaki URL ve anahtarları güncelleyin
3. İnternet bağlantınızı kontrol edin

#### "Port 3000 already in use" Hatası
**Sebep:** 3000 portu başka bir uygulama tarafından kullanılıyor
**Çözüm:**
\`\`\`bash
# Windows'ta port'u kullanan işlemi bul
netstat -ano | findstr :3000

# İşlemi sonlandır
taskkill /PID <process_id> /F

# Veya farklı port kullan
PORT=3001 npm run dev
\`\`\`

#### "npm: command not found" Hatası
**Sebep:** Node.js doğru kurulmamış
**Çözüm:**
1. Node.js'i yeniden indirin ve kurun
2. Bilgisayarı yeniden başlatın
3. Terminal'i yeniden açın

#### Bot Komutları Çalışmıyor
**Sebep:** Bot izinleri eksik veya slash komutları kaydedilmemiş
**Çözüm:**
1. Bot'un Administrator iznine sahip olduğunu kontrol edin
2. Bot'u sunucudan çıkarıp yeniden ekleyin
3. Bot'u yeniden başlatın

### 8.2 Log Dosyalarını İnceleme

**Bot loglarını görmek için:**
\`\`\`bash
# Bot çalışırken terminal'de logları görebilirsiniz
# Hata mesajlarını tam olarak kopyalayın
\`\`\`

**Web panel loglarını görmek için:**
\`\`\`bash
# Web panel çalışırken terminal'de logları görebilirsiniz
# Tarayıcı console'unu da kontrol edin (F12 tuşu)
\`\`\`

### 8.3 Temiz Kurulum

**Eğer hiçbir şey çalışmıyorsa:**
\`\`\`bash
# Tüm node_modules klasörünü silin
rm -rf node_modules

# Package-lock.json dosyasını silin
rm package-lock.json

# Paketleri yeniden yükleyin
npm install
\`\`\`

### 8.4 Yardım Alma

**Sorun yaşıyorsanız:**
1. **Hata mesajının tam metnini kopyalayın**
2. **Hangi adımda takıldığınızı belirtin**
3. **İşletim sisteminizi belirtin**
4. **GitHub Issues'da sorun bildirin**
5. **Discord sunucumuzda yardım isteyin**

---

## 9. Güvenlik Önerileri

### 9.1 Token Güvenliği
- ❌ Bot token'ınızı kimseyle paylaşmayın
- ❌ Token'ı GitHub'a yüklemeyin
- ❌ Discord'da token'ı yazmayın
- ✅ `.env` dosyasını `.gitignore`'a ekleyin

### 9.2 Sunucu Güvenliği
- ✅ Bot'a sadece gerekli izinleri verin
- ✅ Düzenli olarak bot aktivitelerini kontrol edin
- ✅ Şüpheli aktivite durumunda token'ı yenileyin

### 9.3 Veritabanı Güvenliği
- ✅ Supabase service_role key'ini gizli tutun
- ✅ Düzenli olarak veritabanı yedekleyin
- ✅ RLS (Row Level Security) politikalarını kullanın

---

## 10. Sonraki Adımlar

### 10.1 Bot'u Özelleştirme
1. **Web panelinden bot ayarlarını yapılandırın**
2. **Ticket kategorileri oluşturun**
3. **Hoş geldin mesajlarını ayarlayın**
4. **Log kanallarını belirleyin**
5. **Yetkileri yapılandırın**

### 10.2 Production'a Alma
1. **Vercel'de web panelini deploy edin**
2. **Railway/Heroku'da bot'u deploy edin**
3. **Domain adı alın**
4. **SSL sertifikası ayarlayın**

### 10.3 Bakım ve Güncelleme
1. **Düzenli olarak logları kontrol edin**
2. **Bot'un çalışır durumda olduğunu kontrol edin**
3. **Güncellemeleri takip edin**
4. **Yedekleme yapın**

---

## 🎉 Tebrikler!

Kurulum tamamlandı! Artık Discord bot yönetim panelinizi kullanabilirsiniz.

**Önemli Notlar:**
- Bot'un 7/24 çalışması için bir sunucuda host etmeniz gerekir
- Ücretsiz hosting seçenekleri: Railway, Heroku, Render
- Ücretli hosting seçenekleri: DigitalOcean, AWS, Google Cloud

**Destek için:**
- GitHub Issues: Teknik sorunlar için
- Discord Sunucusu: Genel yardım için
- Dokümantasyon: Detaylı bilgi için

İyi kullanımlar! 🚀
\`\`\`

Şimdi Docker için ayrı bir detaylı rehber hazırlayacağım:
