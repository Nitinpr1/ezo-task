import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to DB successfully");
        return { success: true, message: `Connected to DB successfully` }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectToDB;
