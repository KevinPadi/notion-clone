import CardPage from "@/components/card-page"
import { useAuth } from "@/context/auth_context"
import { usePagesContext } from "@/context/pages_context"
import { FileText } from "lucide-react"
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
  
  return (
    <div className="p-1 max-w-2xl w-full self-center mt-6 space-y-20">
      <h1 className="text-4xl font-medium text-center">
        {greetingMessage}, {user?.name}
      </h1>
      <section>
        <ul className="flex flex-col sm:flex-row items-center gap-4 justify-between flex-wrap">
          {
            pages?.map((item) => (
              <CardPage item={item} />
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export default DashboardHome