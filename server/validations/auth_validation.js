import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(1, 'El nombre de usuario debe tener al menos 1 caracter')
    .max(64, 'El nombre de usuario no puede ser mayor a 64 caracteres'),
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
    password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres')
    .optional(),
  
});

export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .max(100, 'El email no puede tener más de 100 caracteres'),
    password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(64, 'La contraseña no puede tener más de 64 caracteres')
    .optional()  
});