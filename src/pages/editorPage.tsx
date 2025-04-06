import TiptapEditor from "@/components/editor"
import { NavActions } from "@/components/nav-actions"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePagesContext } from "@/context/pages_context"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import EmojiPickerPopover from "@/components/emoji-picker"
import ImagePicker from "@/components/image-picker"

const EditorPage = () => {
  const { name, id } = useParams()
  const { getPageById, loadingPage, pages } = usePagesContext()
  
  const page = pages.find(item => item._id === id) ?? { _id: "", name: "Página no encontrada", content: "", icon: "none", cover: "none", favorite: false };
  
  useEffect(() => {
    if (!id) return
    getPageById(id)
  }, [])
  
  if(!id) return

  return (
    <div className="flex flex-col gap-6 p-4 bg-white dark:bg-neutral-950 rounded-xl self-center w-full">
      <header className="flex h-14 shrink-0 items-center gap-2 -mt-15">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    <span className="flex items-center gap-2">
                      <span>
                        {page.icon && page.icon}
                      </span>
                    {name}
                    </span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions page={page} />
          </div>
        </header>
        {
            loadingPage === true ? (
              <div className="w-full">
                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex flex-col space-y-20">
                    {/* Skeleton */}
                    <div className="w-full h-60 rounded-3xl bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
        
                    <div className="flex flex-col gap-6">
                      {/* Title skeleton */}
                      <div className="w-3/4 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
        
                      {/* Text skeleton */}
                      <div className="w-full h-5 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full self-center">

                <div className="w-full rounded-3xl mb-20">
                  <div className="max-w-4xl mx-auto h-60 bg-neutral-800 rounded-3xl relative mb-20 group">
                    {
                    page?.cover !== 'none' && (
                      <img src={page?.cover} alt="Cover image" className="size-full object-cover object-center rounded-2xl" />
                    )
                  }
                    <div className="gap-2 sm:gap-4 absolute right-6 top-6 flex">
                      <EmojiPickerPopover trigger={<Button className={`opacity-50 hover:opacity-100`} variant="secondary" size="sm">Cambiar emoji</Button>} pageId={id} />
                      <ImagePicker pageId={id} />
                    </div>
                    <div className="flex items-center gap-2 absolute text-3xl sm:text-4xl font-medium bottom-8 left-4 sm:bottom-6 sm:left-10 bg-muted/40 rounded-xl p-1">
                      <span className="">
                        {
                          page?.icon !== 'none' && (
                            <EmojiPickerPopover 
                              trigger={
                                <Button variant={'ghost'} size={"lg"} className="size-14 text-4xl rounded-full">
                                  {page?.icon}
                                </Button>
                              } 
                              pageId={id} />
                          )
                        }
                      </span>
                      <h1 className="">
                        {page?.name}
                      </h1>
                    </div>
                  </div>
                </div>
                {
                  loadingPage ? (
                    <h1>
                      Cargando contenido
                    </h1>
                  ) : (
                    <TiptapEditor page={page} />
                  )
                }
              </div>
            )
          }
        
    </div>
  )
}

export default EditorPage