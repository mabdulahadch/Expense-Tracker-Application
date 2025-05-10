import Budget from '../Model/Budget.js';

export const setBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({ category: req.body.category });
    
    if (budget) {
      budget = await Budget.findOneAndUpdate(
        { category: req.body.category },
        { $set: { amount: req.body.amount } },
        { new: true }
      );
    } else {
      budget = await Budget.create(req.body);
    }
    
    res.json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().populate('category');
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};