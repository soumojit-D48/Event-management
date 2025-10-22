// // ============================================
// // budgetController.js
// // ============================================

// import Budget from '../models/Budget.js';
// import Event from '../models/Event.js';

// // Get budget for a specific event
// export const getBudgetByEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;
    
//     const budget = await Budget.findOne({ event: eventId }).populate('event');
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     // Calculate remaining budget
//     const remaining = budget.allocated - budget.spent;
    
//     res.status(200).json({ 
//       success: true, 
//       data: {
//         ...budget.toObject(),
//         remaining,
//         percentageUsed: budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching budget', 
//       error: error.message 
//     });
//   }
// };

// // Create a new budget for an event
// export const createBudget = async (req, res) => {
//   try {
//     const { eventId, allocated } = req.body;
    
//     if (!eventId || allocated === undefined) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Event ID and allocated budget are required' 
//       });
//     }
    
//     // Check if event exists
//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Event not found' 
//       });
//     }
    
//     // Check if budget already exists for this event
//     const existingBudget = await Budget.findOne({ event: eventId });
//     if (existingBudget) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Budget already exists for this event' 
//       });
//     }
    
//     const newBudget = new Budget({
//       event: eventId,
//       allocated,
//       spent: 0,
//       expenses: []
//     });
    
//     await newBudget.save();
    
//     res.status(201).json({ 
//       success: true, 
//       message: 'Budget created successfully', 
//       data: newBudget 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error creating budget', 
//       error: error.message 
//     });
//   }
// };

// // Update allocated budget
// export const updateAllocatedBudget = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { allocated } = req.body;
    
//     if (allocated === undefined || allocated < 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Valid allocated amount is required' 
//       });
//     }
    
//     const budget = await Budget.findOneAndUpdate(
//       { event: eventId },
//       { allocated },
//       { new: true }
//     );
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Budget updated successfully', 
//       data: budget 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error updating budget', 
//       error: error.message 
//     });
//   }
// };

// // Add an expense
// export const addExpense = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { item, amount, category } = req.body;
    
//     if (!item || !amount || !category) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Item, amount, and category are required' 
//       });
//     }
    
//     if (amount <= 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Amount must be greater than 0' 
//       });
//     }
    
//     const budget = await Budget.findOne({ event: eventId });
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     // Check if adding this expense would exceed allocated budget
//     const newTotal = budget.spent + amount;
//     if (newTotal > budget.allocated) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Adding this expense would exceed allocated budget. Remaining: $${budget.allocated - budget.spent}` 
//       });
//     }
    
//     const newExpense = {
//       item,
//       amount,
//       category
//     };
    
//     budget.expenses.push(newExpense);
//     budget.spent = budget.spent + amount;
    
//     await budget.save();
    
//     res.status(201).json({ 
//       success: true, 
//       message: 'Expense added successfully', 
//       data: budget 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error adding expense', 
//       error: error.message 
//     });
//   }
// };

// // Update an expense
// export const updateExpense = async (req, res) => {
//   try {
//     const { eventId, expenseId } = req.params;
//     const { item, amount, category } = req.body;
    
//     const budget = await Budget.findOne({ event: eventId });
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     const expense = budget.expenses.id(expenseId);
    
//     if (!expense) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Expense not found' 
//       });
//     }
    
//     const oldAmount = expense.amount;
//     const newAmount = amount !== undefined ? amount : oldAmount;
//     const amountDifference = newAmount - oldAmount;
    
//     if (amountDifference > 0 && budget.allocated < budget.spent + amountDifference) {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Updating this expense would exceed allocated budget` 
//       });
//     }
    
//     if (item !== undefined) expense.item = item;
//     if (amount !== undefined) expense.amount = newAmount;
//     if (category !== undefined) expense.category = category;
    
//     budget.spent = budget.spent + amountDifference;
    
//     await budget.save();
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Expense updated successfully', 
//       data: budget 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error updating expense', 
//       error: error.message 
//     });
//   }
// };

// // Delete an expense
// export const deleteExpense = async (req, res) => {
//   try {
//     const { eventId, expenseId } = req.params;
    
//     const budget = await Budget.findOne({ event: eventId });
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     const expense = budget.expenses.id(expenseId);
    
