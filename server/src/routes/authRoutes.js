import express from 'express';
import {
    register,
    login,
    logout,
    isAuthenticated,
    sendResetOtp,
    resetPassword
} from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/is-auth', userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

export default router;
