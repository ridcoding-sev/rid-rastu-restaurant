import React, { useContext, useEffect } from "react";
import Cart from "../pages/Cart";
import { StoreContext } from "../context/ShoreContext";

const CartDrawer = () => {
  const { cartOpen, setCartOpen } = useContext(StoreContext);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cartOpen]);

  return (
    <div className="z-[9999]">
      {/* Background Overlay - Opacity কমানো হয়েছে */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-20 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-[90%] sm:w-[420px] bg-white shadow-2xl 
          transition-transform duration-300 ease-in-out z-[10000]
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-3xl font-light hover:text-gray-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div className="h-[calc(100vh-73px)] overflow-y-auto p-5">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;