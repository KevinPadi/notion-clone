import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import GoogleIcon from "./icons/google-icon"
import { UserIcon } from "./icons/user-icon"
import { useRef, useState } from "react"
import { UserIconHandle } from "./icons/user-icon"
import { ArrowRightIcon } from "./icons/arrow-right-icon"
import { ArrowRightIconHandle } from "./icons/arrow-right-icon"
import { useForm } from "react-hook-form"
import { authSchema } from "@/schemas/auth_schema"
import { AuthSchema } from "@/schemas/auth_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/context/auth_context"
import { Eye, EyeClosed, Loader2 } from "lucide-react"
import { motion } from "motion/react"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const userIconRef = useRef<UserIconHandle>(null)
  const arrowIconRef = useRef<ArrowRightIconHandle>(null)

  const [isVisible, setIsVisible] = useState(false)

  const { login, handleGoogleLogin, loginAsGuest } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<AuthSchema, "name">>({
    resolver: zodResolver(authSchema.omit({ name: true })),
  })

  const onSubmit = async (data: Omit<AuthSchema, 'name'>) => {
    await login(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión en tu cuenta de Notiony
                </p>
              </div>
              <div className="grid gap-3 relative">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email.message}</p>}
              </div>
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <div className="relative">
                  <Input
                    type={isVisible ? "text" : "password"}
                    id="password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute inset-y-0 end-1 top-1 size-fit p-0.5 rounded-md hover:bg-neutral-100 hover:dark:bg-neutral-900 hover:cursor-pointer text-neutral-500"
                  >
                    <motion.div
                      key={isVisible ? "visible" : "hidden"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isVisible ? <Eye strokeWidth={1.5} /> : <EyeClosed strokeWidth={1.5} />}
                    </motion.div>
                  </button>

                </div>                
                {errors.password && <p className="text-red-500 text-xs absolute -bottom-5">{errors.password.message}</p>}
              </div>
              <Button
                type="submit" 
                className="w-full" 
                onMouseEnter={() => arrowIconRef.current?.startAnimation()}
                onMouseLeave={() => arrowIconRef.current?.stopAnimation()}
              >
                {
                  isSubmitting === true ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <>
                      Iniciar Sesión
                      <ArrowRightIcon ref={arrowIconRef} />
                    </>
                  )
                }
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-white dark:bg-neutral-900 text-muted-foreground relative z-10 px-2">
                  O continua con
                </span>
              </div>
              <div className="flex flex-col gap-4">

                <Button onClick={handleGoogleLogin} variant="outline" type="button" className="w-full">
                  <GoogleIcon />
                  <span className="">Inicia sesión con Google</span>
                </Button>

                <Button
                  onClick={() => loginAsGuest()}
                  variant="outline"
                  type="button" 
                  className="w-full"
                  onMouseEnter={() => userIconRef.current?.startAnimation()}
                  onMouseLeave={() => userIconRef.current?.stopAnimation()}
                >
                  <UserIcon ref={userIconRef} />
                  <span>Inicia sesión como invitado</span>
                </Button>

              </div>
              <div className="text-center text-sm">
                No tienes una cuenta?
                <Link to={'/register'} className="underline underline-offset-4 ps-1">
                  Registrate
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.25]"
            />
            <h2 className="absolute bottom-6 left-6 text-4xl">
              Notiony
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
