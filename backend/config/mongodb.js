import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("DB Connected");

  } catch (error) {
    console.log("MongoDB Error:", error.message);
    throw error;
  }
};

export default connectDB;