
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Cloudinary Image Public ID
    imagePublicId: {
      type: String,
      default: "",
    },

    // Cloudinary Image URL
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodModel =
  mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;