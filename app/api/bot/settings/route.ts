import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get("guildId")

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID gerekli" }, { status: 400 })
    }

    // Veritabanından bot ayarlarını getir
    const settings = {
      guildId,
      prefix: "!",
      language: "tr",
      welcomeEnabled: true,
      welcomeChannel: "1234567890",
      welcomeMessage: "Hoş geldin {user}!",
      leaveEnabled: false,
      leaveChannel: null,
      leaveMessage: "Görüşürüz {user}!",
      autoRole: null,
      moderationEnabled: true,
      antiSpam: false,
      antiRaid: false,
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Ayarlar getirme hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guildId, ...settings } = body

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID gerekli" }, { status: 400 })
    }

    // Veritabanına ayarları kaydet
    console.log("Bot ayarları güncellendi:", { guildId, settings })

    return NextResponse.json({ success: true, message: "Ayarlar başarıyla kaydedildi" })
  } catch (error) {
    console.error("Ayarlar kaydetme hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
