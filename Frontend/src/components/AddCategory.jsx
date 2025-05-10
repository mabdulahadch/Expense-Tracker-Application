import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

const AddCategory = () => {
  const { addCategory } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense'
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
      await addCategory(formData);
      setFormData({
        name: '',
        type: 'expense'
      });
    } catch (err) {
      alert('Error adding category: ' + err.message);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Add Category</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;