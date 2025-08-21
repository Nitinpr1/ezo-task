import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
