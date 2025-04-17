import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { usePagesContext } from "@/context/pages_context"
import { Image, Link, Loader2, Search } from "lucide-react"
import axios from "axios"

type ImagePickerPropTypes = {
  pageId: string
}

type Images = {
  name: string
  regular: string
  thumb: string
  alt_description: string
}

interface UnsplashImage {
  user: { name: string };
  urls: { thumb: string; regular: string }
  alt_description: string
}

const ImagePicker = ( {pageId}: ImagePickerPropTypes) => {

  const [isOpen, setIsOpen] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Images[]>([])
  const { updatePage } = usePagesContext()

  const handleUpdatePage = (cover: string) => {
    updatePage(pageId, { cover: cover})
  }

  const handleSearchImages = async (query: string) => {
    setLoading(true)
    try {
      const res = await axios.get<{ results: UnsplashImage[] }>(`https://api.unsplash.com/search/photos?query=${query}&per_page=18&client_id=ssUPaKXJex7z6S1mPtPSP9iRHDoewMPCq9jP4w7dc4s`)
      const data = res.data.results.map(image => ({
        name: image.user.name,
        thumb: image.urls.thumb,
        regular: image.urls.regular,
        alt_description: image.alt_description
      }))
      setImages(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger>
        <Button variant={"secondary"} size={"sm"} className={`opacity-50 hover:opacity-100 ${isOpen && 'opacity-100 hover:opacity-100'}`}>
          <Image />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-md max-w-md max-h-80 overflow-y-auto">
        <Tabs defaultValue="link" className="relative">
          <TabsList className="w-fit mb-2">
            <TabsTrigger value="link" className="hover:cursor-pointer">
              <Link />
              Link
            </TabsTrigger>
            <TabsTrigger value="unsplash" className="hover:cursor-pointer">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-unsplash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 11h5v4h6v-4h5v9h-16zm5 -7h6v4h-6z" /></svg>
              Unsplash
            </TabsTrigger>
          </TabsList>
          <Button onClick={() => handleUpdatePage('none')} variant={"secondary"} size={"sm"} className="border w-fit absolute right-0 top-0 text-xs">
            Eliminar
          </Button>
          <TabsContent value="link" className="space-y-4">
            <Input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} type="text" placeholder="Ingresa la URL de tu imágen" />
            <Button onClick={() => handleUpdatePage(linkValue)} variant={'default'} className="w-full">
              Guardar
            </Button>
            <p className="text-xs text-muted-foreground text-center">Funciona con cualquier imagen de la web</p>
          </TabsContent>
          <TabsContent value="unsplash" className="h-full">
            <div className="flex gap-2">
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar imágenes en Unsplash" />
              <Button onClick={() => handleSearchImages(searchQuery)} disabled={!searchQuery}>
                {
                  loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Search />
                  )
                }
              </Button>
            </div>
            <div className="mt-3 col-start-1 row-start-1 grid grid-cols-3 gap-4 text-sm font-bold text-white h-full">
              {
                images && (
                  <>
                    {
                      images.map((image) => (
                        <div onClick={() => handleUpdatePage(image.regular)} className="group">
                          <img src={image.thumb} alt={image.alt_description} className="rounded-lg aspect-video h-20 object-cover transition-all ease-in-out duration-300 hover:cursor-pointer hover:scale-105" />
                          <p className="text-xs text-muted-foreground font-normal">
                            {image.name}
                          </p>
                        </div>
                      ))
                    }
                  </>
                )
              }
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>

  )
}

export default ImagePicker