//     if (!expense) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Expense not found' 
//       });
//     }
    
//     budget.spent = budget.spent - expense.amount;
//     expense.deleteOne();
    
//     await budget.save();
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Expense deleted successfully', 
//       data: budget 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error deleting expense', 
//       error: error.message 
//     });
//   }
// };

// // Get expense breakdown by category
// export const getExpensesByCategory = async (req, res) => {
//   try {
//     const { eventId } = req.params;
    
//     const budget = await Budget.findOne({ event: eventId });
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     const categoryBreakdown = {};
    
//     budget.expenses.forEach(expense => {
//       if (!categoryBreakdown[expense.category]) {
//         categoryBreakdown[expense.category] = {
//           category: expense.category,
//           total: 0,
//           items: []
//         };
//       }
//       categoryBreakdown[expense.category].total += expense.amount;
//       categoryBreakdown[expense.category].items.push({
//         item: expense.item,
//         amount: expense.amount
//       });
//     });
    
//     const breakdown = Object.values(categoryBreakdown);
    
//     res.status(200).json({ 
//       success: true, 
//       data: breakdown 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching expense breakdown', 
//       error: error.message 
//     });
//   }
// };

// // Get budget summary (for dashboard)
// export const getBudgetSummary = async (req, res) => {
//   try {
//     const { eventId } = req.params;
    
//     const budget = await Budget.findOne({ event: eventId }).populate('event');
    
//     if (!budget) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Budget not found for this event' 
//       });
//     }
    
//     const remaining = budget.allocated - budget.spent;
//     const percentageUsed = budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;
    
//     // Category breakdown
//     const categoryBreakdown = {};
//     budget.expenses.forEach(expense => {
//       if (!categoryBreakdown[expense.category]) {
//         categoryBreakdown[expense.category] = 0;
//       }
//       categoryBreakdown[expense.category] += expense.amount;
//     });
    
//     res.status(200).json({ 
//       success: true, 
//       data: {
//         eventTitle: budget.event.title,
//         allocated: budget.allocated,
//         spent: budget.spent,
//         remaining,
//         percentageUsed: percentageUsed.toFixed(2),
//         percentageRemaining: (100 - percentageUsed).toFixed(2),
//         totalExpenses: budget.expenses.length,
//         categoryBreakdown,
//         expenses: budget.expenses
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching budget summary', 
//       error: error.message 
//     });
//   }
// };

// // ============================================
// // budgetRoutes.js
// // ============================================

// import express from 'express';
// import {
//   getBudgetByEvent,
//   createBudget,
//   updateAllocatedBudget,
//   addExpense,
//   updateExpense,
//   deleteExpense,
//   getExpensesByCategory,
//   getBudgetSummary
// } from '../controllers/budgetController.js';

// const router = express.Router();

// // Budget routes
// router.get('/event/:eventId', getBudgetByEvent);
// router.post('/create', createBudget);
// router.put('/event/:eventId/allocated', updateAllocatedBudget);

// // Expense routes
// router.post('/event/:eventId/expense', addExpense);
// router.put('/event/:eventId/expense/:expenseId', updateExpense);
// router.delete('/event/:eventId/expense/:expenseId', deleteExpense);

// // Analytics routes
// router.get('/event/:eventId/category-breakdown', getExpensesByCategory);
// router.get('/event/:eventId/summary', getBudgetSummary);

// export default router;












import Budget from "../models/Bedget.js";
import Event from "../models/Event.js";

