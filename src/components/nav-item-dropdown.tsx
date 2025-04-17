import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {   
  MoreHorizontal,
  StarOff,
  Star, 
  Loader2
} from "lucide-react"
import { SidebarMenuAction, useSidebar } from "./ui/sidebar"
import { DeleteIcon, DeleteIconHandle } from "./icons/delete-icon"
import { SquarePenIcon, SquarePenIconHandle} from "./icons/square-pen"
import { useRef, useState } from "react"
import { usePagesContext } from "@/context/pages_context"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"

type NavItemDropdownTypeProps = {
  favorite: boolean
  pageId: string
  name: string
}

const NavItemDropdown = ({favorite, pageId, name}: NavItemDropdownTypeProps ) => {

  const { deletePage, updatePage } = usePagesContext()
  const { isMobile } = useSidebar()
  const [inputValue, setInputValue] = useState(name)
  const [ openDialog, setOpenDialog ] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deleteIconRef = useRef<DeleteIconHandle>(null)
  const penIconRef = useRef<SquarePenIconHandle>(null)

  const handleUpdateNamePage = async (name: string) => {
    setIsSubmitting(true)
    await updatePage(pageId, { name })
    toast.success("Nombre actualizado correctamente")
    setOpenDialog(false)
    setIsSubmitting(false)
  }

  const handleUpdateFavorite = () => {
    if (favorite) {
      updatePage(pageId, { favorite: false})
    } else {
      updatePage(pageId, { favorite: true})
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction className="hover:cursor-pointer" showOnHover>
          <MoreHorizontal />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuItem onClick={() => handleUpdateFavorite()}>
          {
            favorite ? (
              <StarOff className="text-muted-foreground" />
            ) : (
              <Star className="text-muted-foreground" />
            )
          }
          <span>
          {
            favorite ? (
              'Eliminar de favoritos'
            ) : (
              'Agregar a favoritos'
            )
          }
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
          <DropdownMenu>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={() => setOpenDialog(true)}
                className="flex justify-start p-2 rounded-sm font-normal"
                onMouseEnter={() => penIconRef.current?.startAnimation()}
                onMouseLeave={() => penIconRef.current?.stopAnimation()}
                >
                <SquarePenIcon ref={penIconRef} className="p-0 text-muted-foreground" />
                <span>Cambiar nombre</span>
              </DropdownMenuItem>
              </DialogTrigger>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Renombra la página</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id  ="name"
                  className="col-span-3"
                  placeholder={name}
                  minLength={1}
                  maxLength={64}
                />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => setOpenDialog(false)} variant={'outline'} size={'sm'}> Cancelar </Button>
              </DialogClose>
              <Button onClick={() => handleUpdateNamePage(inputValue)} size={'sm'} disabled={isSubmitting || inputValue.length < 1}> 
                {
                  isSubmitting === true && (
                    <Loader2 className="animate-spin size-5" />
                  )
                }
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => deletePage(pageId)}
          className="focus:bg-destructive/10 dark:hover:bg-destructive/10"
          onMouseEnter={() => deleteIconRef.current?.startAnimation()}
          onMouseLeave={() => deleteIconRef.current?.stopAnimation()}
        >
          <DeleteIcon ref={deleteIconRef} className="p-0" />
          <span className="text-destructive dark:text-destructive">Borrar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavItemDropdown