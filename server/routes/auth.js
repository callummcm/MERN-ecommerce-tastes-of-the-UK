import express from 'express'

const router = express.Router()

//middlewares
import { requireSignin, requireAdmin } from '../middlewares/auth.js'
// controllers
import { register, login, updateProfile, getOrders, allOrders } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/auth-check', requireSignin, (req, res) => {
  res.json({ ok: true })
})
router.get('/admin-check', requireSignin, requireAdmin, (req, res) => {
  res.json({ ok: true })
})
router.put("/profile", requireSignin, updateProfile);
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, requireAdmin, allOrders);

export default router