import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import NotionIcon from "./icons/notion-icon"

export function AppLogo() {

  return (
    <SidebarMenu>
      <SidebarMenuItem className="font-bold flex items-center gap-3">
        <div className="size-8 bg-emerald-600 p-1 rounded-lg flex items-center justify-center">
          <NotionIcon />
        </div>
        Notiony 
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
