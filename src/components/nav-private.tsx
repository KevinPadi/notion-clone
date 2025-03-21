import {
  MoreHorizontal,
  StarOff,
} from "lucide-react"
import { DeleteIconHandle } from "./icons/delete-icon"
import { SquarePenIconHandle } from "./icons/square-pen"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DeleteIcon } from "./icons/delete-icon"
import { useRef } from "react"
import { SquarePenIcon } from "./icons/square-pen"

export function NavPrivate({
  pages,
}: {
  pages: {
    name: string
    url: string
    emoji: string
  }[]
}) {
  const { isMobile } = useSidebar()

  const deleteIconRef = useRef<DeleteIconHandle>(null)
  const penIconRef = useRef<SquarePenIconHandle>(null)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Páginas</SidebarGroupLabel>
      <SidebarMenu>
        {pages.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} title={item.name}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <StarOff className="text-muted-foreground" />
                  <span>Agregar a Favoritos</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onMouseEnter={() => penIconRef.current?.startAnimation()}
                  onMouseLeave={() => penIconRef.current?.stopAnimation()}
                >
                  <SquarePenIcon ref={penIconRef} className="p-0" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onMouseEnter={() => deleteIconRef.current?.startAnimation()}
                  onMouseLeave={() => deleteIconRef.current?.stopAnimation()}
                >
                  <DeleteIcon ref={deleteIconRef} className="p-0" />
                  <span>Borrar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
