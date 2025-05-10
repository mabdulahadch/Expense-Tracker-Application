import Bill from '../Model/Bill.js';


export const addBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('category').sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    await Bill.deleteOne({ _id: req.params.id });
    res.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSpendingByCategory = async (req, res) => {
  try {
    const aggregation = await Bill.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);
    res.json(aggregation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};