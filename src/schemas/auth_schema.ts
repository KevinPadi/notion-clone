import { z } from "zod"

export const authSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(64, "El nombre no puede ser mayor a 64 caracteres"),
  email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const updateUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(64, "Máximo 64 caracteres").optional(),
  avatar: z.string().url("Debe ser una URL válida").optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>

export type AuthSchema = z.infer<typeof authSchema>