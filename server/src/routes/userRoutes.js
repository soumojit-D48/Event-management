import express from 'express';
import {
    getProfile,
    updateProfile,
    requestRole
} from '../controllers/userController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

router.get('/profile', userAuth, getProfile);
router.put('/profile', userAuth, updateProfile);
router.post('/request-role', userAuth, requestRole);

export default router;