import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (error) {
        console.error(error)
    }
}

export default connectDb
    
