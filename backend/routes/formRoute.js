import express from "express";
import { formController, showFormDataAdmin } from "../controller/formController.js";

const formRouter = express.Router();

// Submit form
formRouter.post("/submit", formController);

// Admin - get all messages
formRouter.get("/list", showFormDataAdmin);

export default formRouter;