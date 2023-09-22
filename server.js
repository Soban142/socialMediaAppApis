import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt';
import connectDb from './config/dbConn.js';
import profileRoute from './routes/profileRoutes.js';
import register from './routes/register.js';
import login from './routes/auth.js';
import {userRouter} from './routes/users.js';
import un_followHandler from './routes/follow.js';
import postRoutes from './routes/post.js';

connectDb();
const app = express();
const port = process.env.Port || 8000;

app.use(express.json())

app.use('/api/v1/register', register)
app.use('/api/v1/login', login)
app.use('/api/v1/profile', profileRoute)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/users', un_followHandler)
app.use('/api/v1/posts', postRoutes)


mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log('Listening to requests that are being send to the server!')
    });
})
