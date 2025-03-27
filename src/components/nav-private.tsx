import {
  FileText
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePagesContext } from "@/context/pages_context"
import NavItemDropdown from "./nav-item-dropdown"

export function NavPrivate() {
  const { pages } = usePagesContext()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Páginas</SidebarGroupLabel>
      <SidebarMenu>
        {pages?.filter(item => item.favorite === false).map((item) => (
          <SidebarMenuItem key={item._id}>
            <SidebarMenuButton asChild>
              <a href={'#'} title={item.name}>
                <span>
                  {
                    item.icon !== 'none' ? item.icon : <FileText className="text-muted-foreground stroke-[1.5] size-5"/>
                  }
                </span>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <NavItemDropdown favorite={item.favorite} pageId={item._id} name={item.name} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
