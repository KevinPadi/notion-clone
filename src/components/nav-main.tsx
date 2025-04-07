import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import { Link, useLocation } from "react-router-dom"
import { SquarePenIcon, SquarePenIconHandle } from "./icons/square-pen"
import { useRef, useState } from "react"
import { SearchIcon, SearchIconHandle } from "./icons/search-icon"
import { HomeIcon, HomeIconHandle } from "./icons/home-icon"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "./ui/button"
import { Check, X } from "lucide-react"
import { usePagesContext } from "@/context/pages_context"

export function NavMain() {
  const [isCreating, setIsCreating] = useState(false)
  const [pageName, setPageName] = useState("")
  const { createPage } = usePagesContext()
  const location = useLocation()

  const squarePenIconRef = useRef<SquarePenIconHandle>(null)
  const searchIconRef = useRef<SearchIconHandle>(null)
  const homeIconRef = useRef<HomeIconHandle>(null)

  const handleCreatePage = () => {
    if (!pageName.trim()) return
    createPage(pageName)
    setIsCreating(false);
    setPageName("");
  }

  return (
    <SidebarMenu className="space-y-1">

      <SidebarMenuItem>
        <AnimatePresence mode="wait">
          {isCreating ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 1 }}
              animate={{ opacity: 1, y: 1 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 w-full h-9"
            >
              <input
                className="border rounded grow px-2 w-8"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                autoFocus
              />
              {/* <button onClick={handleCreatePage} className="bg-green-500 text-white px-2 py-1 rounded">✔</button> */}
              <Button onClick={() => setIsCreating(false)} className="p-0 size-7">
                <X />
              </Button>
              <Button disabled={pageName.length === 0} onClick={handleCreatePage} className="p-0 size-7">
                <Check />
              </Button>
              {/* <button onClick={() => setIsCreating(false)} className="bg-red-500 text-white px-2 py-1 rounded">✖</button> */}
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 1 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarMenuButton
                className="hover:cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary active:text-primary-foreground active:scale-95 transition-all ease-in-out h-9"
                onClick={() => setIsCreating(true)}
                onMouseEnter={() => squarePenIconRef.current?.startAnimation()}
                onMouseLeave={() => squarePenIconRef.current?.stopAnimation()}
              >
                <SquarePenIcon ref={squarePenIconRef} className="p-0 hover:bg-transparent" size={20} />
                <span className="font-medium">Nueva página</span>
              </SidebarMenuButton>
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarMenuItem>

        {/* <SidebarMenuItem>
          <SidebarMenuButton
            className="hover:cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary active:text-primary-foreground active:scale-95 transition-all ease-in-out h-9"
            onMouseEnter={() => squarePenIconRef.current?.startAnimation()}
            onMouseLeave={() => squarePenIconRef.current?.stopAnimation()}
          >
            <SquarePenIcon className="p-0 hover:bg-transparent" size={20} ref={squarePenIconRef} />
            <span className="font-medium">Nueva página</span>

          </SidebarMenuButton>
        </SidebarMenuItem> */}
      
        <SidebarMenuItem>
          <SidebarMenuButton className="p-0 relative">
            <SearchIcon ref={searchIconRef} className="absolute -left-0.5 pointer-events-none" size={20} />
            <Input onFocus={() => searchIconRef.current?.startAnimation()} placeholder="Buscar" className="w-full border-0 ps-8 bg-transparent dark:bg-transparent" />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link 
              to="/dashboard/home" 
              className={`flex gap-1.5 items-center text-muted-foreground ${location.pathname === '/dashboard/home' && 'bg-muted text-primary'}`}
              // className="flex gap-1.5 items-center"
              onMouseEnter={() => homeIconRef.current?.startAnimation()}
              onMouseLeave={() => homeIconRef.current?.stopAnimation()}
            >
              <HomeIcon ref={homeIconRef} className="pointer-events-none p-0" size={18} />
              Home
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
