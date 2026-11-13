import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/ShoreContext";
import axios from "axios";

const MyOrder = () => {
  const [data, setData] = useState([]);
  const { backendUrl, token } = useContext(StoreContext);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Orders
      </h1>

      {/* ORDERS LIST */}
      <div className="flex flex-col gap-6">

        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-5">

                {/* LEFT SIDE */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Order #{index + 1}
                  </h2>

                  <p className="text-gray-600">
                    {Array.isArray(order.items) &&
                      order.items.map((item, i) => (
                        <span key={i}>
                          {item.name} × {item.quantity}
                          {i !== order.items.length - 1 && ", "}
                        </span>
                      ))}
                  </p>

                  <p className="mt-3 text-gray-500 text-sm">
                    Date:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-start md:items-end gap-2">

                  <h3 className="text-xl font-bold text-green-600">
                    ৳ {order.amount}
                  </h3>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>

                  <button
                    onClick={fetchOrders}
                    className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Refresh
                  </button>

                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No orders found
          </p>
        )}

      </div>
    </div>
  );
};

export default MyOrder;