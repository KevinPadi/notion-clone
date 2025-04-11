import { useState, useRef } from "react"
import { Info } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import shortcuts from "@/data/shortcuts.json"

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(shortcuts[0].section)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (section: string) => {
    setSelectedSection(section)
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="size-7" variant="ghost" size="sm">
                <Info />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Abrir lista de comandos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="p-0 gap-0 max-w-[95vw] sm:max-w-3xl">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 sm:pb-4">
          <DialogTitle>Atajos de teclado</DialogTitle>
          <DialogDescription className="hidden sm:block">
            Lista de atajos de teclado para ayudarte a navegar por la aplicación.
          </DialogDescription>
        </DialogHeader>

        {/* Selector de sección móvil (visible en pantallas pequeñas) */}
        <div className="sm:hidden px-4 py-2">
          <Select onValueChange={scrollToSection} defaultValue={selectedSection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una sección" />
            </SelectTrigger>
            <SelectContent>
              {shortcuts.map((section) => (
                <SelectItem key={section.section} value={section.section}>
                  {section.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row h-[60vh] sm:h-[70vh]">
          {/* Barra lateral (oculta en móvil) */}
          <div className="hidden sm:block w-48 border-r shrink-0">
            <div className="p-4 space-y-1 sticky top-0">
              {shortcuts.map((section) => (
                <button
                  key={section.section}
                  onClick={() => scrollToSection(section.section)}
                  className="w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted"
                >
                  {section.section}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6" ref={contentRef}>
            {shortcuts.map((section, index) => (
              <div
                key={section.section}
                className="py-4"
                ref={(el) => {
                  sectionRefs.current[section.section] = el;
                }}
                id={section.section}
                data-section={section.section}
              >
                <h3 className="mb-4 text-lg font-medium">{section.section}</h3>
                <div className="space-y-3">
                  {section.commands.map((command) => (
                    <div
                      key={command.description}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                    >
                      <span className="text-sm font-medium">{command.description}</span>
                      <div className="flex flex-wrap gap-2">
                        {command.keys.map((key) => (
                          <kbd
                            key={key}
                            className="flex h-6 items-center justify-center rounded border bg-muted px-2 text-xs font-medium"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {index < shortcuts.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

