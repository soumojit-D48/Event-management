import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  item: String,  // Name of the item or service (e.g. “Snacks”, “Banners”)
  amount: Number, // How much money was spent on that item
  category: String,// Type/category (e.g. “Food”, “Venue”, “Printing”)
});

const budgetSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  allocated: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
  expenses: [expenseSchema],
});

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
