import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/db";
import taskRoutes from "./router/TaskRouter";
import userRoutes from "./router/UserRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
