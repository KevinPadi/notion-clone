import { BubbleMenu, Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Strikethrough, Code, Highlighter, UnderlineIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type EditorBubbleMenuProps = {
  editor: Editor | null
}

const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  return (
    <BubbleMenu className="bg-muted rounded-lg border shadow-lg p-1 space-x-2" tippyOptions={{ duration: 100 }} editor={editor}>
        <TooltipProvider>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size={'icon'}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('bold') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <Bold className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Negrita </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              variant='ghost'
              size={'icon'}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('italic') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}        >
              <Italic className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Italica </p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              variant='ghost'
              size={'icon'}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('underline') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}        >
              <UnderlineIcon className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Subrayado </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              variant='ghost'
              size={'icon'}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('strike') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}        >
              <Strikethrough className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Tachado </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              onClick={() => editor?.chain().focus().toggleCode().run()}
              variant='ghost'
              size={'icon'}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('code') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}        >
              <Code className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Marcar como código </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('highlight') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <Highlighter className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Resaltar </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive('highlight') ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <Highlighter className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Resaltar </p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive({ textAlign: 'left' }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <AlignLeft className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Alinear a la izquierda </p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive({ textAlign: 'center' }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <AlignCenter className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Alinear al centro </p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive({ textAlign: 'right' }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <AlignRight className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Alinear a la derecha </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
              className={`hover:bg-neutral-200 hover:dark:bg-neutral-700 size-8 ${editor?.isActive({ textAlign: 'justify' }) ? 'is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400' : ''}`}
              >
              <AlignJustify className='size-5' />
            </Button>
            </TooltipTrigger>
            <TooltipContent className='bg'>
              <p> Justificar texto </p>
            </TooltipContent>
          </Tooltip>
          
        </TooltipProvider>
        
      </BubbleMenu>
  )
}

export default EditorBubbleMenu