// Get budget for a specific event
export const getBudget = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check if user is authorized (organizer, faculty, or volunteer)
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString()) ||
            event.volunteers.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to view this budget" 
            });
        }

        // Get or create budget
        let budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            budget = new Budget({ event: eventId });
            await budget.save();
        }

        // Calculate remaining budget
        const remaining = budget.allocated - budget.spent;

        res.status(200).json({ 
            success: true, 
            budget: {
                ...budget.toObject(),
                remaining
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update allocated budget (only organizers/faculty)
export const updateAllocatedBudget = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { allocated } = req.body;

        if (!allocated || allocated < 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid allocated amount" 
            });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Only organizers and faculty can update allocated budget
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "Only organizers and faculty can update allocated budget" 
            });
        }

        let budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            budget = new Budget({ event: eventId, allocated });
        } else {
            budget.allocated = allocated;
        }

        await budget.save();

        res.status(200).json({ 
            success: true, 
            message: "Allocated budget updated successfully",
            budget 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Add expense
export const addExpense = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { item, amount, category } = req.body;

        if (!item || !amount || amount <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid expense data" 
            });
        }

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check authorization
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString()) ||
            event.volunteers.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to add expenses" 
            });
        }

        let budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            budget = new Budget({ event: eventId });
        }

        // Add expense
        budget.expenses.push({ item, amount, category });
        
        // Update spent amount
        budget.spent += amount;
        
        await budget.save();

        res.status(201).json({ 
            success: true, 
            message: "Expense added successfully",
            budget 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Update expense
export const updateExpense = async (req, res) => {
    try {
        const { eventId, expenseId } = req.params;
        const { item, amount, category } = req.body;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check authorization
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString()) ||
            event.volunteers.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to update expenses" 
            });
        }

        const budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            return res.status(404).json({ 
                success: false, 
                message: "Budget not found" 
            });
        }

        const expense = budget.expenses.id(expenseId);
        
        if (!expense) {
            return res.status(404).json({ 
                success: false, 
                message: "Expense not found" 
            });
        }

        // Update spent amount (subtract old, add new)
        const oldAmount = expense.amount;
        budget.spent = budget.spent - oldAmount + (amount || oldAmount);

        // Update expense fields
        if (item) expense.item = item;
        if (amount) expense.amount = amount;
        if (category) expense.category = category;

        await budget.save();

        res.status(200).json({ 
            success: true, 
            message: "Expense updated successfully",
            budget 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Delete expense
export const deleteExpense = async (req, res) => {
    try {
        const { eventId, expenseId } = req.params;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Only organizers and faculty can delete expenses
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "Only organizers and faculty can delete expenses" 
            });
        }

        const budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            return res.status(404).json({ 
                success: false, 
                message: "Budget not found" 
            });
        }

        const expense = budget.expenses.id(expenseId);
        
        if (!expense) {
            return res.status(404).json({ 
                success: false, 
                message: "Expense not found" 
            });
        }

        // Update spent amount
        budget.spent -= expense.amount;
        
        // Remove expense
        expense.deleteOne();
        
        await budget.save();

        res.status(200).json({ 
            success: true, 
            message: "Expense deleted successfully",
            budget 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

// Get budget analytics/breakdown
export const getBudgetAnalytics = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                success: false, 
                message: "Event not found" 
            });
        }

        // Check authorization
        const isAuthorized = 
            event.createdBy.some(id => id.toString() === req.user._id.toString()) ||
            event.coordinators.some(id => id.toString() === req.user._id.toString()) ||
            event.volunteers.some(id => id.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ 
                success: false, 
                message: "You are not authorized to view budget analytics" 
            });
        }

        const budget = await Budget.findOne({ event: eventId });
        
        if (!budget) {
            return res.status(200).json({ 
                success: true, 
                analytics: {
                    totalAllocated: 0,
                    totalSpent: 0,
                    remaining: 0,
                    categoryBreakdown: [],
                    expenseCount: 0
                }
            });
        }

        // Calculate category breakdown
        const categoryBreakdown = {};
        budget.expenses.forEach(expense => {
            const cat = expense.category || 'Uncategorized';
            if (!categoryBreakdown[cat]) {
                categoryBreakdown[cat] = 0;
            }
            categoryBreakdown[cat] += expense.amount;
        });

        const analytics = {
            totalAllocated: budget.allocated,
            totalSpent: budget.spent,
            remaining: budget.allocated - budget.spent,
            categoryBreakdown: Object.entries(categoryBreakdown).map(([category, amount]) => ({
                category,
                amount,
                percentage: budget.spent > 0 ? ((amount / budget.spent) * 100).toFixed(2) : 0
            })),
            expenseCount: budget.expenses.length,
            utilizationPercentage: budget.allocated > 0 ? ((budget.spent / budget.allocated) * 100).toFixed(2) : 0
        };

        res.status(200).json({ 
            success: true, 
            analytics 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
};

