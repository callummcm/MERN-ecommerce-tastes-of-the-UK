import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import morgan from 'morgan'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import cors from 'cors'

mongoose.set('strictQuery', false)
dotenv.config()
const app = express()

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('DB ERROR', err))

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// router middleware
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})