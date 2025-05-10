import connectDB from "./DB/connection.js";

import express from "express";
import cors from "cors";

import billRoutes from "./Routes/Budget.routes.js";
import categoryRoutes from "./Routes/Categories.routes.js";
import budgetRoutes from "./Routes/Budget.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bills", billRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budgets", budgetRoutes);

// Error handling

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
