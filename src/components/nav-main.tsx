import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import { Link } from "react-router-dom"
import { SquarePenIcon, SquarePenIconHandle } from "./icons/square-pen"
import { useRef } from "react"
import { SearchIcon, SearchIconHandle } from "./icons/search-icon"
import { HomeIcon, HomeIconHandle } from "./icons/home-icon"

export function NavMain() {

  const squarePenIconRef = useRef<SquarePenIconHandle>(null)
  const searchIconRef = useRef<SearchIconHandle>(null)
  const homeIconRef = useRef<HomeIconHandle>(null)

  return (
    <SidebarMenu className="space-y-1">

        <SidebarMenuItem>
          <SidebarMenuButton
            className="hover:cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary active:text-primary-foreground active:scale-95 transition-all ease-in-out h-9"
            onMouseEnter={() => squarePenIconRef.current?.startAnimation()}
            onMouseLeave={() => squarePenIconRef.current?.stopAnimation()}
          >
            <SquarePenIcon className="p-0 hover:bg-transparent" size={20} ref={squarePenIconRef} />
            <span className="font-medium">Nueva página</span>

          </SidebarMenuButton>
        </SidebarMenuItem>
      
        <SidebarMenuItem>
          <SidebarMenuButton className="p-0 relative">
            <SearchIcon ref={searchIconRef} className="absolute -left-0.5 pointer-events-none" size={20} />
            <Input onFocus={() => searchIconRef.current?.startAnimation()} placeholder="Buscar" className="w-full border-0 ps-8 bg-transparent dark:bg-transparent" />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link 
              to="/dashboard/home" 
              className="flex gap-1.5 items-center"
              onMouseEnter={() => homeIconRef.current?.startAnimation()}
              onMouseLeave={() => homeIconRef.current?.stopAnimation()}
            >
              <HomeIcon ref={homeIconRef} className="pointer-events-none p-0" size={18} />
              Home
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
