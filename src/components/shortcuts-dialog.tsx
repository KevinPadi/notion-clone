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

// Datos de atajos de teclado
const shortcuts = [
  {
    section: "Barra lateral",
    commands: [
      {
        description: "Abrir/Cerrar barra lateral",
        keys: ["Ctrl S"],
      },
    ],
  },
  {
    section: "Editor",
    commands: [
      {
        description: "Copiar",
        keys: ["Ctrl C", "Cmd C"],
      },
      {
        description: "Cortar",
        keys: ["Ctrl X", "Cmd X"],
      },
      {
        description: "Pegar",
        keys: ["Ctrl V", "Cmd V"],
      },
      {
        description: "Pegar sin formato",
        keys: ["Ctrl Shift V", "Cmd Shift V"],
      },
      {
        description: "Deshacer",
        keys: ["Ctrl Z", "Cmd Z"],
      },
      {
        description: "Rehacer",
        keys: ["Ctrl Shift Z", "Cmd Shift Z"],
      },
      {
        description: "Agregar salto de línea",
        keys: ["Shift Enter"],
      },
    ],
  },
  {
    section: "Formato de texto",
    commands: [
      {
        description: "Negrita",
        keys: ["Ctrl B", "Cmd B"],
      },
      {
        description: "Cursiva",
        keys: ["Ctrl I", "Cmd I"],
      },
      {
        description: "Subrayado",
        keys: ["Ctrl U", "Cmd U"],
      },
      {
        description: "Tachado",
        keys: ["Ctrl Shift S", "Cmd Shift S"],
      },
      {
        description: "Resaltado",
        keys: ["Ctrl Shift H", "Cmd Shift H"],
      },
      {
        description: "Código",
        keys: ["Ctrl E", "Cmd E"],
      },
    ],
  },
  {
    section: "Formato de párrafo",
    commands: [
      {
        description: "Lista ordenada",
        keys: ["Ctrl Shift 7", "Cmd Shift 7"],
      },
      {
        description: "Lista con viñetas",
        keys: ["Ctrl Shift 8", "Cmd Shift 8"],
      },
      {
        description: "Lista de tareas",
        keys: ["Ctrl Shift 9", "Cmd Shift 9"],
      },
      {
        description: "Cita",
        keys: ["Ctrl Shift B", "Cmd Shift B"],
      },
      {
        description: "Alinear a la izquierda",
        keys: ["Ctrl Shift L", "Cmd Shift L"],
      },
      {
        description: "Alinear al centro",
        keys: ["Ctrl Shift E", "Cmd Shift E"],
      },
      {
        description: "Alinear a la derecha",
        keys: ["Ctrl Shift R", "Cmd Shift R"],
      },
      {
        description: "Justificar",
        keys: ["Ctrl Shift J", "Cmd Shift J"],
      },
      {
        description: "Bloque de código",
        keys: ["Ctrl Alt C", "Cmd Alt C"],
      },
    ],
  },
]

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
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
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

