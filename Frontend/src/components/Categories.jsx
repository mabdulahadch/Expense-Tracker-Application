import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import AddCategory from './AddCategory';

const Categories = () => {
  const { categories, renameCategory, deleteCategory } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleRename = async (id, currentName) => {
    if (editingId === id) {
      try {
        await renameCategory(id, editName);
        setEditingId(null);
        setEditName('');
      } catch (err) {
        alert('Error renaming category: ' + err.message);
      }
    } else {
      setEditingId(id);
      setEditName(currentName);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (err) {
        alert('Error deleting category: ' + err.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Categories</h2>
      <div className="row">
        <div className="col-md-6">
          <AddCategory />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Categories</h5>
              <ul className="list-group">
                {categories.map(cat => (
                  <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {editingId === cat._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      <span>
                        {cat.name} <span className={`badge bg-${cat.type === 'income' ? 'success' : 'danger'}`}>
                          {cat.type}
                        </span>
                      </span>
                    )}
                    <div>
                      <button 
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleRename(cat._id, cat.name)}
                      >
                        {editingId === cat._id ? 'Save' : 'Edit'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(cat._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;