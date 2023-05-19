import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requireSignin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decoded
    next()
  }
  catch (err) {
    return res.status(401).json(err)
  }
}

export const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.admin === false) return res.status(401).send('Unauthorised')
    else next()
  }
  catch (err) {
    return res.status(401).json(err)
  }
}