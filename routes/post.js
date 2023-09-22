import express from "express";
import { addPost, updatePost, deletePost, dis$likeAPost, getPost, userTimeline } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.route('/')
    .post(addPost)

postRouter.route('/timeline')
    .get(userTimeline)

postRouter.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

postRouter.put('/:id/like', dis$likeAPost)

export default postRouter