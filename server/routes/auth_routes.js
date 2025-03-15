import express from 'express'
import { register, login, logout, deleteUser, createGuestUser } from '../controllers/auth_controller.js'
import { protect } from '../middlewares/auth_middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/loginGuest', createGuestUser)
router.post('/logout', logout)
router.delete('/delete', protect, deleteUser)

export default router