import { z } from 'zod'

export const createPageSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es obligatorio')
    .max(64, 'El nombre no puede tener más de 64 caracteres'),
  content: z.any().optional(), // JSON al inicio vacío
  icon: z.string().optional(),
  cover: z.string().url('Porfavor usa una url válida').optional(), 
  favorite: z.boolean().default(false),
})

export const editPageSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es obligatorio')
    .max(64, 'El nombre no puede tener más de 64 caracteres').optional(),
  content: z.any().optional(), // JSON al inicio vacío
  icon: z.string().optional(),
  cover: z.string()
  .refine(val => val === 'none' || /^https?:\/\/.+$/.test(val), {
    message: 'Debe ser una URL válida o "none"',
  })
  .optional(),
  favorite: z.boolean().optional(),
})
