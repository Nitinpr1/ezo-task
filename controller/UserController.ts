import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { isValidEmail } from "../helper/helper";


export const userRegister = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: `All fields are required` });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: `Invalid email` });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User registered successfully" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ success: true, message: `User registration successfully.` });

    } catch (error) {
        console.log('userRegister error', error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true, message: "Login successful.", token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("userLogin error", error);
        return res.status(500).json({ success: false, message: "Oops.! something went wrong." });
    }
};
