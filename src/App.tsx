import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage';

function App() {

    const handleLogin = () => {
      // Redirige al backend para la autenticación con Google
      window.location.href = 'http://localhost:3000/api/auth/google'
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
          {/* <Route path="/b" element={<ProtectedRoute />} /> */}
        {/* Ruta protegida */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/board" element={<BoardPage />} />
        </Route> */}
        
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      {/* <ToastContainer 
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
        /> */}
    </BrowserRouter>
  )
}

export default App
