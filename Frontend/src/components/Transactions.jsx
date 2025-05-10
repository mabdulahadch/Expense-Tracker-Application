import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

const Transactions = () => {
  const { deleteBill, fetchPagedBills } = useContext(AppContext);
  const [pagedBills, setPagedBills] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5; // You can adjust the limit as needed
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadBills = async () => {
      try {
        const data = await fetchPagedBills(page, limit);
        setPagedBills(data);
        setHasMore(data.length === limit); // assume no more if less than limit
      } catch (err) {
        alert('Error loading paged bills: ' + err.message);
      }
    };

    loadBills();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteBill(id);
        // Remove from local state
        setPagedBills(prev => prev.filter(bill => bill._id !== id));
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
                    {pagedBills.map(bill => (
                      <tr key={bill._id}>
                        <td>{new Date(bill.date).toLocaleDateString()}</td>
                        <td>{bill.description}</td>
                        <td>{bill.category.name}</td>
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

              {/* Pagination Controls */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page}</span>
                <button 
                  className="btn btn-primary"
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={!hasMore}
                >
                  Next
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
