import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <section className="w-full h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white">
      <h1 className="text-5xl">
        Notion clon
      </h1>

      <div className="flex gap-4">
        <Link to={'/login'}>
          <Button variant={"ghost"}>
            Iniciar Sesión
          </Button>
        </Link>
        <Button>
          Registrarse
        </Button>
        <Button>
          Probar como invitado
        </Button>
      </div>
    </section>
  )
}

export default HomePage