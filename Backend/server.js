import connectDB from "./DB/connection.js";

import express from "express";
import cors from "cors";

import billRoutes from "./Routes/Bill.routes.js";
import categoryRoutes from "./Routes/Categories.routes.js";
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/bills", billRoutes);
app.use("/api/categories", categoryRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
