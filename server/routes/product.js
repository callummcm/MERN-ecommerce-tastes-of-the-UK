import express from 'express'
import formidable from 'express-formidable'

const router = express.Router()

// middlewares
import { requireSignin, requireAdmin } from '../middlewares/auth.js'
// controllers
import { create, list, read, image, remove, update, listAll, removeFields, fetchFeatured } from '../controllers/product.js'

router.post('/product', requireSignin, requireAdmin, formidable(), create)
router.get('/products', list)
router.get('/all-products', listAll)
router.get('/featured-products', fetchFeatured)
router.get('/product/:slug', read)
router.get('/product/image/:id', image)
router.delete('/product/:id', requireSignin, requireAdmin, remove)
router.put('/product/:id', requireSignin, requireAdmin, formidable(), update)

//remove
router.patch('/update-product-fields', formidable(), removeFields)

export default router