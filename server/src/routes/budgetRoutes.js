import express from 'express';
import { 
    getBudget, 
    updateAllocatedBudget, 
    addExpense, 
    updateExpense, 
    deleteExpense,
    getBudgetAnalytics 
} from '../controllers/budgetController.js';
import  userAuth  from '../middlewares/userAuth.js';
import {authorize} from '../middlewares/authorize.js';

const router = express.Router();

// All routes require authentication and authorized roles
router.use(userAuth);
router.use(authorize('organizer', 'faculty', 'volunteer'));

// Get budget for an event
router.get('/:eventId', getBudget);

// Get budget analytics/breakdown
router.get('/:eventId/analytics', getBudgetAnalytics);

// Update allocated budget (only organizers and faculty)
router.put('/:eventId/allocated', updateAllocatedBudget);

// Add expense
router.post('/:eventId/expense', addExpense);

// Update expense
router.put('/:eventId/expense/:expenseId', updateExpense);

// Delete expense (only organizers and faculty)
router.delete('/:eventId/expense/:expenseId', deleteExpense);

export default router;