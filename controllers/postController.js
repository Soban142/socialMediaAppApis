import Post from "../model/Post.js";
import User from '../model/User.js'

// creation of a post

const addPost = async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body
        })
        res.status(201).send('post created succesfully!')
    } catch (error) {
        res.json(error)
    }
}

// get a post

const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch(error){
        res.send(error)
    }
}

// updation of a post

const updatePost = async (req, res) => {
    const postToBeUpdated = await Post.findById(req.params.id);

    try {
        if(postToBeUpdated.userID === req.body.userID){
            await postToBeUpdated.updateOne({
                $set: req.body
            })
            res.status(200).send('Your post has been updated')
        } else {
            res.status(400).send('You can update only your post')
        }
    } catch (error) {
        res.send(error)
    }
}

//deletion of a post

const deletePost = async (req, res) =>{
    
    try {
        const postToBeDeleted = await Post.findById(req.params.id);
        if(postToBeDeleted.userID === req.body.userID){
            await postToBeDeleted.deleteOne()
            res.status(200).send('Your post has been deleted')
        } else {
            res.status(400).send('You can delete only your post')
        }
    } catch (error) {
        res.send(error)
    }
}

// like a post

const dis$likeAPost = async (req, res) => {
    try {
        const postToBeLiked = await Post.findById(req.params.id);
        // if(!postToBeLiked.userID === req.body.userID || postToBeLiked.userID === req.body.userID){
            if(!postToBeLiked.likes.includes(req.body.userID)){
                await postToBeLiked.updateOne({ $push: { likes: req.body.userID } })
                res.status(200).send('You liked this post.')
            } else {
                await postToBeLiked.updateOne({ $pull: { likes: req.body.userID } })
                res.status(200).send('You unliked this post.')
            }
        // } 
    } catch (error) {
        res.send(error)
    }
}

const userTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userID);
        const userPosts = await Post.find({ userID: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({ userID: friendId })
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }   
}

export {
    addPost,
    getPost,
    updatePost,
    deletePost,
    dis$likeAPost,
    userTimeline
}