import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 64
  },
  admin: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    type: String,
    trim: true,
  }
}, { timestamps: true })

export default mongoose.model('User', userSchema)