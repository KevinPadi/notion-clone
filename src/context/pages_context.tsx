import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

// TODO: / navegar hacia la página al crearla / 

export interface Page {
  _id: string
  name: string
  icon: string
  content: string
  favorite: boolean
  cover: string
}

interface PagesContextType {
  pages: Page[]
  getPages: () => Promise<void>
  createPage: (pageName: string) => Promise<void>
  deletePage: (pageId: string) => Promise<void>
  updatePage: (pageId: string, updatedData: Partial<Page>) => Promise<void>
  // clearTasks: () => void
}

const PagesContext = createContext<PagesContextType | undefined>(undefined)

export const usePagesContext = () => {
  const context = useContext(PagesContext)
  if (!context) throw new Error("usePagesContext must be used within PageProvider")
  return context
}

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // 🟢GET: Obtener todas las páginas
  const getPages = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/pages/getAll`, { withCredentials: true })
      console.log(data)
      setPages(data)
    } catch (error) {
      console.error("Hubo un error al obtener las páginas:", error)
    }
  }

  // 🟠POST: Crear una nueva página
  const createPage = async (name: string) => {
    console.log(name)
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/pages/create`, {name: name}, { withCredentials: true })
      setPages((prev) => [...prev, data])
      console.log(data)
    } catch (error) {
      console.error("Error creating page:", error)
    }
  }

  // 🔴DELETE: Eliminar una página
  const deletePage = async (pageId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/pages/delete/${pageId}`, { withCredentials: true })
      setPages((prev) => prev.filter((page) => page._id !== pageId))
      toast.success("Tarea eliminada correctamente")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Algo salió mal...")
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Ocurrió un error desconocido")
      }
    }
  }

  // // 🟡PATCH: Actualizar una tarea
  const updatePage = async (pageId: string, updatedData: Partial<Page>) => {
    try {      
      const { data } = await axios.put(`${BACKEND_URL}/api/pages/edit/${pageId}`, updatedData, { withCredentials: true })
      setPages((prev) => prev.map((page) => (page._id === pageId ? data : page)))
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Algo salió mal...")
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Ocurrió un error desconocido")
      }
    }
  }

  // const clearTasks = () => {
  //   setTasks([])
  // }

  useEffect(() => {
    getPages()
  }, [])

  return (
    <PagesContext.Provider value={{ pages, getPages, createPage, deletePage, updatePage }}>
      {children}
    </PagesContext.Provider>
  )
}