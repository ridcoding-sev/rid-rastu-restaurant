import React, { useContext } from "react";
import { StoreContext,backendUrl } from "../context/ShoreContext";
import { assets } from "../assets/asset";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { 
    Food_item,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

const cartArray = (Food_item || []).filter(
  (item) => (cartItems || {})[item._id] > 0
);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h2>

        {/* Empty Cart */}
        {cartArray.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <img
              src={assets.CartIcon}
              alt="empty"
              className="w-20 mx-auto mb-4 opacity-50"
            />
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid gap-4">

            {/* Cart Items */}
            {cartArray.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4"
              >

                {/* Image + Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                 <img
                   src={backendUrl + "/images/" + item.image}
                  alt={item.name}
                   className="w-20 h-20 rounded-lg object-cover"
                   />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ৳ {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-medium">
                    {cartItems[item._id]}
                  </span>

                  <button
                    onClick={() => addToCart(item._id)}
                    className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="font-semibold text-gray-800">
                  ৳ {item.price * cartItems[item._id]}
                </div>

              </div>
            ))}

            {/* Total Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-8 border border-gray-100">

              <h3 className="text-xl font-bold text-gray-800 mb-5">
                Order Summary
              </h3>

              <hr className="border-gray-200 mb-5" />

              <div className="flex justify-between text-gray-600 mb-3">
                <span>Total Item Price</span>
                <span>৳ {totalAmount}</span>
              </div>

              <div className="flex justify-between text-gray-600 mb-3">
                <span>Delivery Charge</span>
                <span>৳ 100</span>
              </div>

              <hr className="border-dashed border-gray-300 my-4" />

              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total Amount</span>
                <span className="text-orange-600">
                  ৳ {totalAmount + 100}
                </span>
              </div>

              <button
              onClick={()=>navigate('/order')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold">
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;