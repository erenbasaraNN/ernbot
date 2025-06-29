import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get("guildId")

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID gerekli" }, { status: 400 })
    }

    // Örnek çekiliş verileri
    const giveaways = [
      {
        id: "giveaway-1",
        title: "Discord Nitro Çekilişi",
        prize: "Discord Nitro (1 Ay)",
        winnerCount: 1,
        participantCount: 45,
        status: "active",
        endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: "moderator123",
        channelId: "123456789",
      },
      {
        id: "giveaway-2",
        title: "Steam Oyun Çekilişi",
        prize: "Steam Oyunu (50₺)",
        winnerCount: 2,
        participantCount: 78,
        status: "active",
        endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: "admin456",
        channelId: "987654321",
      },
      {
        id: "giveaway-3",
        title: "Özel Rol Çekilişi",
        prize: "VIP Rolü",
        winnerCount: 3,
        participantCount: 123,
        status: "ended",
        endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: "owner789",
        channelId: "456789123",
        winners: ["user1", "user2", "user3"],
      },
    ]

    return NextResponse.json(giveaways)
  } catch (error) {
    console.error("Çekiliş listesi getirme hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guildId, action, ...data } = body

    switch (action) {
      case "create":
        const newGiveaway = {
          id: `giveaway-${Date.now()}`,
          ...data,
          status: "active",
          participantCount: 0,
          createdAt: new Date().toISOString(),
        }
        console.log("Yeni çekiliş oluşturuluyor:", newGiveaway)
        return NextResponse.json({ success: true, giveaway: newGiveaway })

      case "end":
        console.log(`Çekiliş sonlandırılıyor: ${data.giveawayId}`)
        return NextResponse.json({ success: true, message: "Çekiliş başarıyla sonlandırıldı" })

      case "reroll":
        console.log(`Çekiliş yeniden çekiliyor: ${data.giveawayId}`)
        return NextResponse.json({ success: true, message: "Çekiliş yeniden çekildi" })

      default:
        return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 })
    }
  } catch (error) {
    console.error("Çekiliş işlem hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
