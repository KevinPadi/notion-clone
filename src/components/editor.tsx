import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Page, usePagesContext } from '@/context/pages_context'
import { useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import EditorFloatingMenu from './editor-floating-menu'
import EditorBubbleMenu from './editor-bubble-menu'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

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
  Placeholder.configure({
    placeholder: 'Escribe algo …'
  }),
  CodeBlockLowlight.configure({
    lowlight,
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
      setEditorState(updatedContent)
    }
  })
  
  return (
    <div>
      <EditorContent editor={editor} />
      <EditorFloatingMenu editor={editor} />
      <EditorBubbleMenu editor={editor} />
    </div>
  )
}

export default TiptapEditor
