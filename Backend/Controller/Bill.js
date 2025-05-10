import Bill from '../Model/Bill.js';
import mongoose from 'mongoose';

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

// export const deleteBill = async (req, res) => {
//   try {
//     const bill = await Bill.findOneAndDelete({ _id: req.params.id });
//     res.json(bill);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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

export const getRecentBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('category').sort({ date: -1 }).limit(4);
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const countExpenses = async (req, res) => {
  try {
    const count = await Bill.countDocuments({ type: 'expense' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSingleBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id });
    res.json(bill);
  } catch (err) {
    res.status(404).json({ error: 'Bill not found' });
  }
};

export const getDistinctBillAmount = async (req, res) => {
  try {
    const payees = await Bill.distinct('amount');
    res.json(payees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ==============================================================


export const addBillsBulk = async (req, res) => {
  try {
    const bills = await Bill.insertMany(req.body);
    res.status(201).json(bills);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getPagedBills = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const bills = await Bill.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('category')
    .sort({ date: -1 });

    
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const importBills = async (req, res) => {
  try {
    const r = await Bill.bulkWrite(req.body);
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// only testing wrna Schema urr gay gaa
export const renameBillsCollection = async () => {
  await mongoose.connection.db.renameCollection('bills', 'transactions');
};

export const dropBills = async () => {
  await mongoose.connection.db.collection('bills').drop();
};

export const listCollections = async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  res.json(collections.map((c) => c.name));
};