import express from 'express'
import formidable from 'express-formidable'

const router = express.Router()

// middlewares
import { requireSignin, requireAdmin } from '../middlewares/auth.js'
// controllers
import { create, list, read, photo, remove, update, listAll } from '../controllers/product.js'

router.post('/product', requireSignin, requireAdmin, formidable(), create)
router.get('/products', list)
router.get('/all-products', listAll)
router.get('/product/:slug', read)
router.get('/product/photo/:id', photo)
router.delete('/product/:id', requireSignin, requireAdmin, remove)
router.put('/product/:id', requireSignin, requireAdmin, formidable(), update)

export default router