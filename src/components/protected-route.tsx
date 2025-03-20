import { Navigate, Outlet } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { useAuth } from "@/context/auth_context"

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin size-10" />
      </div>
    )
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute