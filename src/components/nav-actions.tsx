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
import 'dayjs/locale/es'
import { ShortcutsDialog } from "./shortcuts-dialog"
import { getRelativeTime } from "@/lib/utils"

type NavActionsPropsType = {
  page: Page
}


export function NavActions({ page }: NavActionsPropsType) {
  const { updatePage } = usePagesContext()
  const lastUpdated = getRelativeTime(page.updatedAt)
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        {lastUpdated}
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
