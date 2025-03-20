import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface User {
  _id: string,
  name: string,
  email: string,
  avatar: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: Omit<AuthData, 'name'>) => Promise<void>
  loginAsGuest: () => Promise<void>
  handleGoogleLogin: () => void
  register: (data: AuthData) => Promise<void>
  logout: () => Promise<void>
  deleteUser: () => Promise<void>
}

interface AuthData {
  name:string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuth = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BACKEND_URL}/api/protected`, { withCredentials: true })
      setUser(res.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: Omit<AuthData, 'name'>) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/login`, data, { withCredentials: true })
      await checkAuth()
      navigate('/dashboard')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error desconocido';
      toast.error(`Error: ${errorMessage}`);
    }
  }

  const loginAsGuest = async () => {
    const response = await fetch(`${BACKEND_URL}/api/auth/loginGuest`, { method: 'POST', credentials: 'include' })
    const data = await response.json()

    if (response.ok) {
      setUser(data.user)
      checkAuth()
      toast.info('Iniciaste sesión como invitado. Esta cuenta se eliminará en 1 hora', {
        autoClose: 5000,
        pauseOnHover: true,
        })
      navigate('/dashboard')

      // delete cookie after 1 hour
      setTimeout(async () => {
        await fetch(`${BACKEND_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' })
        setUser(null)
        toast.error('La cuenta de invitado expiró. Porfavor inicia sesión de nuevo.', {
          autoClose: 5000,
          pauseOnHover: true,
          })
        navigate('/')
      }, 60 * 60 * 1000)
    }
  }

  const register = async (data: AuthData) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, data, { withCredentials: true })
      await checkAuth()
      navigate('/dashboard')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error desconocido';
      toast.error(`Error: ${errorMessage}`);
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true })
      setUser(null)
      navigate('/')
    } catch (error: any) {
      toast.error("Error al cerrar sesión");
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/auth/delete`, { withCredentials: true })
      setUser(null)
      toast.success("Cuenta eliminada exitosamente")
      navigate('/register')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error al eliminar la cuenta"
      toast.error(errorMessage)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`
  };
  

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteUser, loginAsGuest, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  )
}