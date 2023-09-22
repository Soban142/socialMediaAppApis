import express from 'express'
import loginHandler from '../controllers/authController.js'

const authRouter = express.Router();

authRouter.post('/', loginHandler);


export default authRouter