import { MoreVerticalIcon, UserCircleIcon, Moon, Sun, Monitor } from "lucide-react"
import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar"
import { useAuth } from "../context/auth_context"
import { LogoutIcon } from "./icons/logout-icon"
import type { LogoutIconHandle } from "./icons/logout-icon"
import { useTheme } from "./theme-provider"
import { Link } from "react-router-dom"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const logoutIconRef = useRef<LogoutIconHandle>(null)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Link to={'/dashboardapp/account'} className="flex w-full gap-2">
                  <UserCircleIcon className="size-5" />
                  Cuenta
                </Link>
              </DropdownMenuItem>

              {/* Theme Switcher */}
              <DropdownMenuItem className="hover:bg-transparent dark:hover:bg-transparent hover:cursor-auto">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">Tema</span>
                  <div className="flex items-center gap-1 rounded-full border p-1">
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-1 rounded-full hover:bg-muted ${theme === "system" && 'bg-muted'}`}
                      title="System"
                    >
                      <Monitor className="h-4 w-4" />
                      <span className="sr-only">Sistema</span>
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-1 rounded-full hover:bg-muted ${theme === "light" && 'bg-muted'}`}
                      title="Light"
                    >
                      <Sun className="h-4 w-4" />
                      <span className="sr-only">Claro</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-1 rounded-full hover:bg-muted ${theme === "dark" && 'bg-muted'}`}
                      title="Dark"
                    >
                      <Moon className="h-4 w-4" />
                      <span className="sr-only">Oscuro</span>
                    </button>
                  </div>
                </div>
              </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onMouseEnter={() => logoutIconRef.current?.startAnimation()}
              onMouseLeave={() => logoutIconRef.current?.stopAnimation()}
            >
              <LogoutIcon ref={logoutIconRef} className="mr-2 p-0" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

