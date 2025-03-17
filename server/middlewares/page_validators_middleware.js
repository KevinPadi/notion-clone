import { createPageSchema, editPageSchema } from "../validations/page_validation.js"

export const validateCreatePage = (req, res, next) => {
  try {
    req.body = createPageSchema.parse(req.body)
    next()
  } catch (error) {
    return res.status(400).json({ error: error.errors })
  }
}

export const validateEditPage = (req, res, next) => {
  try {
    req.body = editPageSchema.parse(req.body)
    next()
  } catch (error) {
    return res.status(400).json({ error: error.errors })
  }
}
