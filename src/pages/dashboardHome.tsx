import CardPage from "@/components/card-page"
import { useAuth } from "@/context/auth_context"
import { usePagesContext } from "@/context/pages_context"
import { useEffect, useState } from "react"

const DashboardHome = () => {
  const [greetingMessage, setGreetingMessage] = useState('')
  const { user } = useAuth()
  const { pages } = usePagesContext()

  useEffect(() => {
    const hours = new Date().getHours()

    if (hours >= 6 && hours < 12) {
      setGreetingMessage('Buenos días')
    } else if (hours >= 12 && hours < 18) {
      setGreetingMessage('Buenas tardes')
    } else {
      setGreetingMessage('Buenas noches')
    }
  
  }, [])
  
  const favoritePages = pages?.filter(page => page.favorite)
  const nonFavoritePages = pages?.filter(page => !page.favorite)

  return (
    <div className="p-1 max-w-2xl w-full self-center mt-6 space-y-20">
      <h1 className="text-4xl font-medium text-center">
        {greetingMessage}, {user?.name}
      </h1>
      {
        favoritePages?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Páginas Favoritas</h2>
            <ul className="flex flex-col sm:flex-row items-center gap-4 justify-between flex-wrap">
              {
                favoritePages?.map((item) => (
                  <CardPage key={item._id} item={item} />
                ))
              }
            </ul>
          </section>
        )
      }
      <section>
        <h2 className="text-2xl font-semibold mb-4">Otras Páginas</h2>
        <ul className="flex flex-col sm:flex-row items-center gap-4 justify-between flex-wrap">
          {
            nonFavoritePages?.length > 0 ? (
              nonFavoritePages?.map((item) => (
                <CardPage key={item._id} item={item} />
              ))) : (
                <div className="w-full flex items-center text-center text-balance text-muted-foreground max-w-80 h-40 group bg-muted/60 rounded-3xl">
                  No hay páginas disponibles, crea una nueva.
                </div>
              )
          }
        </ul>
      </section>
    </div>
  )
}

export default DashboardHome