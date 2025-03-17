import express from "express"
import {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
} from "../controllers/page_controller.js"
import { validateCreatePage, validateEditPage } from "../middlewares/page_validators_middleware.js"
import { protect } from "../middlewares/auth_middleware.js"
const router = express.Router()

router.use(protect)

router.post("/create", validateCreatePage, createPage)
router.get("/getAll", getPages)
router.get("/:id", getPageById)
router.put("/edit/:id", validateEditPage, updatePage)
router.delete("delete/:id", deletePage)

export default router
