import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const CompletePayment = () => {
  const [activeTab, setActiveTab] = useState("cod");
  const [codOrders, setCodOrders] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);

  // =========================
  // FETCH COD ORDERS
  // =========================
  const fetchCOD = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/payment/cod");

      if (res.data.success) {
        setCodOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FETCH ONLINE PAID ORDERS
  // =========================
  const fetchOnline = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/payment/online");

      if (res.data.success) {
        setOnlineOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCOD();
    fetchOnline();
  }, []);

  // =========================
  // UI CARD
  // =========================
  const OrderCard = ({ order }) => (
    <div className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-gray-800">
          Order #{order._id.slice(-5)}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            order.paymentMethod === "COD"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {order.paymentMethod}
        </span>
      </div>

      <p className="text-gray-600 text-sm">
        {order.items.map((item, i) => (
          <span key={i}>
            {item.name} × {item.quantity}
            {i !== order.items.length - 1 && ", "}
          </span>
        ))}
      </p>

      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">৳ {order.amount}</h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold
          ${
            order.payment
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.payment ? "Paid" : "Pending"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Payment Dashboard
      </h1>

      {/* TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("cod")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all
          ${
            activeTab === "cod" ? "bg-orange-500 text-white" : "bg-white border"
          }`}
        >
          COD Orders
        </button>

        <button
          onClick={() => setActiveTab("online")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all
          ${
            activeTab === "online"
              ? "bg-green-500 text-white"
              : "bg-white border"
          }`}
        >
          Online Paid
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "cod" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {codOrders.length === 0 ? (
            <p>No COD orders</p>
          ) : (
            codOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {onlineOrders.length === 0 ? (
            <p>No Online Paid orders</p>
          ) : (
            onlineOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CompletePayment;
