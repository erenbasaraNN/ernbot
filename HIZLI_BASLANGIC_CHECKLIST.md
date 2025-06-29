# ✅ Hızlı Başlangıç Checklist

Bu checklist'i takip ederek projeyi adım adım kurun.

## 📋 Ön Hazırlık

### Gerekli Programlar
- [ ] **Node.js 18+** kuruldu (`node --version` ile kontrol edin)
- [ ] **Git** kuruldu (`git --version` ile kontrol edin)
- [ ] **Metin editörü** kuruldu (VS Code önerilir)
- [ ] **Discord hesabı** mevcut
- [ ] **GitHub hesabı** mevcut (Supabase için)

## 🤖 Discord Bot Kurulumu

### Discord Developer Portal
- [ ] https://discord.com/developers/applications adresine gidildi
- [ ] "New Application" ile yeni uygulama oluşturuldu
- [ ] Uygulama adı girildi (örn: "Sunucu Yöneticisi")

### Bot Ayarları
- [ ] "Bot" sekmesine gidildi
- [ ] "Reset Token" ile token oluşturuldu
- [ ] **Bot token kopyalandı ve güvenli yere kaydedildi** ⚠️
- [ ] Privileged Gateway Intents etkinleştirildi:
  - [ ] Presence Intent ✅
  - [ ] Server Members Intent ✅
  - [ ] Message Content Intent ✅

### OAuth2 Ayarları
- [ ] "General Information" sekmesinden **Application ID** kopyalandı
- [ ] "OAuth2 > General" sekmesinden **Client Secret** alındı

## 🗄️ Supabase Kurulumu

### Hesap Oluşturma
- [ ] https://supabase.com adresine gidildi
- [ ] GitHub ile giriş yapıldı
- [ ] "New Project" ile proje oluşturuldu

### Proje Ayarları
- [ ] Proje adı girildi (örn: "discord-bot-database")
- [ ] **Güçlü veritabanı şifresi** oluşturuldu ve kaydedildi
- [ ] Region seçildi (Europe West - Ireland)
- [ ] Proje oluşturulması beklendi (2-3 dakika)

### API Anahtarları
- [ ] "Settings > API" sekmesine gidildi
- [ ] **Project URL** kopyalandı
- [ ] **anon public key** kopyalandı
- [ ] **service_role key** kopyalandı ⚠️ (GİZLİ!)

## 💻 Proje Kurulumu

### Dosyaları İndirme
- [ ] Proje ZIP dosyası indirildi VEYA Git ile klonlandı
- [ ] Proje klasörü masaüstüne çıkarıldı
- [ ] Klasör adı `discord-bot-panel` olarak ayarlandı

### Terminal Açma
- [ ] **Windows:** Proje klasöründe Shift+Sağ tık > "PowerShell penceresini burada aç"
- [ ] **Mac:** Terminal açıldı ve `cd Desktop/discord-bot-panel` komutu çalıştırıldı
- [ ] **Linux:** Proje klasöründe sağ tık > "Open in Terminal"

### Paket Kurulumu
- [ ] `npm install` komutu çalıştırıldı
- [ ] Kurulum başarıyla tamamlandı (2-5 dakika sürebilir)
- [ ] "added XXX packages" mesajı görüldü

## ⚙️ Ayar Dosyası

### .env Dosyası Oluşturma
- [ ] `.env.example` dosyası `.env` olarak kopyalandı
- [ ] `.env` dosyası metin editörü ile açıldı

### Değerleri Doldurma
- [ ] `DISCORD_BOT_TOKEN=` Discord bot token'ı yapıştırıldı
- [ ] `DISCORD_CLIENT_ID=` Application ID yapıştırıldı
- [ ] `DISCORD_CLIENT_SECRET=` Client Secret yapıştırıldı
- [ ] `SUPABASE_URL=` Supabase Project URL yapıştırıldı
- [ ] `SUPABASE_ANON_KEY=` Supabase anon key yapıştırıldı
- [ ] `SUPABASE_SERVICE_ROLE_KEY=` Supabase service role key yapıştırıldı
- [ ] `NEXTAUTH_SECRET=` Rastgele güçlü şifre oluşturuldu
- [ ] `BOT_OWNER_ID=` Discord kullanıcı ID'si girildi

