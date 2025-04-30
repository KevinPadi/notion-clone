import User from '../models/user_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerSchema, loginSchema } from '../validations/auth_validation.js'

export const register = async (req, res) => {

  try {
    const { name, email, password } = registerSchema.parse(req.body)

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'Este email ya esta en uso. Por favor inicia sesión o usa otro email para registrarte.' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const defaultAvatar = `https://api.dicebear.com/9.x/notionists/svg?seed=${email}&body=variant08&gesture[]&gestureProbability=0&glassesProbability=100&hair=hat&lips=variant04`

    const user = await User.create({ name: name, email, password: hashedPassword, avatar: defaultAvatar })

    const token = jwt.sign(
      { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
    })

    res.status(201).json({ message: 'Usuario registrado y logueado', token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email incorrecto' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

    const token = jwt.sign(
      { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
    })

    res.status(200).json({ message: 'Inicio de sesión exitoso', token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  
  res.clearCookie('token', {
    httpOnly: true,
    secure:  process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
  })

  res.status(200).json({ message: 'Logout exitoso' })
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: 'No autorizado' });

    let user;

    // primero buscamos si el usuario tiene googleId
    user = await User.findOneAndDelete({ googleId: userId })

    // Si no se encuentra por googleId, busca por _id
    if (!user) {
      user = await User.findByIdAndDelete(userId);
    }
    
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None' });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};



export const createGuestUser = async (req, res) => {

  try {
    const defaultAvatar = 'https://api.dicebear.com/9.x/notionists/svg?seed=defaultAvatar&body=variant08&gesture[]&gestureProbability=0&glassesProbability=100&hair=hat&lips=variant04'

    const guestUser = {
      name: 'Guest',
      email: `guest_${Date.now()}@gmail.com`,
      password: 'guest_password',
      avatar: defaultAvatar
    }

    const user = await User.create(guestUser)

    const token = jwt.sign(
      { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        avatar: user.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    )

    // delete user after 1 hour
    setTimeout(async () => {
      try {
        await User.findByIdAndDelete(user._id)
        console.log(`Guest user ${user._id} deleted`)
      } catch (error) {
        console.error(`Error deleting guest user ${user._id}:`, error)
      }
    }, 60 * 60 * 1000)
    

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
    })

    res.json({ message: 'Guest account created', user })
  } catch (error) {
    console.error('Error creating guest account:', error)
    res.status(500).json({ message: 'Error creating guest account', error })
  }
}

// update user
export const updateUser = async (req, res) => {

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: req.body },
      { new: true }
    )

    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado." })
    
    res.clearCookie('token', {
      httpOnly: true,
      secure:  process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
    })

    const token = jwt.sign(
      { 
        id: updatedUser._id, 
        name: updatedUser.name, 
        email: updatedUser.email,
        avatar: updatedUser.avatar
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax'
    })

    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario." })
  }
}