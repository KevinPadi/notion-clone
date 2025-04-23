import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound, LogIn, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/context/auth_context"
import { MenuIcon, MenuIconHandle } from "@/components/icons/menu"
import { useRef } from "react"
import { Separator } from "./ui/separator"

const Header = () => {
  const menuRef = useRef<MenuIconHandle>(null);
  const { user, loginAsGuest } = useAuth()

  return (
    <header className="w-full">
        <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center gap-8 bg-neutral-200 dark:bg-neutral-900 rounded-xl">
          <a className="block text-teal-600 dark:text-teal-300 pl-2" href="#">
            <span className="sr-only">Home</span>
            <img src="/notiony-logo.png" className="size-12 rounded-xl" alt="" />
          </a>

          <div className="flex items-center justify-end md:justify-between">

            <div className="flex items-center gap-4">
              {
                !user && (
                  <>
                    <div className="sm:flex sm:gap-4">
                      <div className="dark:divide-gray-700 hidden md:flex"> 
                        <Link to={'/login'}>
                          <Button className="text-black dark:text-white" variant={"ghost"}>
                            Iniciar Sesión
                          </Button>
                        </Link>
                        
                        <Separator orientation="vertical" className="h-6 mx-2 bg-muted" />

                        <Link to={'/register'}>
                          <Button className="text-black dark:text-white" variant={"ghost"}>
                            Registrarse
                          </Button>
                        </Link>
                      </div>
                      
                      <Button className="bg-emerald-400 hover:bg-emerald-400/80 text-black hidden md:block" onClick={() => loginAsGuest()}>
                        Prueba como invitado
                      </Button>
                    </div>

                    <DropdownMenu 
                    onOpenChange={(open) => {
                      if (open) menuRef.current?.startAnimation();
                        else menuRef.current?.stopAnimation();
                      }}
                    >
                      <DropdownMenuTrigger>
                        <MenuIcon ref={menuRef} className="block md:hidden" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="block md:hidden" align="end">
                        <DropdownMenuItem asChild>
                          <Link to={'/login'}>
                            <LogIn />
                            Iniciar sesión
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={'/register'}>
                            <UserPlus />
                            Registrarse
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => loginAsGuest()}>
                          <CircleUserRound />
                          Prueba como invitado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header