import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    likes: {
        type: Array,
        default: []
    },
    desc: {
        type: String,
        max: 500
    }
},
    {timeStamps: true})

export default mongoose.model('Post', postSchema)