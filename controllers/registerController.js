import bcrypt from 'bcrypt';
import User from '../model/User.js';

const registerUser = async (req, res) => {

    if(!req.body.username && !req.body.password && !req.body.email) return res.status(401).json({'message' : 'Username, password and email field are compulsory.'});

    const emailExisted = await User.findOne({ email: req.body.email }).exec();
    if(emailExisted) return res.status(409).json({'message': 'email already exited', "status": 409})

    const duplicateUser = await User.findOne({ username: req.body.username }).exec();
    if(duplicateUser) return res.status(409).json({'message': 'user already exited', "status": 409});

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser= await User.create({
            "username": req.body.username,
            "password": hashedPassword,
            "email": req.body.email
        })

        res.status(200).json({
            "message": "user succesfully created",
        })
    } catch (error) {
        console.log(error)
    }
}

export default registerUser