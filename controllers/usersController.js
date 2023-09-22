import User from "../model/User.js";
import bcrypt from 'bcrypt'


const getAllUsersHandler = async (req, res) => {
    const users = await User.find();

    !users && res.status(204).json({"message" : "No user Found"})

    res.status(200).json({
        "message": "All users",
        "data" : users
    });
}

const getUserHandler = async (req, res) => {
    const user = await User.findById(req.params.id);

    !user && res.status(204)

    res.status(200).json({
        "message": "User found",
        "data": user
    })
}

const updateUserHandler = async (req, res) => {
    console.log(req?.body?._id)
    const user = await User.findById(req.body._id)
    
    !user && res.status(204).json({
        "message": "user not found",
    })

    if(req.body.password){
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPwd
    } 

    try {
        const updateUser = await User.findByIdAndUpdate(req.body._id, {
            $set: req.body
        })
        const result = await user.save()
        res.status(200).json(result);
    } catch (error) {
        res.send(error);
    }
}

const deleteUserHandler = async (req, res) => {
    if (!req?.body?._id) return res.status(400).json({ 'message': 'UserID required.' })
    try {
        const user = await User.findOne({ _id: req.body._id });
        if(!user) return res.status(204).json({ "message": "user not found" })

        const deleteUser = await user.deleteOne();
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).send('bad request')
    }
    
}

const un_followUserHandler = async (req, res) => {
    if(req?.body?._id !== req?.params?.id){
        try {
            const userToBeFollowed = await User.findById(req.params.id);
            const followingUser = await User.findById(req.body._id)
            if(!userToBeFollowed.followers.includes(req.body._id)){
                await userToBeFollowed.updateOne({ $push: { followers: req.body._id } })
                await followingUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).send('user has been followed')
            } else{
                await userToBeFollowed.updateOne({ $pull: { followers: req.body._id } });
                await followingUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).send('User has been unfollowed');
            }
        } catch (error) {
            res.status(403).send(error)
        }
    } else {
        res.status(403).send("You can't follow yourself")
    }
}

// const unfollowUserHandler = async (req, res) => {
//     if(req?.body?._id !== req?.params?.id){
//         try {
//             const userToBeFollowed = await User.findById(req.params.id);
//             const followingUser = await User.findById(req.body._id);
//             if(userToBeFollowed.followers.includes(req.body._id)){
                
//             } else{
//                 res.status(403).send("You don't follow this user");
//             }
//         } catch (error) {
//             res.status(403).json(error);
//         }
//     } else {
//         res.status(400).send("You can't follow youself");
//     }
// }

export {
    getUserHandler,
    getAllUsersHandler,
    deleteUserHandler,
    updateUserHandler,
    un_followUserHandler
    // unfollowUserHandler
}