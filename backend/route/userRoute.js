import express from 'express';
import {
    authMiddleware
} from '../middleware/authMiddleware.js';
import {
    getDashboard,
    getProfile
} from '../controller/userController.js';

const userRouter = express.Router();
userRouter.get('/dashboard', authMiddleware, getDashboard);
// Fetch user profile data (GET request)
userRouter.get('/profile', authMiddleware, getProfile);

// export default userRouter;
export { userRouter };