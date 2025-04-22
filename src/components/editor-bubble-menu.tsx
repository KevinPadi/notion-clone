import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Highlighter,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EditorBubbleMenuProps = {
  editor: Editor | null;
};

const actions = [
  {
    icon: Bold,
    tooltip: "Negrita",
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
  },
  {
    icon: Italic,
    tooltip: "Italica",
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
  },
  {
    icon: UnderlineIcon,
    tooltip: "Subrayado",
    action: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor: Editor) => editor.isActive("underline"),
  },
  {
    icon: Strikethrough,
    tooltip: "Tachado",
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive("strike"),
  },
  {
    icon: Code,
    tooltip: "Marcar como código",
    action: (editor: Editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor: Editor) => editor.isActive("code"),
  },
  {
    icon: Highlighter,
    tooltip: "Resaltar",
    action: (editor: Editor) => editor.chain().focus().toggleHighlight().run(),
    isActive: (editor: Editor) => editor.isActive("highlight"),
  },
  {
    icon: AlignLeft,
    tooltip: "Alinear a la izquierda",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor: Editor) =>
      editor.isActive({ textAlign: "left" }),
  },
  {
    icon: AlignCenter,
    tooltip: "Alinear al centro",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor: Editor) =>
      editor.isActive({ textAlign: "center" }),
  },
  {
    icon: AlignRight,
    tooltip: "Alinear a la derecha",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor: Editor) =>
      editor.isActive({ textAlign: "right" }),
  },
  {
    icon: AlignJustify,
    tooltip: "Justificar texto",
    action: (editor: Editor) =>
      editor.chain().focus().setTextAlign("justify").run(),
    isActive: (editor: Editor) =>
      editor.isActive({ textAlign: "justify" }),
  },
];

const EditorBubbleMenu = ({ editor }: EditorBubbleMenuProps) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border shadow-lg p-1 max-w-[1000px] space-x-2"
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <TooltipProvider>
        {actions.map(({ icon: Icon, tooltip, action, isActive }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => action(editor)}
                className={`hover:bg-neutral-200 hover:dark:bg-neutral-800 size-8 ${
                  isActive(editor)
                    ? "is-active text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : ""
                }`}
              >
                <Icon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </BubbleMenu>
  );
};

export default EditorBubbleMenu;
