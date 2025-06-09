import express from 'express';
import {
    registerUser,
    loginUser,
    logout,
    getAccessToken
} from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.delete('/logout', logout);
//dapetin // access token dari refresh token
authRouter.get('/token', getAccessToken);

// export default authRouter;
export { authRouter };