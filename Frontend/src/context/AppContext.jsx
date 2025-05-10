import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const API_URL = "http://localhost:5000/api";

export const AppProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [billsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/bills`),
        axios.get(`${API_URL}/categories`),
      ]);

      setBills(billsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRecentBills();
  }, []);

  const addBill = async (bill) => {
    try {
      const res = await axios.post(`${API_URL}/bills`, bill);
      setBills([res.data, ...bills]);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const fetchRecentBills = async () => {
    try {
      const res = await axios.get(`${API_URL}/bills/recent`);
      return res.data;
    } catch (err) {
      console.error("Error fetching recent bills:", err);
    }
  };

  const deleteBill = async (id) => {
    try {
      await axios.delete(`${API_URL}/bills/${id}`);
      setBills(bills.filter((bill) => bill._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const addCategory = async (category) => {
    try {
      const res = await axios.post(`${API_URL}/categories`, category);
      setCategories([...categories, res.data]);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const renameCategory = async (id, newName) => {
    try {
      const res = await axios.put(`${API_URL}/categories/${id}`, {
        name: newName,
      });
      setCategories(categories.map((cat) => (cat._id === id ? res.data : cat)));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const getSpendingByCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/bills/spending`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const getExpensesCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/bills/count/expenses`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const fetchPagedBills = async (page = 1, limit = 5) => {
    try {
      const res = await axios.get(`${API_URL}/bills/paged?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        bills,
        categories,
        loading,
        error,
        addBill,
        fetchRecentBills,
        deleteBill,
        addCategory,
        renameCategory,
        deleteCategory,
        getSpendingByCategory,
        fetchPagedBills,
        getExpensesCount,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
