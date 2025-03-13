import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// Connect to MongoDB
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

app.get('/', (req, res) => {
  res.send('Server running...')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `)
})