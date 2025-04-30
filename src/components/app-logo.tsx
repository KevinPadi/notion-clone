import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import NotionLogo from "/public/notiony-logo.png"
export function AppLogo() {

  return (
    <SidebarMenu>
      <SidebarMenuItem className="font-bold flex items-center gap-3">
        <div className="size-8 p-1 rounded-lg flex items-center justify-center">
          <img src={NotionLogo} alt=" logo" />
        </div>
        Notiony 
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
