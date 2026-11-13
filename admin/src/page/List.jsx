import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const List = () => {
  const [list, setList] = useState([]);

  // =========================
  // FETCH PRODUCT LIST
  // =========================
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/food/list");

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + "/api/food/remove", {
        data: { id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full p-4 md:p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>

        <p className="text-gray-500 mt-2">Manage all available products</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-5 font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-center">Remove</p>
        </div>

        {/* Products */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center px-8 py-5 border-b hover:bg-gray-50 transition-all duration-300"
          >
            <img
              className="w-16 h-16 rounded-2xl object-cover shadow"
              src={item.image}
              alt={item.name}
            />

            <p className="font-semibold text-gray-700 truncate">{item.name}</p>

            <p className="text-gray-600">{item.category}</p>

            <p className="font-medium">${item.price}</p>

            <p
              className={`font-semibold ${
                item.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.available ? "Available" : "Out"}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xl transition"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile + Tablet Cards */}
      <div className="lg:hidden space-y-5">
        {list.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-5 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-2xl object-cover shadow"
                src={backendUrl + "/images/" + item.image}
                alt=""
              />

              <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>

                <p className="text-gray-500">{item.category}</p>

                <p className="mt-2 font-semibold">${item.price}</p>

                <p
                  className={`mt-1 font-semibold ${
                    item.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.available ? "Available" : "Out"}
                </p>
              </div>

              <button
                onClick={() => removeProduct(item._id)}
                className="w-11 h-11 rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xl transition"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
