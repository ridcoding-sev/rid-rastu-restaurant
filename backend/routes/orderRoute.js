import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder,verifyOrder,userOrder,listOrder,updateStatus,orderCount,orderChartData } from "../controller/orderController.js";

const orderRouter = express.Router();

// Place Order
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrder);
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)
orderRouter.get("/count",orderCount)
orderRouter.get("/chart", orderChartData);
export default orderRouter;