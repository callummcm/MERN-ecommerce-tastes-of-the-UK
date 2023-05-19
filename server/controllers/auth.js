import User from '../models/user.js'
import { hashPassword, comparePassword } from '../helpers/auth.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name.trim()) return (res.json({ error: 'Name is required' }))
    if (!email.trim()) return (res.json({ error: 'Email is required' }))
    if (!password || password.length < 6) return (res.json({ error: 'Password must be at least 6 characters long' }))

    const existingUser = await User.findOne({ email })
    if (existingUser) return (res.json({ error: 'Email is taken' }))

    const hashedPassword = await hashPassword(password)

    const user = await new User({ name, email, password: hashedPassword }).save()

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.json({
      user: {
        name: user.name,
        email: user.email
      },
      token
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const login = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email.trim()) return (res.json({ error: 'Email is required' }))

    const user = await User.findOne({ email })
    if (!user) return (res.json({ error: 'That email is not currently registered' }))

    const checkPassword = await comparePassword(password, user.password)
    console.log(checkPassword);
    if (!checkPassword) return (res.json({ error: 'Incorrect password' }))

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    console.log(user)

    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin
      },
      token
    })
  }
  catch (err) {
    console.log(err);
  }
}