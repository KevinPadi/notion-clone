import { useEditor, EditorContent, FloatingMenu, BubbleMenu, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Button } from './ui/button'
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote, Minus, Heading3, Text, Highlighter, UnderlineIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, ListChecks } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Page, usePagesContext } from '@/context/pages_context'
import { useState } from 'react'
import useDebounce from '@/hooks/useDebounce'

const extensions = [
  StarterKit,
  Highlight, 
  Underline, 
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TaskList,
    TaskItem.configure({
      nested: true,
    }),
]

const TiptapEditor = ({ page }: { page: Page }) => {

  const [editorState, setEditorState] = useState<JSONContent>(page.content || {
    "type": "doc",
    "content": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": null,
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "Esto es un heading"
                }
            ]
        }
    ]
})
  const { updatePage } = usePagesContext()

  
  const debouncedSavedContent = useDebounce((updatedContent: JSONContent) => {
    updatePage(page._id, { content: updatedContent })
    console.log(updatedContent)
  }, 1000)

  const editor = useEditor({
    extensions,
    content: editorState, 
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      }
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getJSON()
      debouncedSavedContent(editor.getJSON())
      console.log(updatedContent)
      setEditorState(updatedContent)
    }
  })
  
  return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu className="space-x-2 bg-muted w-3xl border p-1 rounded-lg shadow-lg" tippyOptions={{ duration: 100 }} editor={editor}>  
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
    </>
  )
}

export default TiptapEditor
