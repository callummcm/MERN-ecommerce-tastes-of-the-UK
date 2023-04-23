import express from 'express'

const router = express.Router()

// middlewares
import { requireSignin, requireAdmin } from '../middlewares/auth.js'
// controllers
import { create, update, remove, list, read } from '../controllers/category.js'

router.post('/category', requireSignin, requireAdmin, create)
router.put('/category/:categoryId', requireSignin, requireAdmin, update)
router.delete('/category/:categoryId', requireSignin, requireAdmin, remove)
router.get('/categories', list)
router.get('/category/:slug', read)

export default router