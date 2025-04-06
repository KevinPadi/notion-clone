import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Star,
  StarOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Page, usePagesContext } from "@/context/pages_context"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'
import { ShortcutsDialog } from "./shortcuts-dialog"

type NavActionsPropsType = {
  page: Page
}


export function NavActions({ page }: NavActionsPropsType) {
  dayjs.extend(relativeTime) 
  dayjs.locale('es')

  const { updatePage } = usePagesContext()
  const lastUpdated = dayjs(page.updatedAt)
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        {lastUpdated.fromNow()}
      </div>
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => updatePage(page._id, { favorite: !page.favorite})} variant="ghost" size="icon" className="h-7 w-7">
            {
              page.favorite ? (
                <StarOff />
              ) : (
                <Star />
              )
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {
              page.favorite ? "Eliminar de favoritos" : "Agregar a favoritos"
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <ShortcutsDialog />
    </div>
  )
}
