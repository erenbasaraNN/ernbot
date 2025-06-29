"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ServerSelector } from "@/components/server-selector"
import { Users, MessageSquare, Gift, Shield, Hash, FileText, Activity, Settings, Ticket } from "lucide-react"

export function Dashboard() {
  const [selectedServer, setSelectedServer] = useState("1234567890")

  const stats = [
    { title: "Toplam Üye", value: "1,234", icon: Users, change: "+12%" },
    { title: "Aktif Ticketlar", value: "23", icon: Ticket, change: "+5%" },
    { title: "Günlük Mesaj", value: "5,678", icon: MessageSquare, change: "+18%" },
    { title: "Aktif Çekilişler", value: "3", icon: Gift, change: "0%" },
  ]

  const features = [
    {
      title: "Ticket Sistemi",
      description: "Destek ticket sistemi yönetimi",
      icon: Ticket,
      href: "/tickets",
      status: "active",
    },
    {
      title: "Embed Yöneticisi",
      description: "Özel embed mesajları oluştur",
      icon: FileText,
      href: "/embeds",
      status: "active",
    },
    {
      title: "Çekiliş Sistemi",
      description: "Çekiliş etkinlikleri düzenle",
      icon: Gift,
      href: "/giveaways",
      status: "active",
    },
    {
      title: "Rol Yönetimi",
      description: "Sunucu rollerini yönet",
      icon: Shield,
      href: "/roles",
      status: "active",
    },
    {
      title: "Kanal Yönetimi",
      description: "Kanal ayarları ve izinleri",
      icon: Hash,
      href: "/channels",
      status: "active",
    },
    {
      title: "Mesaj Yönetimi",
      description: "Otomatik mesaj sistemleri",
      icon: MessageSquare,
      href: "/messages",
      status: "active",
    },
    {
      title: "Log Sistemi",
      description: "Sunucu aktivite logları",
      icon: Activity,
      href: "/logs",
      status: "active",
    },
    {
      title: "Genel Ayarlar",
      description: "Bot genel konfigürasyonu",
      icon: Settings,
      href: "/settings",
      status: "active",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/10 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Discord bot yönetim paneline hoş geldiniz</p>
              </div>
              <ServerSelector selectedServer={selectedServer} onServerChange={setSelectedServer} />
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> geçen aydan
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <Badge variant={feature.status === "active" ? "default" : "secondary"}>
                        {feature.status === "active" ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      Yönet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
                <CardDescription>Sunucudaki son bot aktiviteleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Yeni ticket oluşturuldu", user: "kullanici123", time: "2 dakika önce" },
                    { action: "Çekiliş başlatıldı", user: "moderator456", time: "15 dakika önce" },
                    { action: "Rol verildi", user: "admin789", time: "1 saat önce" },
                    { action: "Kanal oluşturuldu", user: "owner", time: "2 saat önce" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">Kullanıcı: {activity.user}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
