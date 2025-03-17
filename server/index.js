import dotenv from 'dotenv'

dotenv.config()

import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth_routes.js'
import pageRoutes from './routes/page_routes.js'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import './config/passportGoogle.js'


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(passport.initialize());

// conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully!')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

connectDB()

// rutas

app.get('/', (req, res) => {
  res.send('Servidor online...')
})

// rutas de autenticación
app.use('/api/auth', authRoutes)

// rutas de las páginas
app.use('/api/pages', pageRoutes)

// Corre el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `)
})