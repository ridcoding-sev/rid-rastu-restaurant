import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  foodCount,
} from "../controller/foodController.js";

import upload from "../middleware/multer.js";

// Create Router
const foodRouter = express.Router();

// Add Food
foodRouter.post("/add", upload.single("image"), addFood);

// List Food
foodRouter.get("/list", listFood);

// Remove Food
foodRouter.delete("/remove", removeFood);

// Food Count
foodRouter.get("/count", foodCount);

export default foodRouter;