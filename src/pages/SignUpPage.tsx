import { RegisterForm } from "@/components/register-form"
import { useRedirectIfAuth } from "@/hooks/useRedirectIfAuth"

const SignUpPage = () => {
  useRedirectIfAuth()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center dark:bg-neutral-900 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  )
}

export default SignUpPage