import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const CancelOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchCancelled = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/cancel/list");

      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async (email, orderId) => {
    try {
      await axios.post(backendUrl + "/api/cancel/email", {
        email,
        orderId,
      });

      alert("Email Sent!");
    } catch (error) {
      console.log(error);
    }
  };

  const restoreOrder = async (orderId) => {
    try {
      await axios.post(backendUrl + "/api/cancel/restore", {
        orderId,
      });

      fetchCancelled();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCancelled();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Cancelled Orders
        </h1>
        <p className="text-gray-500 mt-2">
          Manage cancelled orders and customer recovery actions
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* TOP */}
            <div className="p-5 border-b bg-red-50">
              <h2 className="font-bold text-lg text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>

              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                CANCELLED
              </span>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-3">
              <div className="text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  📧 <span>{order?.address?.email}</span>
                </p>

                <p className="flex items-center gap-2 mt-1">
                  📱 <span>{order?.address?.phone}</span>
                </p>
              </div>

              {/* ITEMS */}
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                {order?.items?.map((item, i) => (
                  <span key={i}>
                    {item.name} × {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              {/* AMOUNT */}
              <div className="text-lg font-bold text-gray-800">
                ৳ {order.amount}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="p-5 flex gap-3">
              <button
                onClick={() => sendEmail(order?.address?.email, order._id)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition"
              >
                Send Email
              </button>

              <button
                onClick={() => restoreOrder(order._id)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium transition"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {orders?.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          No cancelled orders found
        </div>
      )}
    </div>
  );
};

export default CancelOrders;
