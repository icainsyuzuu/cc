import express from 'express';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';
import {
    getDashboard,
    getProfile,
    updateProfile,
    deleteProfile
} from '../controller/userController.js';

const userRouter = express.Router();
userRouter.get('/dashboard', authMiddleware, getDashboard);
// Fetch user profile data (GET request)
userRouter.get('/profile', authMiddleware, getProfile);
//update user profile (PUT request)
userRouter.put('/profile', authMiddleware, updateProfile);
// delete user
userRouter.delete('/profile', authMiddleware, deleteProfile);

// export default userRouter;
export { userRouter };