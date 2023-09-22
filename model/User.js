import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        profileImg: {
            type: String,
            default: ''
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        roles: {
            User: {
                type: Number,
                default: 1001
            },
            Admin: {
                type: Boolean,
                default: false
            }
        },
        desc: {
            type: String,
            max: 50
        },
        city: {
            type: String,
            max: 50
        },
        gender: {
            type: String
        },
    },
        {timeStamps: true})

export default mongoose.model('User', userSchema)