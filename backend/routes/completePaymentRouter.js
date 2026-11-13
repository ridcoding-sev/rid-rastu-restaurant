import express from "express";
import {
  getCODOrders,
  getOnlinePaidOrders,
} from "../controller/completePaymentController.js";

const router = express.Router();

// COD Orders
router.get("/cod", getCODOrders);

// ONLINE PAID Orders
router.get("/online", getOnlinePaidOrders);

export default router; 