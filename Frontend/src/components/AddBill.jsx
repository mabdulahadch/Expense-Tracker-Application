import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

const AddBill = () => {
  const { categories, addBill } = useContext(AppContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBill({
        ...formData,
        amount: parseFloat(formData.amount),
        category: formData.category || categories.find(c => c.type === formData.type)?._id
      });
      setFormData({
        description: '',
        amount: '',
        type: '',
        category: ''
      });
    } catch (err) {
      alert('Error adding bill: ' + err.message);
    }
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add Transaction</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <select 
              className="form-select" 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="mb-3">
            <select 
              className="form-select" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {filteredCategories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddBill;