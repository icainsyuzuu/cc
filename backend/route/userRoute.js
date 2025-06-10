import express from 'express';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';
import {
    getDashboard,
    getProfile,
    updateProfile,
    deleteProfile,
    uploadPhotoProfile
} from '../controller/userController.js';
import { uploadImage } from '../middleware/uploadImage.js';

const userRouter = express.Router();
userRouter.get('/dashboard', authMiddleware, getDashboard);
// Fetch user profile data (GET request)
userRouter.get('/profile', authMiddleware, getProfile);
//update user profile (PUT request)
userRouter.put('/profile', authMiddleware, updateProfile);
// delete user
userRouter.delete('/profile', authMiddleware, deleteProfile);

// photo profile
// userRouter.post('/profile/:user_id', authMiddleware, uploadImage, uploadPhotoProfile);

// export default userRouter;
export { userRouter };