import express from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controller/TaskController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
