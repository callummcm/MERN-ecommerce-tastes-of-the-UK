import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()
const app = express()
mongoose.connect()

app.get('/users', (req, res) => {
  res.json({
    name: 'callum',
    age: 16
  })
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})