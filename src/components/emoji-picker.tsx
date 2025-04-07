import { Button } from "@/components/ui/button"
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
} from "@/components/ui/emoji-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePagesContext } from "@/context/pages_context"
import { Trash2 } from "lucide-react"
import { ReactNode, useState } from "react"

type EmojiPickerPopoverPropsType = {
  pageId: string
  trigger: ReactNode
}

export default function EmojiPickerPopover ({ pageId, trigger }: EmojiPickerPopoverPropsType) {
  const [isOpen, setIsOpen] = useState(false)
  const { updatePage } = usePagesContext()

  const handleUpdateEmoji = (emoji: string) => {
    updatePage(pageId, { icon: emoji })
    setIsOpen(false)
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 relative overflow-hidden">
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => handleUpdateEmoji(emoji)}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
        <div className="w-full h-10 bg-transparent">
          <Button onClick={() => handleUpdateEmoji('none')} variant={"ghost"} className="text-sm size-full rounded-none" size={"sm"}>
            <Trash2 className="size-4" />
            Eliminar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}