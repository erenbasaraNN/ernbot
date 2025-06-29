"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ticket, Plus, Users, MessageSquare } from "lucide-react"

export function TicketManager() {
  const [ticketSettings, setTicketSettings] = useState({
    enabled: true,
    categoryId: "",
    supportRoles: [],
    maxTickets: 3,
    autoClose: 24,
    welcomeMessage: "Merhaba! Destek ekibimiz en kısa sürede size yardımcı olacak.",
  })

  const activeTickets = [
    { id: "1", user: "kullanici123", subject: "Hesap Sorunu", status: "open", created: "2 saat önce" },
    { id: "2", user: "test456", subject: "Bot Hatası", status: "pending", created: "5 saat önce" },
    { id: "3", user: "member789", subject: "Rol Talebi", status: "closed", created: "1 gün önce" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Ticket className="h-8 w-8" />
                Ticket Sistemi
              </h1>
              <p className="text-muted-foreground">Destek ticket sistemi yönetimi</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Kategori
            </Button>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/10 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs defaultValue="tickets" className="space-y-4">
              <TabsList>
                <TabsTrigger value="tickets">Aktif Ticketlar</TabsTrigger>
                <TabsTrigger value="settings">Ayarlar</TabsTrigger>
                <TabsTrigger value="categories">Kategoriler</TabsTrigger>
              </TabsList>

              <TabsContent value="tickets" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Toplam Ticket</CardTitle>
                      <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">+3 bu hafta</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Açık Ticketlar</CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">Yanıt bekliyor</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ortalama Yanıt</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.5h</div>
                      <p className="text-xs text-muted-foreground">Son 7 gün</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Aktif Ticketlar</CardTitle>
                    <CardDescription>Şu anda açık olan destek ticketları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{ticket.subject}</h4>
                              <Badge
                                variant={
                                  ticket.status === "open"
                                    ? "default"
                                    : ticket.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {ticket.status === "open"
                                  ? "Açık"
                                  : ticket.status === "pending"
                                    ? "Beklemede"
                                    : "Kapalı"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Kullanıcı: {ticket.user} • {ticket.created}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Görüntüle
                            </Button>
                            <Button variant="outline" size="sm">
                              Kapat
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Sistemi Ayarları</CardTitle>
                    <CardDescription>Ticket sisteminin genel ayarlarını yapılandırın</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ticket Sistemi</Label>
                        <p className="text-sm text-muted-foreground">Ticket sistemini etkinleştir/devre dışı bırak</p>
                      </div>
                      <Switch
                        checked={ticketSettings.enabled}
                        onCheckedChange={(checked) => setTicketSettings((prev) => ({ ...prev, enabled: checked }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Ticket Kategorisi</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">🎫 Destek</SelectItem>
                          <SelectItem value="reports">📋 Şikayetler</SelectItem>
                          <SelectItem value="suggestions">💡 Öneriler</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxTickets">Maksimum Ticket Sayısı</Label>
                      <Input
                        id="maxTickets"
                        type="number"
                        value={ticketSettings.maxTickets}
                        onChange={(e) =>
                          setTicketSettings((prev) => ({ ...prev, maxTickets: Number.parseInt(e.target.value) }))
                        }
                      />
                      <p className="text-sm text-muted-foreground">
                        Bir kullanıcının aynı anda açabileceği maksimum ticket sayısı
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="autoClose">Otomatik Kapanma (Saat)</Label>
                      <Input
                        id="autoClose"
                        type="number"
                        value={ticketSettings.autoClose}
                        onChange={(e) =>
                          setTicketSettings((prev) => ({ ...prev, autoClose: Number.parseInt(e.target.value) }))
                        }
                      />
                      <p className="text-sm text-muted-foreground">
                        İnaktif ticketların otomatik kapanma süresi (0 = devre dışı)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="welcomeMessage">Hoş Geldin Mesajı</Label>
                      <Textarea
                        id="welcomeMessage"
                        value={ticketSettings.welcomeMessage}
                        onChange={(e) => setTicketSettings((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                        rows={3}
                      />
                      <p className="text-sm text-muted-foreground">Yeni ticket açıldığında gönderilecek mesaj</p>
                    </div>

                    <Button>Ayarları Kaydet</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Kategorileri</CardTitle>
                    <CardDescription>Farklı ticket türleri için kategoriler oluşturun</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "🎫 Genel Destek", description: "Genel destek talepleri", count: 15 },
                        { name: "📋 Şikayetler", description: "Kullanıcı şikayetleri", count: 5 },
                        { name: "💡 Öneriler", description: "Sunucu önerileri", count: 3 },
                      ].map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                            <p className="text-xs text-muted-foreground">{category.count} aktif ticket</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Düzenle
                            </Button>
                            <Button variant="outline" size="sm">
                              Sil
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
