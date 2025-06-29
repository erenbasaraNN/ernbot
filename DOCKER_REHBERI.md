# 🐳 Docker ile Discord Bot Kurulumu - Başlangıç Rehberi

Bu rehber, Docker'ı hiç bilmeyen kişiler için hazırlanmıştır.

## 📋 Docker Nedir?

**Basit Açıklama:**
Docker, uygulamaları "kutular" (konteyner) içinde çalıştıran bir teknolojidir. Bu kutular:
- Uygulamanın çalışması için gereken her şeyi içerir
- Farklı bilgisayarlarda aynı şekilde çalışır
- Birbirinden izole edilmiştir
- Kolay kurulum ve yönetim sağlar

**Analoji:**
Docker'ı nakliye konteynerleri gibi düşünün. Nasıl ki bir konteyner içindeki eşyalar her gemide, kamyonda aynı şekilde taşınırsa, Docker konteynerleri de her bilgisayarda aynı şekilde çalışır.

## 🛠️ Docker Kurulumu

### Windows için Detaylı Kurulum

#### Adım 1: Sistem Gereksinimlerini Kontrol Edin
**Minimum Gereksinimler:**
- Windows 10 64-bit: Pro, Enterprise, veya Education (Build 16299 veya üzeri)
- Windows 11 64-bit: Home veya Pro
- WSL 2 özelliği
- Virtualization teknolojisi BIOS'ta etkin olmalı

**Sistem Kontrolü:**
1. **Windows tuşu + R** basın
2. **`winver`** yazın ve Enter basın
3. Windows sürümünüzü kontrol edin

#### Adım 2: WSL 2 Kurulumu
**WSL nedir?** Windows Subsystem for Linux - Docker'ın Windows'ta çalışması için gerekli

**PowerShell'i Yönetici olarak açın:**
1. Başlat menüsünde "PowerShell" arayın
2. "Windows PowerShell"e sağ tık
3. "Yönetici olarak çalıştır" seçin

**Şu komutları sırayla çalıştırın:**
```powershell
# WSL özelliğini etkinleştir
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Virtual Machine Platform özelliğini etkinleştir
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Bilgisayarı yeniden başlat
Restart-Computer
