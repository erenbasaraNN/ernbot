import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get("guildId")
    const status = searchParams.get("status") || "all"

    if (!guildId) {
      return NextResponse.json({ error: "Guild ID gerekli" }, { status: 400 })
    }

    // Örnek ticket verileri
    const tickets = [
      {
        id: "ticket-1",
        userId: "123456789",
        username: "kullanici123",
        subject: "Hesap Sorunu",
        status: "open",
        category: "support",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        channelId: "987654321",
      },
      {
        id: "ticket-2",
        userId: "987654321",
        username: "test456",
        subject: "Bot Hatası",
        status: "pending",
        category: "bug",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        channelId: "123456789",
      },
      {
        id: "ticket-3",
        userId: "456789123",
        username: "member789",
        subject: "Rol Talebi",
        status: "closed",
        category: "request",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        channelId: "456789123",
        closedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ]

    const filteredTickets = status === "all" ? tickets : tickets.filter((ticket) => ticket.status === status)

    return NextResponse.json(filteredTickets)
  } catch (error) {
    console.error("Ticket listesi getirme hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guildId, action, ticketId, ...data } = body

    switch (action) {
      case "close":
        console.log(`Ticket kapatılıyor: ${ticketId}`)
        return NextResponse.json({ success: true, message: "Ticket başarıyla kapatıldı" })

      case "reopen":
        console.log(`Ticket yeniden açılıyor: ${ticketId}`)
        return NextResponse.json({ success: true, message: "Ticket yeniden açıldı" })

      case "assign":
        console.log(`Ticket atanıyor: ${ticketId} -> ${data.assignedTo}`)
        return NextResponse.json({ success: true, message: "Ticket başarıyla atandı" })

      default:
        return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 })
    }
  } catch (error) {
    console.error("Ticket işlem hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
