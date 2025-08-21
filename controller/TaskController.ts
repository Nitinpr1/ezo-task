import { Request, Response } from "express";
import Task from "../models/Task";

// Create task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ success: false, message: `All fields are required.` });
        }

        const task = await Task.create({ title, description, status });

        return res.status(201).json({ success: true, message: `Task created successfully` });

    } catch (error) {
        console.log('createTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    try {

        const tasks = await Task.find();

        return res.json({ success: true, data: tasks });

    } catch (error) {
        console.log('getTasks error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Get single task
export const getTask = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ success: true, data: task });

    } catch (error) {
        console.log('getTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ success: false, message: `All fields are required.` });
        }
        let update_fields = {
            title, description, status
        };
        const task = await Task.findByIdAndUpdate(req.params.id, update_fields);

        if (!task) return res.status(404).json({ message: "Task not found" });

        return res.status(200).json({ success: true, message: `Task updated successfully` });

    } catch (error) {
        console.log('updateTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        return res.json({ success: true, message: "Task deleted successfully" });

    } catch (error) {
        console.log('deleteTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};
