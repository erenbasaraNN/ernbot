import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get("guildId")
    const eventType = searchParams.get("eventType") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID gerekli" }, { status: 400 })
    }

    // Örnek log verileri
    const logs = [
      {
        id: 1,
        eventType: "MEMBER_JOIN",
        userId: "123456789",
        username: "yeniuye123",
        data: { memberCount: 501 },
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        eventType: "MESSAGE_DELETE",
        userId: "987654321",
        username: "kullanici456",
        channelId: "123456789",
        data: { content: "Silinen mesaj içeriği", channelName: "genel" },
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        eventType: "ROLE_UPDATE",
        userId: "456789123",
        username: "moderator789",
        targetId: "789123456",
        data: { roleName: "Moderator", action: "added", targetUser: "hedefkullanici" },
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        eventType: "CHANNEL_CREATE",
        userId: "321654987",
        username: "admin321",
        channelId: "987654321",
        data: { channelName: "yeni-kanal", channelType: "text" },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        eventType: "TICKET_CREATE",
        userId: "654321987",
        username: "destek123",
        data: { subject: "Hesap Sorunu", ticketId: "ticket-123" },
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ]

    const filteredLogs = eventType === "all" ? logs : logs.filter((log) => log.eventType === eventType)

    const limitedLogs = filteredLogs.slice(0, limit)

    return NextResponse.json(limitedLogs)
  } catch (error) {
    console.error("Log listesi getirme hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
