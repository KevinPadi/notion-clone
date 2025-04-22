import { useEffect, useState } from "react"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "./ui/command"
import { useTheme } from "./theme-provider"
import { usePagesContext } from "@/context/pages_context"
import { useNavigate } from "react-router-dom"
import { ArrowDown, ArrowUp, CornerDownLeft, File, House, Monitor, Moon, SearchIcon, Send, Sun, UserRound } from "lucide-react"
import { formatRoute, getRelativeTime } from "@/lib/utils"

const commandDialogItems = {
  suggestion: [
    {
      name: 'Inicio',
      icon: House,
      navigate: '/dashboard/home'
      
    },
    {
      name: 'Cuenta',
      icon: UserRound,
      navigate: '/dashboard/account'
    },
  ]
}

const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  const { pages } = usePagesContext()
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
 
  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm text-muted-foreground size-full flex items-center justify-between px-2 hover:cursor-pointer">
        <span className="flex items-center gap-2">
          <SearchIcon className="" size={18} />
          Buscar páginas
        </span>
        <kbd className="pointer-events-none inline-flex  select-none items-center gap-1 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl</span>J
        </kbd>  
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Busca páginas o accesos rápidos" />
        <CommandList className="h-80">
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            {
              commandDialogItems.suggestion.map((item) => (
                <CommandItem className="group" onSelect={() => { navigate(item.navigate); setOpen(false) }} key={item.name}>
                  {item.icon && <item.icon className="" />}
                  <span>{item.name}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100">
                    <CornerDownLeft className="h-4 w-4" />
                  </span>
                </CommandItem>
              ))
            }
            <CommandItem key={'feedback'} className="relative group">
              <a className="inset-0 absolute top-0" href="https://github.com/kevinpadi/notion-clone/issues/new?title=Feedback&body=Escribe+tu+comentario+aquí" target="_blank" rel="noopener noreferrer" />
              <Send/>
              <span> Feedback </span>
              <span className="ml-auto opacity-0 group-hover:opacity-100">
                <CornerDownLeft className="h-4 w-4" />
              </span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Páginas">
            {pages.map((page) => {
              const formattedRoute = formatRoute(page.name)
              const lastUpdated = getRelativeTime(page.updatedAt)

              return (
                <CommandItem className="flex justify-between border border-transparent" key={page._id} onSelect={() => { navigate(`/dashboard/${formattedRoute}/${page._id}`); setOpen(false) }}>
                  <div className="flex items-center gap-2">
                    {page.icon !== 'none' 
                      ? (
                        <span>
                          {page.icon}
                        </span>
                      )
                      : (
                        <File />
                      )
                    }
                    <span>{page.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {
                      lastUpdated
                    }
                  </span>
                </CommandItem>
              )})
            }
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tema" className="mb-10">
            <CommandItem onSelect={() => setTheme('light')}>
              <Sun />
              <span>Claro</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme('dark')}>
              <Moon />
              <span>Oscuro</span>
            </CommandItem>
            <CommandItem onSelect={() => setTheme('system')}>
              <Monitor />
              <span>Sistema</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator />

        {/* Footer */}
        <div className="flex gap-4 h-10 w-full items-center absolute bg-neutral-50 dark:bg-neutral-900 bottom-0 p-2 border-t select-none text-sm">
          <div className="flex items-center gap-2">
            <ArrowUp className="size-6 bg-muted p-1 rounded" />
            <ArrowDown className="size-6 bg-muted p-1 rounded" />
              <span className="leading-none -translate-y-px">para navegar</span>
          </div>

          <div className="flex items-center gap-2">
            <CornerDownLeft className="size-6 bg-muted p-1 rounded leading-none" />
            <span className="leading-none -translate-y-px">
              para seleccionar
            </span>
          </div>
        </div>
       
      </CommandDialog>
    </>
  )
}

export default CommandMenu