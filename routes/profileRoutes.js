import express from 'express'
import {userProfile, updateProfile} from '../controllers/profileController.js'
const profileRoutes = express.Router();

profileRoutes.get('/:userId/profile', userProfile)
profileRoutes.put('/:userId', updateProfile)


export default profileRoutes