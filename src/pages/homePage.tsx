import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth_context"
import Footer from "@/components/Footer"

const HomePage = () => {

  const { user, loginAsGuest } = useAuth()

  return (
    <section className="w-full max-w-5xl mb-10 mx-auto flex flex-col items-center gap-10 dark:bg-neutral-950 text-black dark:text-white p-4">
      <Header />

      <div className="flex flex-col items-center gap-12 mt-10">
        <h1 className="text-3xl md:text-5xl font-medium text-primary text-center text-balance">
          Notiony: editor de texto estilo Notion, minimalista y funcional.
        </h1>

        <div className="flex gap-4">
          {
            user ? (
              <Link to={"/dashboard/home"}>
                <Button className="bg-emerald-400 hover:bg-emerald-400/80 text-black" size={"lg"}>
                  Ir a la aplicación
                </Button>
              </Link> 
            ) : ( 
              <>
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
              </>
            )

          }
        </div>

        <img src="/hero-light.webp" alt="notion" className="inline-block dark:hidden w-full rounded-xl border shadow-2xl mask-b-from-60%  mask-b-to-100%" />

        <img src="/hero-dark.webp" alt="notion" className="hidden dark:inline-block w-full rounded-xl border shadow-2xl dark:mask-b-from-60%  dark:mask-b-to-100%" /> 
      </div>

      <Separator className="max-w-2xl my-10 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="w-full px-4 mx-auto">
        <div className="grid w-full gap-4 p-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min rounded-lg">
          {/* Command Menu Card */}
          <div className="col-span-1 sm:col-span-2 bg-transparent border rounded-3xl flex flex-col text-center items-center p-4 relative overflow-hidden shadow-xl min-h-[250px] md:min-h-[300px]">
            <p className="text-lg text-balance text-muted-foreground font-medium z-10 mb-4">
              Cambia entre modo oscuro o claro
            </p>
            <div className="relative w-full h-[180px] md:h-[220px] mt-auto">
              <img
                src="/dark-light-mode.webp"
                alt="Command menu"
                className="object-contain rounded-xl mask-b-from-10% mask-b-to-50%"
              />
            </div>
          </div>

          {/* Dark/Light Mode Card */}
          <div className="col-span-1 bg-transparent border rounded-3xl flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-xl min-h-[250px] md:min-h-[300px]">
            <p className="text-lg text-balance text-muted-foreground font-medium z-10 mb-4">
              Busca tus páginas rápidamente con un atajo de teclado
            </p>
            <div className="relative w-full h-[180px] md:h-[220px] mt-auto">
              <img
                src="/command-light.webp"
                alt="Dark/Light mode toggle"
                className="border object-contain rounded-xl dark:mask-r-from-50% mask-r-to-120% dark:mask-b-from-40% mask-b-to-100% inline-block dark:hidden"
              />

              <img
                src="/command-dark.webp"
                alt="Dark/Light mode toggle"
                className="border object-contain rounded-xl dark:mask-r-from-50% mask-r-to-90% dark:mask-b-from-10% mask-b-to-90% dark:inline-block hidden"
              />
            </div>
          </div>

          {/* Tiptap Editor Card */}
          <div className="col-span-1 bg-transparent border rounded-3xl flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-xl min-h-[250px] md:min-h-[300px]">
            <p className="text-lg text-balance text-muted-foreground font-medium z-10 mb-4">
              Usa imágenes de Unsplash utilizando su API
            </p>
            <div className="relative w-full h-[180px] md:h-[220px] mt-auto">
              <img
                src="/unsplash-dialog-light.webp"
                alt="Tiptap editor"
                className="object-contain rounded-xl mask-b-from-40% mask-b-to-90% mask-l-from-70% mask-l-to-100% inline-block dark:hidden"
              />

              <img
                src="/unsplash-dialog.webp"
                alt="Tiptap editor"
                className="object-contain rounded-xl dark:mask-b-from-40% dark:mask-b-to-90% dark:mask-l-from-70% dark:mask-l-to-100% hidden dark:inline-block"
              />
            </div>
          </div>

          {/* Unsplash API Card */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-transparent border rounded-3xl flex flex-col items-start p-4 relative overflow-hidden shadow-xl min-h-[250px] md:min-h-[300px]">
            <p className="text-lg text-balance text-muted-foreground font-medium text-left z-10 mb-4">
              Editor WYSIWYG con Tiptap
            </p>
            <div className="relative w-full h-[180px] md:h-[220px] mt-auto">
              <img
                src="/tiptap-editor-image.webp"
                alt="Unsplash dialog"
                className="object-contain rounded-xl dark:mask-b-from-10% dark:mask-b-to-55% dark:invert-0 invert"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-60 bg-[url('/cta-background.webp')] bg-cover rounded-xl flex flex-col items-center justify-center gap-6">
        <p className="text-xl sm:text-2xl text-shadow-md text-balance text-white font-medium text-center">
          Prueba la aplicación como invitado y explora todas sus funcionalidades sin necesidad de registrarte.
        </p>
        <Button disabled={user !== null} onClick={ () => loginAsGuest() } className="border border-white/30 bg-emerald-600 shadow-lg shadow-emerald-500/50 hover:bg-emerald-500 text-white " size={"lg"}>
          Prueba como invitado
        </Button>
      </div>
      
      {/* footer */}

      <Footer />
    </section>
  )
}

export default HomePage