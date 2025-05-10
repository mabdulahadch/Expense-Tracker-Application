import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import AddBill from "./AddBill";
const Dashboard = () => {
  const { bills, fetchRecentBills, getSpendingByCategory, categories, getExpensesCount } = useContext(AppContext);
  const [spending, setSpending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expensesCount, setExpensesCount] = useState(0);
  const [recentBills, setRecentBills] = useState([]);

  useEffect(() => {
    const fetchSpending = async () => {
      setLoading(true);
      try {
        const [spendingData, countData, recentData] = await Promise.all([
          getSpendingByCategory(),
          getExpensesCount(),
          fetchRecentBills()
        ]);
        setSpending(spendingData);
        setExpensesCount(countData.count);
        setRecentBills(recentData);

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSpending();
  }, [bills, getSpendingByCategory]);




  const totalIncome = bills
    .filter((bill) => bill.type === "income")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalExpenses = bills
    .filter((bill) => bill.type === "expense")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Income</h5>
              <p className="card-text h4">Rs {totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Expenses</h5>
              <p className="card-text h4">Rs {totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className={`card text-white mb-3 ${
              balance >= 0 ? "bg-primary" : "bg-warning"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Balance</h5>
              <p className="card-text h4">Rs {balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-dark mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Expenses Count</h5>
              <p className="card-text h4">{expensesCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <AddBill />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Transactions</h5>
              <ul className="list-group">
                {recentBills.map((bill) => (
                  <li
                    key={bill._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{bill.description}</strong>
                      <br />
                      <small
                        className={`text-${
                          bill.type === "income" ? "success" : "danger"
                        }`}
                      >
                        {bill.category?.name}
                      </small>
                    </div>
                    <span
                      className={`badge bg-${
                        bill.type === "income" ? "success" : "danger"
                      } rounded-pill`}
                    >
                      ${bill.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Spending by Category</h5>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul className="list-group">
                  {spending.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {categories.find((cat) => cat._id === item._id)?.name ||
                          "Unknown"}
                      </div>
                      <span className="badge bg-danger rounded-pill">
                        ${item.total.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
