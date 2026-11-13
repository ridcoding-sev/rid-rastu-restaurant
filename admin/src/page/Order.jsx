import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
      );

      if (response.data.success) {
        fetchAllOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="space-y-5">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 border"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* LEFT SIDE */}
              <div>
                <h2 className="font-bold text-lg mb-2">Order #{index + 1}</h2>

                <p className="text-gray-600">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} × {item.quantity}
                      {i !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <div className="mt-3 text-gray-500">
                  <p>
                    <strong>Name:</strong> {order.address.firstName}{" "}
                    {order.address.lastName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.address.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address.street},{" "}
                    {order.address.city}, {order.address.country}
                  </p>

                  {/* ===================== */}
                  {/* NEW: PAYMENT METHOD */}
                  {/* ===================== */}
                  <p className="mt-2 text-gray-600">
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>

                  {/* ===================== */}
                  {/* NEW: ORDER DATE */}
                  {/* ===================== */}
                  <p className="text-gray-400 text-sm mt-1">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <h3 className="text-xl font-bold text-green-600">
                  ৳ {order.amount}
                </h3>

                {/* ===================== */}
                {/* ORDER STATUS */}
                {/* ===================== */}
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Food Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>

                {/* ===================== */}
                {/* NEW: PAYMENT STATUS */}
                {/* ===================== */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>

                {/* STATUS SELECT */}
                <select
                  className="border rounded-lg px-3 py-2"
                  value={order.status}
                  onChange={(event) => statusHandler(event, order._id)}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
