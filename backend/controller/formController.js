import FormModel from "../models/formModel.js";

// =======================
// 1. Submit Contact Form
// =======================
export const formController = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newForm = new FormModel({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newForm.save();

    res.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Form submission failed",
    });
  }
};

// =======================
// 2. Show All Form Data (Admin)
// =======================
export const showFormDataAdmin = async (req, res) => {
  try {
    const data = await FormModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Failed to fetch data",
    });
  }
};
