import Category from '../Model/Category.js';


export const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const renameCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findAndReplaceCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndReplace(
       { _id: req.params.id },
      req.body,
      { new: true } // correct for Mongoose
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createCategoryNameIndex = async (req, res) => {
  try {
    await Category.collection.createIndex({ name: 1 }, { unique: true });
    res.json({ message: "Unique index on 'name' created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dropCategoryNameIndex = async (req, res) => {
  try {
    await Category.collection.dropIndex('name_1');
    res.json({ message: "Index 'name_1' dropped successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryIndexes = async (req, res) => {
  try {
    const indexes = await Category.collection.indexes();
    res.json(indexes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
