import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now },
});


const Bill = mongoose.model("Bill", BillSchema);
export default Bill;