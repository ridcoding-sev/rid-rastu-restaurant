import React, { useState, useContext } from "react";
import { asserts } from "../assets/assets";
import { useNavigate, NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { setToken, setRole } = useContext(AdminContext);

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  setToken("");
  setRole("");

  setVisible(false);

  navigate("/login", { replace: true });
};


  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-[5%] py-3">
          {/* Logo */}
          <NavLink to="/">
            <img className="w-[85px] rounded-3xl" src={asserts.logo} alt="" />
          </NavLink>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Desktop Logout */}

            <button
              onClick={logout}
              className="hidden md:flex px-6 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-gray-900 to-gray-700 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setVisible(true)}
            >
              <img className="w-7" src={asserts.dropdown} alt="" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setVisible(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white z-50 shadow-2xl transition-all duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Dashboard Menu</p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl"
          >
            ×
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 p-4">
          <NavLink
            to="/add"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.addIcone} alt="" />
            <p>Add Items</p>
          </NavLink>

          <NavLink
            to="/list"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.oderList} alt="" />
            <p>List Items</p>
          </NavLink>

          <NavLink
            to="/order"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.oderIcone} alt="" />
            <p>Orders</p>
          </NavLink>

          <NavLink
            to="/completeprement"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.oderIcone} alt="" />
            <p>Complete payment</p>
          </NavLink>

          <NavLink
            to="/canclepayment"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.oderIcone} alt="" />
            <p>Cancle payment</p>
          </NavLink>

          <NavLink
            to="/formlist"
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all"
          >
            <img className="w-5" src={asserts.oderIcone} alt="" />
            <p>Contact</p>
          </NavLink>
        </div>

{/* Bottom Logout */}
<div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200">
  <button
    type="button"
    onClick={logout}
    className="flex w-full justify-center px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-gray-900 to-gray-700 shadow-md active:scale-95 transition-all duration-300"
  >
    Logout
  </button>
</div>


      </div>
    </>
  );
};

export default Navbar;
