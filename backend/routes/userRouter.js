import express from "express";
import { registerUser, loginUser,userCount } from "../controller/userController.js";

const userRouter = express.Router();

// ==========================
// AUTH ROUTES
// ==========================
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/count",userCount);

export default userRouter;