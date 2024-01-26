import User from '../models/user.js'
import { hashPassword, comparePassword } from '../helpers/auth.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Order from "../models/order.js";

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
        email: user.email,
        admin: user.admin,
        shippingAddress: user.shippingAddress
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
    if (!checkPassword) return (res.json({ error: 'Incorrect password' }))

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
        shippingAddress: user.shippingAddress
      },
      token
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword, shippingAddress } = req.body;
    const user = await User.findById(req.user._id);
    // check password

    const checkPassword = await comparePassword(currentPassword, user.password)
    if (!checkPassword) return (res.json({ error: 'Incorrect password' }))

    if (newPassword && newPassword.length < 6) {
      return res.json({
        error: 'Password is required and must be at least 6 characters long',
      });
    }
    // hash the password
    const hashedPassword = newPassword ? await hashPassword(newPassword) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        shippingAddress: shippingAddress || user.shippingAddress,
      },
      { new: true }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};