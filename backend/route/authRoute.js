import express from 'express';
import {
    registerUser,
    loginUser,
    logout
} from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logout);

// export default authRouter;
export { authRouter };