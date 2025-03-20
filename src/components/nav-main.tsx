import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import { Home, Search, PlusCircleIcon } from "lucide-react"

export function NavMain() {
  return (
    <SidebarMenu className="space-y-1">

        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton
            tooltip="Quick Create"
            className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          >
            <PlusCircleIcon />
            <span>Nueva página</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      
        <SidebarMenuItem>
          <SidebarMenuButton className="p-0 relative">
            <Search className="absolute left-2" />
            <Input placeholder="Buscar" className="w-full border-0 ps-8 bg-transparent dark:bg-transparent" />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Home />
            Home
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
