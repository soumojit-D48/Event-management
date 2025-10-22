// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   useGetBudgetQuery,
//   useGetBudgetAnalyticsQuery,
//   useUpdateAllocatedBudgetMutation,
//   useAddExpenseMutation,
//   useDeleteExpenseMutation,
// } from '../state/api'; // adjust path

// const BudgetDashboard = () => {
//   const { eventId } = useParams();
//   const [allocated, setAllocated] = useState('');
//   const [expenseForm, setExpenseForm] = useState({
//     item: '',
//     amount: '',
//     category: '',
//   });

//   // Queries
//   const { data: budgetData, isLoading: budgetLoading } = useGetBudgetQuery(eventId);
//   const { data: analyticsData, isLoading: analyticsLoading } = useGetBudgetAnalyticsQuery(eventId);

//   // Mutations
//   const [updateAllocated, { isLoading: isUpdating }] = useUpdateAllocatedBudgetMutation();
//   const [addExpense, { isLoading: isAdding }] = useAddExpenseMutation();
//   const [deleteExpense] = useDeleteExpenseMutation();

//   const handleUpdateAllocated = async (e) => {
//     e.preventDefault();
//     try {
//       await updateAllocated({
//         eventId,
//         allocated: Number(allocated),
//       }).unwrap();
//       setAllocated('');
//       alert('Allocated budget updated successfully!');
//     } catch (error) {
//       alert(error?.data?.message || 'Failed to update budget');
//     }
//   };

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     try {
//       await addExpense({
//         eventId,
//         expenseData: {
//           item: expenseForm.item,
//           amount: Number(expenseForm.amount),
//           category: expenseForm.category,
//         },
//       }).unwrap();
//       setExpenseForm({ item: '', amount: '', category: '' });
//       alert('Expense added successfully!');
//     } catch (error) {
//       alert(error?.data?.message || 'Failed to add expense');
//     }
//   };

//   const handleDeleteExpense = async (expenseId) => {
//     if (!window.confirm('Are you sure you want to delete this expense?')) return;
    
//     try {
//       await deleteExpense({ eventId, expenseId }).unwrap();
//       alert('Expense deleted successfully!');
//     } catch (error) {
//       alert(error?.data?.message || 'Failed to delete expense');
//     }
//   };

//   if (budgetLoading || analyticsLoading) {
//     return <div>Loading budget...</div>;
//   }

//   const budget = budgetData?.budget;
//   const analytics = analyticsData?.analytics;

//   return (
//     <div className="budget-dashboard">
//       <h1>Budget Management</h1>

//       {/* Budget Overview */}
//       <div className="budget-overview">
//         <div className="budget-card">
//           <h3>Allocated</h3>
//           <p>₹{budget?.allocated || 0}</p>
//         </div>
//         <div className="budget-card">
//           <h3>Spent</h3>
//           <p>₹{budget?.spent || 0}</p>
//         </div>
//         <div className="budget-card">
//           <h3>Remaining</h3>
//           <p>₹{budget?.remaining || 0}</p>
//         </div>
//         <div className="budget-card">
//           <h3>Utilization</h3>
//           <p>{analytics?.utilizationPercentage || 0}%</p>
//         </div>
//       </div>

//       {/* Update Allocated Budget Form */}
//       <div className="update-allocated-section">
//         <h2>Update Allocated Budget</h2>
//         <form onSubmit={handleUpdateAllocated}>
//           <input
//             type="number"
//             placeholder="Enter allocated amount"
//             value={allocated}
//             onChange={(e) => setAllocated(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={isUpdating}>
//             {isUpdating ? 'Updating...' : 'Update Allocated'}
//           </button>
//         </form>
//       </div>

//       {/* Add Expense Form */}
//       <div className="add-expense-section">
//         <h2>Add Expense</h2>
//         <form onSubmit={handleAddExpense}>
//           <input
//             type="text"
//             placeholder="Item name"
//             value={expenseForm.item}
//             onChange={(e) => setExpenseForm({ ...expenseForm, item: e.target.value })}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={expenseForm.amount}
//             onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Category (e.g., Food, Venue)"
//             value={expenseForm.category}
//             onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
//           />
//           <button type="submit" disabled={isAdding}>
//             {isAdding ? 'Adding...' : 'Add Expense'}
//           </button>
//         </form>
//       </div>

//       {/* Category Breakdown */}
//       <div className="category-breakdown">
//         <h2>Category Breakdown</h2>
//         {analytics?.categoryBreakdown?.map((cat, idx) => (
//           <div key={idx} className="category-item">
//             <span>{cat.category}</span>
//             <span>₹{cat.amount}</span>
//             <span>{cat.percentage}%</span>
//           </div>
//         ))}
//       </div>

//       {/* Expenses List */}
//       <div className="expenses-list">
//         <h2>Expenses</h2>
//         {budget?.expenses?.length === 0 ? (
//           <p>No expenses added yet</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {budget?.expenses?.map((expense) => (
//                 <tr key={expense._id}>
//                   <td>{expense.item}</td>
//                   <td>{expense.category || 'N/A'}</td>
//                   <td>₹{expense.amount}</td>
//                   <td>
//                     <button onClick={() => handleDeleteExpense(expense._id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BudgetDashboard;



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetBudgetQuery,
  useGetBudgetAnalyticsQuery,
  useUpdateAllocatedBudgetMutation,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from '../state/api'; // adjust your import path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Plus, Trash2, Edit, DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BudgetDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [allocatedInput, setAllocatedInput] = useState('');
  const [isAllocatedDialogOpen, setIsAllocatedDialogOpen] = useState(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [expenseForm, setExpenseForm] = useState({
    item: '',
    amount: '',
    category: '',
  });

  // Queries
  const { data: budgetData, isLoading: budgetLoading, error: budgetError } = useGetBudgetQuery(eventId);
  const { data: analyticsData, isLoading: analyticsLoading } = useGetBudgetAnalyticsQuery(eventId);

  // Mutations
  const [updateAllocated, { isLoading: isUpdating }] = useUpdateAllocatedBudgetMutation();
  const [addExpense, { isLoading: isAdding }] = useAddExpenseMutation();
  const [updateExpense, { isLoading: isUpdatingExpense }] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const handleUpdateAllocated = async (e) => {
    e.preventDefault();
    try {
      await updateAllocated({
        eventId,
        allocated: Number(allocatedInput),
      }).unwrap();
      setAllocatedInput('');
      setIsAllocatedDialogOpen(false);
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await addExpense({
        eventId,
        expenseData: {
          item: expenseForm.item,
          amount: Number(expenseForm.amount),
          category: expenseForm.category,
        },
      }).unwrap();
      setExpenseForm({ item: '', amount: '', category: '' });
      setIsAddExpenseDialogOpen(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleEditExpense = async (e) => {
    e.preventDefault();
    try {
      await updateExpense({
        eventId,
        expenseId: selectedExpense._id,
        expenseData: {
          item: expenseForm.item,
          amount: Number(expenseForm.amount),
          category: expenseForm.category,
        },
      }).unwrap();
      setExpenseForm({ item: '', amount: '', category: '' });
      setSelectedExpense(null);
      setIsEditExpenseDialogOpen(false);
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    try {
      await deleteExpense({ eventId, expenseId }).unwrap();
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const openEditDialog = (expense) => {
    setSelectedExpense(expense);
    setExpenseForm({
      item: expense.item,
      amount: expense.amount,
      category: expense.category || '',
    });
    setIsEditExpenseDialogOpen(true);
  };

  if (budgetLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading budget data...</p>
        </div>
      </div>
    );
  }

  if (budgetError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            {budgetError?.data?.message || 'Failed to load budget data. You may not have permission to view this budget.'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const budget = budgetData?.budget;
  const analytics = analyticsData?.analytics;

  // Chart data
  const pieChartData = {
    labels: analytics?.categoryBreakdown?.map(cat => cat.category) || [],
    datasets: [
      {
        data: analytics?.categoryBreakdown?.map(cat => cat.amount) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(234, 179, 8, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: analytics?.categoryBreakdown?.map(cat => cat.category) || [],
    datasets: [
      {
        label: 'Amount Spent (₹)',
        data: analytics?.categoryBreakdown?.map(cat => cat.amount) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-500 mt-1">Track and manage your event budget</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAllocatedDialogOpen} onOpenChange={setIsAllocatedDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <DollarSign className="mr-2 h-4 w-4" />
                Set Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Allocated Budget</DialogTitle>
                <DialogDescription>Set the total budget allocated for this event</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateAllocated} className="space-y-4">
                <div className='space-y-3'>
                  <Label htmlFor="allocated">Allocated Amount (₹)</Label>
                  <Input
                    id="allocated"
                    type="number"
                    placeholder="Enter amount"
                    value={allocatedInput}
                    onChange={(e) => setAllocatedInput(e.target.value)}
                    required
                    min="0"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Budget'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new expense for this event</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className='space-y-3'>
                  <Label htmlFor="item">Item Name</Label>
                  <Input
                    id="item"
                    placeholder="e.g., Snacks, Banners"
                    value={expenseForm.item}
                    onChange={(e) => setExpenseForm({ ...expenseForm, item: e.target.value })}
                    required
                  />
                </div>
                <div className='space-y-3'>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <div className='space-y-3'>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Food, Venue, Printing"
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isAdding}>
                  {isAdding ? 'Adding...' : 'Add Expense'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹{budget?.allocated?.toLocaleString() || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Budget allocated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹{budget?.spent?.toLocaleString() || 0}</div>
            <p className="text-xs text-gray-500 mt-1">{analytics?.expenseCount || 0} expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Remaining</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹{budget?.remaining?.toLocaleString() || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Utilization</CardTitle>
            <PieChart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{analytics?.utilizationPercentage || 0}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(analytics?.utilizationPercentage || 0, 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {analytics?.categoryBreakdown?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <Pie data={pieChartData} options={chartOptions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Spending</CardTitle>
              <CardDescription>Amount spent per category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
          <CardDescription>
            {budget?.expenses?.length || 0} expense(s) recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!budget?.expenses || budget.expenses.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No expenses yet</h3>
              <p className="mt-2 text-sm text-gray-500">Start tracking expenses by clicking "Add Expense" above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Item</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.expenses.map((expense) => (
                    <tr key={expense._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{expense.item}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {expense.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        ₹{expense.amount?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(expense)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense._id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Expense Dialog */}
      <Dialog open={isEditExpenseDialogOpen} onOpenChange={setIsEditExpenseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>Update expense details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditExpense} className="space-y-4">
            <div>
              <Label htmlFor="edit-item">Item Name</Label>
              <Input
                id="edit-item"
                placeholder="e.g., Snacks, Banners"
                value={expenseForm.item}
                onChange={(e) => setExpenseForm({ ...expenseForm, item: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-amount">Amount (₹)</Label>
              <Input
                id="edit-amount"
                type="number"
                placeholder="Enter amount"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                placeholder="e.g., Food, Venue, Printing"
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isUpdatingExpense}>
              {isUpdatingExpense ? 'Updating...' : 'Update Expense'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetDashboard;

