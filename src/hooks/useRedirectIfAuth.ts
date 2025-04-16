import { useAuth } from "@/context/auth_context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRedirectIfAuth () {

  const user = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      console.log(user)
      navigate('/dashboard/home');
    }
  }, []);
}