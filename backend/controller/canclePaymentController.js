import OrderModel from "../models/orderModle.js";

// ==============================
// GET CANCELLED ORDERS
// ==============================
export const getCancelledOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      $or: [{ status: "Cancelled" }, { paymentStatus: "Failed" }],
    }).populate("userId");

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// for send the email sothat user can order it again
// =============================

export const sendCancelEmail = async (req, res) => {
  try {
    const { email, orderId } = req.body;

    // এখানে real email service (nodemailer / sendgrid) লাগবে
    console.log(`Email sent to ${email} for order ${orderId}`);

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// cart information remain same sothat the user can get cart again

export const restoreOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await OrderModel.findByIdAndUpdate(orderId, {
      status: "Food Processing",
      cancelStatus: false,
      paymentStatus: "Pending",
    });

    res.json({
      success: true,
      message: "Order restored",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
