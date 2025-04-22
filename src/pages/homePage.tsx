import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import { Separator } from "@/components/ui/separator"

const HomePage = () => {

  return (
    <section className="w-full max-w-4xl mb-10 mx-auto flex flex-col items-center gap-10 bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white">
      <Header />

      <div className="flex flex-col items-center gap-12 mt-10">
        <h1 className="text-3xl md:text-5xl font-medium text-clip bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          Editor de Texto estilo Notion
        </h1>

        <div className="flex gap-4">
          <Link to={'/login'}>
            <Button variant={"outline"}>
              Iniciar Sesión
            </Button>
          </Link>
          <Link to={'/register'}>
            <Button variant={"default"}>
              Registrarse
            </Button>
          </Link>
        </div>

        <img src="/public/hero-image.webp" alt="notion" className="w-full max-w-4xl rounded-xl border shadow-2xl mask-b-from-30% mask-b-to-100%" /> 
      </div>

      <Separator className="max-w-2xl my-20" />
      
      <div className="flex h-[500px] w-full items-center justify-center">
        <div className="grid h-full w-full gap-4  p-2 grid-cols-3 grid-rows-4 rounded-lg shadow-md">
        
          <div 
            className="col-span-2 row-span-2 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
          >
            1
          </div>
        
          <div 
            className="col-span-1 row-span-2 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
          >
            2
          </div>
        
          <div 
            className="col-span-1 row-span-2 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
          >
            3
          </div>
        
          <div 
            className="col-span-2 row-span-2 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
          >
            4
          </div>
        
        </div>
      </div>
      
    </section>
  )
}

export default HomePage