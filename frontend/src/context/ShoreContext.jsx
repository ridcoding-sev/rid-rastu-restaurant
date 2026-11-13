import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);
export const backendUrl = import.meta.env.VITE_BACKEND_URI;

const StoreContextProvider = ({ children }) => {
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [token, setToken] = useState("");
  const [Food_item, setFoodItem] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  // Add To Cart
  // Add To Cart
const addToCart = async (itemId) => {

  // Check Login First
  if (!token) {
    setShowLoginPopup(true);
    return;
  }

  // Add Item To Cart
  setCartItems((prev) => ({
    ...prev,
    [itemId]: (prev[itemId] || 0) + 1,
  }));

  try {
    await axios.post(
      backendUrl + "/api/cart/add",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.log(error);
  }

  setCartOpen(true);
};

  // Remove From Cart (FIXED: no negative value bug)
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token) {
      await axios.post(
        backendUrl + "/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  // Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    Food_item?.forEach((item) => {
      if ((cartItems?.[item._id] || 0) > 0) {
        totalAmount += item.price * cartItems[item._id];
      }
    });

    return totalAmount;
  };

  const getTotalCartCount = () => {
    let totalCount = 0;

    Object.keys(cartItems || {}).forEach((id) => {
      totalCount += cartItems[id];
    });

    return totalCount;
  };


  // Fetch Food List (FIXED: try/catch added)
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/food/list");
      setFoodItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Cart Data (FIXED: try/catch added)
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
          setCartItems(response.data?.cartData || {});
    } catch (error) {
      console.log(error);
    }
  };

  // Load on start
  useEffect(() => {
    fetchFoodList();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    Food_item,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    category,
    setCategory,
    getTotalCartAmount,
    getTotalCartCount,
    cartOpen,
    setCartOpen,
    backendUrl,
    token,
    setToken,
    showLoginPopup,
   setShowLoginPopup,
  };

  return (
    <StoreContext.Provider value={contextValue}>
{children}

{/* Login Popup */}
{showLoginPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">

      <div className="mb-4 text-5xl">
        🔒
      </div>

      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        Login First!
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Please login first to add items to your cart.
      </p>

      <button
        onClick={() => {
          window.location.href = "/login";
        }}
        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Login Now
      </button>

      <button
        onClick={() => setShowLoginPopup(false)}
        className="mt-3 w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
      >
        Cancel
      </button>

    </div>

  </div>
)}    </StoreContext.Provider>
  );
};

export default StoreContextProvider;