import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
dotenv.config()

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

// database
connectDB()

const app = express()

// middlewares
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
