import { Request, Response } from "express";
import Task from "../models/Task";

// Create task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.body;

        //@ts-ignore
        let user_id = req.user.id;

        if (!user_id) {
            return res.status(400).json({ success: false, message: `Please log in to create task.` });
        }

        if (!title || !description || !status) {
            return res.status(400).json({ success: false, message: `All fields are required.` });
        }

        await Task.create({ title, description, status, created_by: user_id });

        return res.status(201).json({ success: true, message: `Task created successfully` });

    } catch (error) {
        console.log('createTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        let user_id = req.user.id;

        let tasks: string[] = [];

        if (user_id) {
            tasks = await Task.find({ created_by: user_id });
        } else {
            tasks = await Task.find(); // if no user id  then return all tasks
        }

        return res.json({ success: true, data: tasks });

    } catch (error) {
        console.log('getTasks error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Get single task
export const getTask = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        let user_id = req.user.id;

        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }
        const task = await Task.findOne({
            _id: req.params.id,
            created_by: user_id
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
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
        //@ts-ignore
        let user_id = req.user.id;

        if (!user_id) {
            return res.status(400).json({ success: false, message: `Please log in to update task.` });
        }

        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ success: false, message: `All fields are required.` });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (task.created_by.toString() !== user_id.toString()) {
            return res.status(403).json({ success: false, message: "You are not allowed to update this task." });
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.updated_by = user_id;

        await task.save();

        return res.status(200).json({ success: true, message: `Task updated successfully` });

    } catch (error) {
        console.log('updateTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
    try {

        //@ts-ignore
        let user_id = req.user.id;

        if (!user_id) {
            return res.status(400).json({ success: false, message: `Please log in to update task.` });
        }

        if (!req.params.id) {
            return res.status(400).json({ success: false, message: `Task id is required` });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (task.created_by.toString() !== user_id.toString()) {
            return res.status(403).json({ success: false, message: "You are not allowed to delete this task." });
        }

        await Task.deleteOne({ _id: req.params.id });

        return res.json({ success: true, message: "Task deleted successfully" });

    } catch (error) {
        console.log('deleteTask error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};
