import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import morgan from 'morgan'

mongoose.set('strictQuery', false)
dotenv.config()
const app = express()

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('DB ERROR', err))
// middlewares
app.use(morgan('dev'))

// router middleware
app.use('/api', authRoutes)



const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})