import FoodModel from "../models/foodmodel.js";
import uploadImage from "../utils/uploadImage.js";
import { cloudinary } from "../config/cloudinary.js";

// ================================================//
// ADD FOOD ITEM
// ================================================//

export const addFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      isVeg,
    } = req.body;

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    // Upload image to Cloudinary
    const { imageUrl, imagePublicId } = await uploadImage(
      req.file.buffer
    );

    // Check availability
    const isAvailable =
      req.body.isAvailable === "true" ||
      req.body.isAvailable === true;

    // Create food
    const food = new FoodModel({
      name,
      description,
      price,
      category,
      isVeg,
      isAvailable,
      image: imageUrl,
      imagePublicId: imagePublicId,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food,
    });

  } catch (error) {
    console.log("Add Food Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================================================//
// LIST FOOD
// ================================================//

export const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});

    res.json({
      success: true,
      data: foods,
    });

  } catch (error) {
    console.log("List Food Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================================================//
// REMOVE FOOD
// ================================================//

export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    // Find food
    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // Delete image from Cloudinary
    if (food.imagePublicId) {
      const result = await cloudinary.uploader.destroy(
        food.imagePublicId,
        {
          resource_type: "image",
        }
      );

      // Check Cloudinary deletion result
      if (
        result.result !== "ok" &&
        result.result !== "not found"
      ) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete image from Cloudinary",
        });
      }
    }

    // Delete food from MongoDB
    await FoodModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Food deleted successfully",
    });

  } catch (error) {
    console.log("Remove Food Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================================================//
// TOTAL FOOD COUNT
// ================================================//

export const foodCount = async (req, res) => {
  try {
    const totalProducts = await FoodModel.countDocuments();

    res.json({
      success: true,
      totalProducts,
    });

  } catch (error) {
    console.log("Food Count Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
