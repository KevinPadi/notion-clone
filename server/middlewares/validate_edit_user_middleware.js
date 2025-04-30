import { z } from "zod"

export const validateEditUser = (req, res, next) => {
  try {
    let schema = z.object({
      name: z.string()
        .min(1, 'El nombre es obligatorio')
        .max(64, 'El nombre no puede tener más de 64 caracteres')
        .optional(),
      avatar: z.string().url('Por favor usa una URL válida').optional()
    });

    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};
