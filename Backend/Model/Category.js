import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;