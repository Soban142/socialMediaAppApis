import express from 'express'
import { deleteUserHandler, updateUserHandler, getUserHandler, getAllUsersHandler } from "../controllers/usersController.js"; 

const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsersHandler)
    .put(updateUserHandler)
    .delete(deleteUserHandler);

userRouter.route('/:id')
    .get(getUserHandler);


export {userRouter}