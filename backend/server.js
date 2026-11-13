import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import dns from "dns";

import connectDB from "./config/mongodb.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import formRouter from "./routes/formRoute.js";
import completePaymentRouter from "./routes/completePaymentRouter.js";
import cancelRouter from "./routes/canclePaymentRoute.js";
import adminRouter from "./routes/adminRouter.js";
import connectCloudinary from "./config/cloudinary.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/form", formRouter);
app.use("/api/payment", completePaymentRouter);
app.use("/api/cancel", cancelRouter);
app.use("/api/admin", adminRouter);

// Static images
app.use("/images", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("API Working Successfully");
});

// Server Start
const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();

    await connectCloudinary();

    app.listen(port, () => {
      console.log(`Server started on PORT: ${port}`);
    });

  } catch (error) {
    console.log("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

