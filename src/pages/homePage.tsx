import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth_context"
import { Link } from "react-router-dom"
import Header from "@/components/Header"

const HomePage = () => {

  const { loginAsGuest } = useAuth()

  return (
    <section className="w-full h-screen bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white">
      <Header />
      <h1 className="text-5xl">
        Notion clon
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
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
        <Button onClick={() => loginAsGuest()}>
          Iniciar sesión como invitado
        </Button>
      </div>
    </section>
  )
}

export default HomePage