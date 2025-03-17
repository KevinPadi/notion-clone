import express from 'express'
import { register, login, logout, deleteUser, createGuestUser } from '../controllers/auth_controller.js'
import { protect } from '../middlewares/auth_middleware.js'
import passport from 'passport'
import '../config/passportGoogle.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/loginGuest', createGuestUser)
router.post('/logout', logout)
router.delete('/delete', protect, deleteUser)

// ruta de autenticación con Google
router.get('/google', 
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
)

// Ruta de callback de Google
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }), 
  (req, res) => {
    const token = jwt.sign(
      { 
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        oauth: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    res.redirect(process.env.CLIENT_URL)
  }
)


export default router