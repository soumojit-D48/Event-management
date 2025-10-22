import express from 'express';
import {
    getPendingRequests,
    approveRole,
    rejectRole,
    
    getAllUsers,
    updateUserRole,
    deleteUser
} from '../controllers/adminController.js';
import userAuth from '../middlewares/userAuth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

router.get('/pending-requests', userAuth, authorize('admin'), getPendingRequests);
router.put('/approve-role/:userId', userAuth, authorize('admin'), approveRole);
router.put('/reject-role/:userId', userAuth, authorize('admin'), rejectRole);

router.get('/users', userAuth, authorize('admin'), getAllUsers);
router.put('/users/:userId/role', userAuth, authorize('admin'), updateUserRole);
router.delete('/users/:userId', userAuth, authorize('admin'), deleteUser);

export default router;