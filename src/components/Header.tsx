import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Box, Menu, CircleUserRound, LogIn, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/context/auth_context"
import {  } from "lucide-react"
const Header = () => {

  const { loginAsGuest } = useAuth()
  
  return (
    <header className="p-4">
        <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 bg-neutral-900 rounded-xl">
          <a className="block text-teal-600 dark:text-teal-300" href="#">
            <span className="sr-only">Home</span>
            <Box className="size-10" />
          </a>

          <div className="flex items-center justify-end md:justify-between">

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <div className="divide-x divide-gray-200 dark:divide-gray-700 hidden md:flex"> 
                  <Link to={'/login'}>
                    <Button variant={"ghost"}>
                      Iniciar Sesión
                    </Button>
                  </Link>
                  
                  <Link to={'/register'}>
                    <Button variant={"ghost"}>
                      Registrarse
                    </Button>
                  </Link>
                </div>
                
                <Button className="bg-emerald-400 hover:bg-emerald-400/80 hidden md:block" onClick={() => loginAsGuest()}>
                  Prueba como invitado
                </Button>
              </div>

              {/* mobile menu */}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu className="block md:hidden" />
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

            </div>
          </div>
        </div>
      </header>
  )
}

export default Header