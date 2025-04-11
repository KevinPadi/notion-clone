import { Clock, FileText } from "lucide-react"
import { Page } from "@/context/pages_context"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatRoute } from "@/lib/utils"

type CardPagePropsType = {
  item: Page
}

const CardPage = ({item}: CardPagePropsType) => {
  const formattedRoute = formatRoute(item.name)

  dayjs.extend(relativeTime) 
  dayjs.locale('es')
  
  const lastUpdated = dayjs(item.updatedAt)

  return (
    <li key={item._id} className="w-full flex flex-col max-w-80 group hover:cursor-pointer">
      <article className="w-full border border-transparent group-hover:border-muted-foreground/70 h-64 transition-all ease-in-out bg-muted rounded-3xl relative p-1.5 flex flex-col">
      <Link className="inset-0 absolute z-10" to={`/dashboard/${formattedRoute}/${item._id}`} />
      <div className="w-full h-36 relative">
        {
        item.cover !== 'none' ? (
          <img src={item.cover} alt="Cover image" className="size-full object-cover object-center rounded-2xl" />
        ) : (
          <div className="bg-muted-foreground/20 size-full p-10 rounded-2xl" ></div>
        )
        }
        <span className="absolute left-4 -translate-y-1/2 text-3xl">
        {
          item.icon !== 'none' ? item.icon : <FileText className="text-muted-foreground stroke-[1.5] size-10"/>
        }
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 justify-end px-4 p-2">
        <h2 className="text-lg truncate">
        {item.name}
        </h2>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3 translate-y-px" />
          {lastUpdated.fromNow()}
        </p>
      </div>
      </article>
    </li>
  )
}

export default CardPage