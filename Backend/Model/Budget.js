import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ['weekly', 'monthly', 'yearly'], default: 'monthly' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;