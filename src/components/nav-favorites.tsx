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
import { formatRoute } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

export function NavFavorites() {
  const { pages } = usePagesContext()
  const favoritePages = pages.filter(item => item.favorite === true)
  const location = useLocation()

  return (
    <SidebarGroup className={`group-data-[collapsible=icon]:hidden ${favoritePages.length === 0 ? 'hidden' : 'block'}`}>
      <SidebarGroupLabel>Favoritos</SidebarGroupLabel>
      <SidebarMenu>
        {pages?.filter(item => item.favorite === true).map((item) => {
          const formattedRoute = formatRoute(item.name)

          return (
            <SidebarMenuItem key={item._id}>
              <SidebarMenuButton asChild>
                <Link to={`/dashboard/${formattedRoute}/${item._id}`} title={item.name} className={`text-muted-foreground ${decodeURIComponent(location.pathname) === `/dashboard/${formattedRoute}/${item._id}` ? 'bg-muted text-primary' : ''}`}>
                  <span>
                    {
                      item.icon !== 'none' ? item.icon : <FileText className="stroke-[1.5] size-5"/>
                    }
                  </span>
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <NavItemDropdown favorite={item.favorite} pageId={item._id} name={item.name} />
            </SidebarMenuItem>
          )
        })}
        
      </SidebarMenu>
    </SidebarGroup>
  )
}
