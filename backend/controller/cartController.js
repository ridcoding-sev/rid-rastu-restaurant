import UserModel from "../models/userModels.js";

// ==========================================
// ADD TO CART
// ==========================================
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await UserModel.findById(userId);

    let cartData = userData.cartData;

    // item exists
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    }
    // new item
    else {
      cartData[itemId] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Item Added To Cart",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// REMOVE FROM CART
// ==========================================
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await UserModel.findById(userId);

    let cartData = userData.cartData;

    // item quantity decrease
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await UserModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Item Removed From Cart",
      cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET CART DATA  /fetch user cart data
// ==========================================
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await UserModel.findById(userId);

    res.json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
