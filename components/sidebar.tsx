"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Ticket,
  FileText,
  Gift,
  Shield,
  Hash,
  MessageSquare,
  Activity,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Ticket Sistemi", href: "/tickets", icon: Ticket },
  { name: "Embed Yöneticisi", href: "/embeds", icon: FileText },
  { name: "Çekiliş Sistemi", href: "/giveaways", icon: Gift },
  { name: "Rol Yönetimi", href: "/roles", icon: Shield },
  { name: "Kanal Yönetimi", href: "/channels", icon: Hash },
  { name: "Mesaj Yönetimi", href: "/messages", icon: MessageSquare },
  { name: "Log Sistemi", href: "/logs", icon: Activity },
  { name: "Yetki Yönetimi", href: "/permissions", icon: Users },
  { name: "Ayarlar", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn("flex flex-col border-r bg-background transition-all duration-300", collapsed ? "w-16" : "w-64")}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold">Discord Bot Panel</h2>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                {!collapsed && item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
