import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Routes, Route, Navigate } from "react-router-dom"
import DashboardHome from "./dashboardHome"
import DashboardAccount from "./dashboardAccount"
import EditorPage from "./editorPage"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="fixed top-3 ml-2" asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="flex gap-2 items-center font-medium">
                Abrir/Cerrar Sidebar
                <kbd className="flex h-fit w-fit items-center justify-center rounded border bg-muted-foreground p-px text-xs font-medium"
>
                  Ctrl
                </kbd>
                <kbd className="flex h-fit w-fit items-center justify-center rounded border bg-muted-foreground p-px text-xs font-medium"
>
                  S
                </kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/account" element={<DashboardAccount />} />
            <Route path="/:name/:id" element={<EditorPage />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
