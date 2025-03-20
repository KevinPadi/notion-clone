import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import { AuthProvider } from './context/auth_context'
import { ToastContainer } from 'react-toastify'
import { Flip } from 'react-toastify'
import DashboardPage from './pages/dashboardPage'
import ProtectedRoute from './components/protected-route'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
            {/* <Route path="/b" element={<ProtectedRoute />} /> */}

          {/* Ruta protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
            <Route path="/dashboardapp" element={<DashboardPage />} />
          
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
          />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
