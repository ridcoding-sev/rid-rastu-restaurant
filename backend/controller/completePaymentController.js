import OrderModel from "../models/orderModle.js";

// =============================
// COD ORDERS
// =============================
export const getCODOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      paymentMethod: "COD",
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// ONLINE PAID ORDERS
// =============================
export const getOnlinePaidOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      paymentMethod: "Stripe",
      payment: true, // only successful payment
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
