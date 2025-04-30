import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavPrivate } from "./nav-private"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="space-y-4 border-b">
        <NavMain />
      </SidebarHeader>
      <SidebarContent className="scroll">
        <NavFavorites />
        <NavPrivate />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
