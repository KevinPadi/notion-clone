import { FloatingMenu } from '@tiptap/react'
import { Button } from './ui/button'
import { Heading1, Heading2, List, ListOrdered, Quote, Minus, Heading3, Text, ListChecks, Code2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Editor } from '@tiptap/react'

type EditorFloatingMenuProps = {
  editor: Editor | null
}

const menuItems = [
  {
    icon: Text,
    label: 'Párrafo',
    isActive: (e: Editor) => e.isActive('paragraph'),
    onClick: (e: Editor) => e.chain().focus().setParagraph().run(),
  },
  {
    icon: Heading1,
    label: 'Titulo 1',
    isActive: (e: Editor) => e.isActive('heading', { level: 1 }),
    onClick: (e: Editor) => e.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    icon: Heading2,
    label: 'Titulo 2',
    isActive: (e: Editor) => e.isActive('heading', { level: 2 }),
    onClick: (e: Editor) => e.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    icon: Heading3,
    label: 'Titulo 3',
    isActive: (e: Editor) => e.isActive('heading', { level: 3 }),
    onClick: (e: Editor) => e.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    icon: List,
    label: 'Lista',
    isActive: (e: Editor) => e.isActive('bulletedList'),
    onClick: (e: Editor) => e.chain().focus().toggleBulletList().run(),
  },
  {
    icon: ListOrdered,
    label: 'Lista ordenada',
    isActive: (e: Editor) => e.isActive('orderedList'),
    onClick: (e: Editor) => e.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: ListChecks,
    label: 'Lista de tareas',
    isActive: (e: Editor) => e.isActive('taskList'),
    onClick: (e: Editor) => e.chain().focus().toggleTaskList().run(),
  },
  {
    icon: Quote,
    label: 'Cita',
    isActive: (e: Editor) => e.isActive('blockquote'),
    onClick: (e: Editor) => e.chain().focus().toggleBlockquote().run(),
  },
  {
    icon: Code2,
    label: 'Bloque de código',
    isActive: (e: Editor) => e.isActive('codeBlock'),
    onClick: (e: Editor) => e.chain().focus().toggleCodeBlock().run(),
  },
  {
    icon: Minus,
    label: 'Divisor',
    isActive: () => false,
    onClick: (e: Editor) => e.chain().focus().setHorizontalRule().run(),
  },
]


const EditorFloatingMenu = ({editor}: EditorFloatingMenuProps) => {
  return (
    <FloatingMenu className="space-x-1 bg-muted/40 border p-1 rounded-xl shadow-lg" tippyOptions={{ duration: 100 }} editor={editor}>  
      <TooltipProvider>
        {menuItems.map(({ icon: Icon, label, isActive, onClick }, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className={`hover:bg-neutral-200 hover:dark:bg-neutral-800 size-8 rounded-lg ${
                  editor && isActive(editor)
                    ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                    : ''
                }`}
                onClick={() => editor && onClick(editor)}
              >
                <Icon className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </FloatingMenu>
  )
}

export default EditorFloatingMenu