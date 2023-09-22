import bcrypt from 'bcrypt';
import User from '../model/User.js';

const loginHandler = async (req, res) => {
    console.log(req.body)
    let user = req.body.username;
    let password = req.body.password;
    let userEmail = req.body.email;

    if(!user && !password && !email) return res.status(401).json({'message' : 'Username, password and email field are compulsory.'});


    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser) return res.status(400).json({'message': 'user not found', "status": 400});
    
    const matchedPassword = await bcrypt.compare(password, foundUser.password)
    if(!matchedPassword) return res.status(400).json({'message': 'password mismatched', "status": 400})

    const matchedEmail = await User.findOne({ username: user }).find({email: userEmail})
    if(!matchedEmail) return res.status(400).json({'message': 'email mismatched', "status": 400});

    await foundUser.save();

    res.status(200).json({"message": "user is authorized"})
    
}

export default loginHandler