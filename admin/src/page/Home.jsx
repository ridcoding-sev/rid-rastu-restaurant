import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import OrderGraph from "../components/OrderGraph";
const Home = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DASHBOARD DATA
  // =========================
  const fetchStats = async () => {
    try {
      const [userRes, orderRes, foodRes] = await Promise.all([
        axios.get(backendUrl + "/api/user/count"),
        axios.get(backendUrl + "/api/order/count"),
        axios.get(backendUrl + "/api/food/count"),
      ]);

      setStats({
        users: userRes.data.totalUsers || 0,
        orders: orderRes.data.totalOrders || 0,
        products: foodRes.data.totalProducts || 0,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Manage your store efficiently.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center text-gray-500 py-20">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* USERS */}
            <div className="bg-white rounded-3xl shadow-md p-6 border hover:shadow-xl transition">
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {stats.users}
              </h2>
            </div>

            {/* ORDERS */}
            <div className="bg-white rounded-3xl shadow-md p-6 border hover:shadow-xl transition">
              <p className="text-gray-500">Total Orders</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {stats.orders}
              </h2>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-3xl shadow-md p-6 border hover:shadow-xl transition">
              <p className="text-gray-500">Total Products</p>
              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {stats.products}
              </h2>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <button
                onClick={() => navigate("/add")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition"
              >
                Add Product
              </button>

              <button
                onClick={() => navigate("/list")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition"
              >
                View Products
              </button>

              <button
                onClick={() => navigate("/order")}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition"
              >
                View Orders
              </button>
            </div>
          </div>

          {/* ACTIVITY SECTION */}
          <div className="mt-10 bg-white p-6 rounded-3xl shadow border">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-2 text-gray-600 text-sm">
              <li>✔ New order received</li>
              <li>✔ Product added</li>
              <li>✔ User registered</li>
              <li>✔ Order delivered</li>
            </ul>
          </div>
        </>
      )}
      <OrderGraph />
    </div>
  );
};

export default Home;
