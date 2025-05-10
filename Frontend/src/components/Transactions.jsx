import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Transactions = () => {
  const { bills, deleteBill } = useContext(AppContext);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteBill(id);
      } catch (err) {
        alert('Error deleting transaction: ' + err.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transactions</h2>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map(bill => (
                      <tr key={bill._id}>
                        <td>{new Date(bill.date).toLocaleDateString()}</td>
                        <td>{bill.description}</td>
                        <td>{bill.category?.name || 'Unknown'}</td>
                        <td>
                          <span className={`badge bg-${bill.type === 'income' ? 'success' : 'danger'}`}>
                            {bill.type}
                          </span>
                        </td>
                        <td>${bill.amount.toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(bill._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;