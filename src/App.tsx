import { Button } from "./components/ui/button";

function App() {

    const handleLogin = () => {
      // Redirige al backend para la autenticación con Google
      window.location.href = 'http://localhost:3000/api/auth/google'
    };

  return (
    <>
      <h1>
        Notion Clone
      </h1>

      <Button onClick={handleLogin}>Login with Google</Button>
    </>
  )
}

export default App
