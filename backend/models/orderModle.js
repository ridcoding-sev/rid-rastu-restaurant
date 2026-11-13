import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },

        name: {
          type: String,
        },

        price: {
          type: Number,
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      country: String,
      zip: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Stripe"],
      default: "COD",
    },

    // =========================
    // EXISTING PAYMENT STATUS
    // =========================
    payment: {
      type: Boolean,
      default: false,
    },

    // =========================
    // 🔥 NEW ADDED FIELDS
    // =========================

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Cancelled"],
      default: "Pending",
    },

    stripePaymentId: {
      type: String,
      default: "",
    },

    cancelStatus: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Food Processing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Food Processing",
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
