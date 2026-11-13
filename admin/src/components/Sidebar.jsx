import React from "react";
import { NavLink } from "react-router-dom";
import { asserts } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r shadow-lg px-4 py-6">
      {/* Logo / Title */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-sm text-gray-500">Dashboard Management</p>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.addIcone} alt="" />
          <p className="font-medium">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.oderList} alt="" />
          <p className="font-medium">List Items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.oderIcone} alt="" />
          <p className="font-medium">Orders</p>
        </NavLink>

        <NavLink
          to="/completeprement"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.oderIcone} alt="" />
          <p className="font-medium">Complete payment</p>
        </NavLink>

        <NavLink
          to="/canclepayment"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.oderIcone} alt="" />
          <p className="font-medium">cancle payment</p>
        </NavLink>

        <NavLink
          to="/formlist"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300
            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={asserts.oderIcone} alt="" />
          <p className="font-medium">Contact</p>
        </NavLink>
      </div>

      {/* Bottom */}
      <div className="mt-auto pt-8">
        <div className="bg-gray-100 rounded-2xl p-4">
          <p className="font-semibold text-gray-700">Welcome Admin 👋</p>
          <p className="text-sm text-gray-500 mt-1">
            Manage your products and orders easily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
