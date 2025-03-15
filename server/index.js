import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth_routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// connect to MongoDB
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

// routes

app.get('/', (req, res) => {
  res.send('Server running...')
})

app.use('/api/auth', authRoutes)

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `)
})