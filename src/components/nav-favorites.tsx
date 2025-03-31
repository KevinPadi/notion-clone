import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FileText } from "lucide-react"
import { usePagesContext } from "@/context/pages_context"
import NavItemDropdown from "./nav-item-dropdown"

export function NavFavorites() {
  const { pages } = usePagesContext()
  const favoritePages = pages.filter(item => item.favorite === true)

  return (
    <SidebarGroup className={`group-data-[collapsible=icon]:hidden ${favoritePages.length === 0 ? 'hidden' : 'block'}`}>
      <SidebarGroupLabel>Favoritos</SidebarGroupLabel>
      <SidebarMenu>
        {pages?.filter(item => item.favorite === true).map((item) => (
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
