import express from "express";
import {
  getCancelledOrders,
  sendCancelEmail,
  restoreOrder,
} from "../controller/canclePaymentController.js";

const cancelRouter = express.Router();

cancelRouter.get("/list", getCancelledOrders);
cancelRouter.post("/email", sendCancelEmail);
cancelRouter.post("/restore", restoreOrder);

export default cancelRouter;