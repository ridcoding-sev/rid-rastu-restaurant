import OrderModel from "../models/orderModle.js";
import UserModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================================
// PLACE USER ORDER
// ==========================================
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    // =========================
    // CREATE NEW ORDER
    // =========================
    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,

      // 🔥 NEW FIELDS ADDED SUPPORT
      paymentStatus: "Pending",
      stripePaymentId: "",
    });

    await newOrder.save();

    // clear user cart after order
    await UserModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    // =========================
    // COD PAYMENT
    // =========================
    if (paymentMethod === "COD") {
      await OrderModel.findByIdAndUpdate(newOrder._id, {
        paymentStatus: "Pending",
      });

      return res.json({
        success: true,
        message: "Order Placed Successfully",
        session_url: null,
      });
    }

    // =========================
    // STRIPE PAYMENT
    // =========================
    else if (paymentMethod === "Stripe") {
      const line_items = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      // Delivery Charge
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charge",
          },
          unit_amount: 100 * 100,
        },
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",

        success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
      });

      // 🔥 SAVE STRIPE SESSION ID
      await OrderModel.findByIdAndUpdate(newOrder._id, {
        stripePaymentId: session.id,
        paymentStatus: "Pending",
      });

      return res.json({
        success: true,
        session_url: session.url,
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// VERIFY ORDER (UPDATED)
// ==========================================
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentStatus: "Paid",
        status: "Food Processing",
      });

      return res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, {
        payment: false,
        paymentStatus: "Failed",
        status: "Cancelled", // 🔥 IMPORTANT FIX
      });

      return res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Error",
    });
  }
};

//Showing user oder for frontend

export const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//list of  all order show in admin plane

export const listOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Updating order status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // order update
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }, // updated data return করবে
    );

    // order পাওয়া না গেলে
    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Total order count

export const orderCount = async (req, res) => {
  try {
    const totalOrders = await OrderModel.countDocuments();

    res.json({
      success: true,
      totalOrders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Order &  date is  present on graph in admin plane

export const orderChartData = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    const grouped = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-GB");

      if (!grouped[date]) {
        grouped[date] = 0;
      }

      grouped[date] += 1;
    });

    const result = Object.keys(grouped).map((date) => ({
      date,
      orders: grouped[date],
    }));

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