### Discord Kullanıcı ID Alma
- [ ] Discord'da Ayarlar > Gelişmiş > Geliştirici Modu etkinleştirildi
- [ ] Profil resmine sağ tık > "Kullanıcı ID'sini Kopyala" yapıldı
- [ ] ID, BOT_OWNER_ID değerine yapıştırıldı

### Dosyayı Kaydetme
- [ ] `.env` dosyası kaydedildi (Ctrl+S / Cmd+S)
- [ ] Dosya kapatıldı

## 🚀 Uygulamayı Başlatma

### Veritabanı Hazırlama
- [ ] `npm run db:migrate` komutu çalıştırıldı
- [ ] "✅ Migration'lar başarıyla tamamlandı!" mesajı görüldü

### Bot'u Başlatma
- [ ] **Yeni terminal penceresi** açıldı
- [ ] `npm run bot:dev` komutu çalıştırıldı
- [ ] Bot giriş mesajları görüldü:
  - [ ] "✅ Bot YourBotName#1234 olarak giriş yaptı!"
  - [ ] "📊 X sunucuda aktif"
  - [ ] "✅ Slash komutları başarıyla kaydedildi!"
- [ ] **Bu terminal penceresi açık bırakıldı**

### Web Panel Başlatma
- [ ] **Başka bir yeni terminal penceresi** açıldı
- [ ] `npm run dev` komutu çalıştırıldı
- [ ] "ready - started server on 0.0.0.0:3000" mesajı görüldü
- [ ] **Bu terminal penceresi de açık bırakıldı**

## 🔗 Bot'u Sunucuya Ekleme

### Davet Linki Oluşturma
- [ ] Discord Developer Portal'a geri dönüldü
- [ ] "OAuth2 > URL Generator" sekmesine gidildi
- [ ] Scopes seçildi:
  - [ ] bot ✅
  - [ ] applications.commands ✅
- [ ] Bot Permissions seçildi:
  - [ ] Administrator ✅ (kolay yol)
- [ ] Oluşan URL kopyalandı

### Bot'u Ekleme
- [ ] Davet URL'si yeni sekmede açıldı
- [ ] Test sunucusu seçildi
- [ ] "Yetkilendir" butonuna tıklandı
- [ ] Bot başarıyla sunucuya eklendi

## ✅ Test Etme

### Web Panel Testi
- [ ] Tarayıcıda http://localhost:3000 adresine gidildi
- [ ] Dashboard görüntülendi
- [ ] Sunucu seçici çalışıyor

### Discord Bot Testi
- [ ] Discord sunucusunda `/help` komutu test edildi
- [ ] `/ticket create konu:Test` komutu test edildi
- [ ] Bot komutlara yanıt veriyor

## 🎉 Kurulum Tamamlandı!

### Başarı Kontrolleri
- [ ] 2 terminal penceresi çalışıyor (bot ve web)
- [ ] Web panel http://localhost:3000 adresinde açılıyor
- [ ] Discord bot online ve komutlara yanıt veriyor
- [ ] Veritabanı bağlantısı çalışıyor

### Sonraki Adımlar
- [ ] Web panelinden bot ayarlarını yapılandır
- [ ] Ticket kategorileri oluştur
- [ ] Hoş geldin mesajlarını ayarla
- [ ] Log kanallarını belirle
- [ ] Yetkileri yapılandır

## 🆘 Sorun mu Yaşıyorsunuz?

### Hızlı Kontroller
- [ ] Tüm terminal pencereleri açık mı?
- [ ] İnternet bağlantısı var mı?
- [ ] .env dosyasındaki tüm değerler dolu mu?
- [ ] Bot token'ı doğru mu?
- [ ] Supabase bilgileri doğru mu?

### Yardım Kaynakları
- [ ] DETAYLI_KURULUM_REHBERI.md dosyasını oku
- [ ] Hata mesajlarını tam olarak kopyala
- [ ] GitHub Issues'da sorun bildir
- [ ] Discord sunucusunda yardım iste

---

**🎯 Bu checklist'i yazdırıp yanınızda tutabilirsiniz!**

**⏱️ Tahmini kurulum süresi:** 30-60 dakika (ilk kez yapıyorsanız)

**💡 İpucu:** Her adımı tamamladıktan sonra kutucuğu işaretleyin!
