import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)