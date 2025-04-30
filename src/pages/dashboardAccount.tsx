import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserIcon } from "@/components/icons/user-icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth_context"
import { Loader2, Shuffle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { updateUserSchema, UpdateUserSchema } from "@/schemas/auth_schema"
import { useState } from "react"
import { usePagesContext } from "@/context/pages_context"

const DashboardAccount = () => {

  const { user, editUser, deleteUser } = useAuth()
  const [ avatar, setAvatar ] = useState(user?.avatar)
  const [ loading, setLoading ] = useState(false)
  const { clearPages } = usePagesContext()

  const handleDeleteAccount = () => {
    deleteUser()
    clearPages()
  }

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: user?.name || "" },
  })
  
  const onSubmit = async (data: UpdateUserSchema) => {
    await editUser(data)
  }

  const handleNewAvatar =  async (data: UpdateUserSchema) => {
    try {
      setLoading(true)
      await editUser(data)
    } finally {
      setLoading(false)
    }
  }

  const newAvatar = () => {
    const seed = Math.random().toString(36).substring(7)
    setAvatar(`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`)
  }

  return (
    <div className="flex flex-col gap-6 p-4 bg-white dark:bg-neutral-950 rounded-xl self-center max-w-3xl w-full">
      <h2 className="text-2xl font-bold">Configuración de la Cuenta</h2>

      {/* Avatar */}
      <Card>
        <CardContent className="flex justify-between">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">
              Avatar
            </h2>
            <CardDescription className="max-w-sm">
              Este es tu avatar, puedes cambiarlo por otro aleatorio.
            </CardDescription>
          </div>

          <div className="relative">
            <Button onClick={newAvatar} variant={"secondary"} size={"icon"} className="absolute z-10 rounded-full size-10 group-hover:visible -top-2 -right-2 border group active:scale-90 transition-all ease-in-out" >
              <Shuffle className="group-hover:scale-110 transition-all ease-in-out" />
            </Button> 
            <Avatar className="size-24 border bg-muted">
              <AvatarImage src={avatar} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </div>

        </CardContent>
        <CardFooter className="text-sm flex flex-col sm:flex-row justify-end border-t gap-4">
          <Button onClick={() => setAvatar(user?.avatar)} variant={"secondary"} disabled={avatar === user?.avatar}>
            Cancelar
          </Button>
          <Button className="w-32" onClick={() => handleNewAvatar({avatar: avatar})} disabled={avatar === user?.avatar}>
            {
              loading === true ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                'Guardar cambios'
              )
            }
          </Button>
        </CardFooter>
      </Card>

      {/* Nombre del usuario */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="flex justify-between">
            <div className="space-y-3 w-full">
              <h2 className="text-xl font-bold">Nombre de usuario</h2>
              <CardDescription>Este es tu nombre de usuario. Puedes cambiarlo si lo deseas.</CardDescription>
              <Input {...register("name")} className="max-w-sm" maxLength={64} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="text-sm flex-col gap-4 sm:flex-row sm:gap-0 justify-between border-t">
            <CardDescription>El nombre no puede ser mayor a 64 caracteres.</CardDescription>
            <Button type="submit" disabled={!isDirty} className="w-36">
              {
                isSubmitting === true ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  'Guardar cambios'
                )
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
      
      {/* Email */}
      <Card className="">
        <CardContent className="flex justify-between">
          <div className="space-y-3 w-full">
            <h2 className="text-xl font-bold">
              Email
            </h2>
            <Input defaultValue={user?.email} className="max-w-sm pointer-events-none" readOnly />
          </div>
        </CardContent>
      </Card>

      {/* Eliminar  */}
      <Card className="border-destructive">
        <CardContent className="flex justify-between">
          <div className="space-y-3 w-full">
            <h2 className="text-xl font-bold">
              Eliminar la cuenta
            </h2>
            <CardDescription>
              Elimina tu cuenta permanentemente de Notiony. Esta acción es irreversible, así que continua con precaución.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="text-neutral-500 text-sm flex justify-end border-t border-destructive bg-destructive/20 -mb-6 rounded-b-xl py-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-destructive hover:bg-destructive/70 text-white">
              Eliminar Cuenta
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estas completamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede desacer. Esto eliminará permanentemente tu cuenta.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleDeleteAccount()}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </CardFooter>
      </Card>
      
    </div>
  )
}

export default DashboardAccount