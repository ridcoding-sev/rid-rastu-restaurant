import React, { useState, useContext,useEffect } from "react";
import { StoreContext } from "../context/ShoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const { getTotalCartAmount, backendUrl, cartItems, token, Food_item } =
    useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "", 
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItem = [];

    Food_item.forEach((item) => {
      const qty = cartItems[item._id];

      if (qty && qty > 0) {
        // ✅ CLEAN & SAFE STRUCTURE
        orderItem.push({
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: qty,
        });
      }
    });

    let orderData = {
      address: formData,
      items: orderItem,
      amount: getTotalCartAmount() + 100,
      paymentMethod: paymentMethod,
    };

    try {
      let response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {  headers: { Authorization: `Bearer ${token}`} }
      );

      if (response.data.success) {
        // ✅ SAFE REDIRECT (NO NULL CRASH)

        if (paymentMethod === "Stripe") {
          if (response.data.session_url) {
            window.location.replace(response.data.session_url);
           console.log(response.data);
          } else {
            alert("Stripe session missing");
          }
        } else {
                   navigate("/myorders");        }
      } else {
        alert(response.data.message || "Order failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };
    const navigate = useNavigate();

  useEffect(() => {
  if (!token) {
    navigate("/cart");
  } else if (getTotalCartAmount() === 0) {
    navigate("/cart");
  }
}, [token, navigate, getTotalCartAmount]);
     
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Delivery Information
          </h2>

          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <input
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              value={formData.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              value={formData.street}
              name="street"
              onChange={handleChange}
              placeholder="Street Address"
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={formData.city}
                name="city"
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={formData.country}
                name="country"
                onChange={handleChange}
                placeholder="Country"
                required
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <input
              value={formData.zip}
              name="zip"
              onChange={handleChange}
              placeholder="Zip Code"
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* SUMMARY */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            <div className="flex justify-between mb-3">
              <span>Items Total</span>
              <span>{getTotalCartAmount()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Delivery Fee</span>
              <span>৳ 100</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>৳ {getTotalCartAmount() + 100}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">Payment Method</h2>

            <div
              onClick={() => setPaymentMethod("COD")}
              className={`border p-4 rounded-xl cursor-pointer ${
                paymentMethod === "COD" ? "border-orange-500" : ""
              }`}
            >
              Cash On Delivery
            </div>

            <div
              onClick={() => setPaymentMethod("Stripe")}
              className={`border p-4 rounded-xl cursor-pointer mt-3 ${
                paymentMethod === "Stripe" ? "border-orange-500" : ""
              }`}
            >
              Stripe Payment
            </div>

            <button
              type="button"
              onClick={placeOrder}
              className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;