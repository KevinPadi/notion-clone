import { FileText } from "lucide-react"
import { Page } from "@/context/pages_context"
import { Link } from "react-router-dom"

type CardPagePropsType = {
  item: Page
}

const CardPage = ({item}: CardPagePropsType) => {
  const formattedRoute = item.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <li key={item._id} className="w-full max-w-80 group hover:cursor-pointer">
      <article className="w-full border border-transparent group-hover:border-muted-foreground/70 h-60 transition-all ease-in-out bg-neutral-200 dark:bg-neutral-900 rounded-3xl overflow-hidden relative">
        <Link className="inset-0 absolute z-10" to={`/dashboard/${formattedRoute}/${item._id}`} />
        <div className="w-full h-36 relative p-1.5">
          {
            item.cover !== 'none' ? (
              <img src={item.cover} alt="Cover image" className="size-full object-cover object-center rounded-2xl" />
            ) : (
              <div className="bg-muted size-full p-10 rounded-2xl" ></div>
            )
          }
          <span className="absolute left-8 -bottom-3">
            {
              item.icon !== 'none' ? item.icon : <FileText className="text-muted-foreground stroke-[1.5] size-10"/>
            }
          </span>
        </div>
        <h2 className="text-lg mt-8 ms-9">
          {item.name}
        </h2>
      </article>
    </li>
  )
}

export default CardPage