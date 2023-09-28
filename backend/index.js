import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
dotenv.config();

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import { globalErrHandler, notFound } from './middlewares/errorMiddleware.js';

// database
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);

// error middlewares
app.use(notFound);
app.use(globalErrHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
