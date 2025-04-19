import { FloatingMenu } from '@tiptap/react'
import { Button } from './ui/button'
import { Heading1, Heading2, List, ListOrdered, Quote, Minus, Heading3, Text, ListChecks } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Editor } from '@tiptap/react'

type EditorFloatingMenuProps = {
  editor: Editor | null
}

const EditorFloatingMenu = ({editor}: EditorFloatingMenuProps) => {
  return (
    <FloatingMenu className="space-x-2 bg-muted border p-1 rounded-lg shadow-lg" tippyOptions={{ duration: 100 }} editor={editor}>  
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size={'icon'}
                    className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('paragraph') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                  >
                    <Text className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p>Párrafo</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size={'icon'}
                    className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('heading', { level: 1 }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  >
                    <Heading1 className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p>Titulo 1</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size={'icon'}
                    className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('heading', { level: 2 }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  >
                    <Heading2 className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p>Titulo 2</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size={'icon'}
                    className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('heading', { level: 3 }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  >
                    <Heading3 className='size-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p>Titulo 3</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={'icon'}
                  className={`hover:dark:bg-neutral-700 size-8 ${editor?.isActive('bulletedList') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                >
                  <List className='size-5' />
                </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p> Lista </p>
                </TooltipContent>
              </Tooltip>
            
              <Tooltip>
                <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={'icon'}
                  className={`hover:dark:bg-neutral-700 size-8 ${editor?.isActive('orderedList') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered className='size-5' />
                </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p> Lista ordenada </p>
                </TooltipContent>
              </Tooltip>
            
              <Tooltip>
                <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={'icon'}
                  className={`hover:dark:bg-neutral-700 size-8 ${editor?.isActive('orderedList') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                  onClick={() => editor?.chain().focus().toggleTaskList().run()
                  }
                >
                  <ListChecks className='size-5' />
                </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p> Lista de tareas </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={'icon'}
                  className={`hover:dark:bg-neutral-700 size-8 ${editor?.isActive('blockquote') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                >
                  <Quote className='size-5' />
                </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p> Cita </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size={'icon'}
                  className={`hover:dark:bg-neutral-700 size-8 ${editor?.isActive('codeBlock') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
                  onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                >
                  <Minus className='size-5' />
                </Button>
                </TooltipTrigger>
                <TooltipContent className='bg'>
                  <p> Divisor </p>
                </TooltipContent>
              </Tooltip>          
            </TooltipProvider>
          </FloatingMenu>
  )
}

export default EditorFloatingMenu