import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controller/cartController.js";

const cartRouter = express.Router();


// ADD TO CART
cartRouter.post("/add",authMiddleware, addToCart);


// REMOVE FROM CART
cartRouter.post("/remove",authMiddleware, removeFromCart);


// GET CART
cartRouter.post("/get",authMiddleware, getCart);


export default cartRouter;