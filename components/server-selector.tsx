"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Server } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const servers = [
  { id: "1234567890", name: "Ana Sunucu", memberCount: 1234 },
  { id: "0987654321", name: "Test Sunucusu", memberCount: 56 },
  { id: "1122334455", name: "Geliştirici Sunucusu", memberCount: 789 },
]

interface ServerSelectorProps {
  selectedServer: string
  onServerChange: (serverId: string) => void
}

export function ServerSelector({ selectedServer, onServerChange }: ServerSelectorProps) {
  const [open, setOpen] = useState(false)

  const currentServer = servers.find((server) => server.id === selectedServer)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between bg-transparent"
        >
          <div className="flex items-center">
            <Server className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">{currentServer?.name}</div>
              <div className="text-xs text-muted-foreground">{currentServer?.memberCount} üye</div>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Sunucu ara..." />
          <CommandList>
            <CommandEmpty>Sunucu bulunamadı.</CommandEmpty>
            <CommandGroup>
              {servers.map((server) => (
                <CommandItem
                  key={server.id}
                  value={server.id}
                  onSelect={() => {
                    onServerChange(server.id)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedServer === server.id ? "opacity-100" : "opacity-0")} />
                  <Server className="mr-2 h-4 w-4" />
                  <div className="flex-1">
                    <div className="font-medium">{server.name}</div>
                    <div className="text-xs text-muted-foreground">{server.memberCount} üye</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
