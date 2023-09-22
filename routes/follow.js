import express from "express";
import { un_followUserHandler } from "../controllers/usersController.js";
const un_followRouteHandler = express.Router()

un_followRouteHandler.put('/:id/follow', un_followUserHandler)
// un_followRouteHandler.put('/:id/unfollow', unfollowUserHandler)

export default un_followRouteHandler