import React, { useState, useContext } from "react";
import { assets } from "../assets/asset";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/ShoreContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const { getTotalCartCount, token, setToken } = useContext(StoreContext);

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
    setVisible(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="relative z-[80] bg-white border-b border-gray-200 shadow-sm m-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <img
                src={assets.logo}
                alt="Logo"
                className="w-[70px] h-auto rounded-2xl"
              />
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

              {[
                { name: "HOME", path: "/" },
                { name: "MENU", path: "/menu" },
                { name: "ABOUT", path: "/about" },
                { name: "CONTACT", path: "/contact" },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative py-2 transition-all duration-300 ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-orange-600 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}

            </div>

            {/* Right Side Icons & Button */}
            <div className="flex items-center gap-3 sm:gap-4">

              {/* Search Icon */}
              <NavLink
                to="/menu"
                className="p-2 w-10 rounded-full hover:bg-orange-50 transition-colors"
              >
                <img src={assets.SearchImage} alt="Search" />
              </NavLink>

              {/* Cart Icon */}
              <NavLink
                to="/cart"
                className="relative w-10 p-2 rounded-full hover:bg-orange-50 transition-colors"
              >
                <img src={assets.CartIcon} alt="Cart" />

                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {getTotalCartCount()}
                </span>
              </NavLink>

              {/* Sign In / Profile */}
              {!token ? (
                <NavLink to="/login">
                  <button className="hidden sm:block px-6 py-2 text-sm font-semibold border border-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">
                    LOGIN
                  </button>
                </NavLink>
              ) : (
                <div className="relative group hidden sm:block">

                  {/* Profile Icon */}
                  <img
                    src={assets.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:border-orange-500 transition"
                  />

                  {/* Profile Dropdown */}
                  <ul
                    className="absolute right-0 top-full mt-2 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-[100] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    <li
                      onClick={() => navigate("/myorders")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition"
                    >
                      <img src={assets.Order} className="w-5 h-5" alt="" />
                      <span>Orders</span>
                    </li>

                    <li
                      onClick={logoutHandler}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition text-red-500"
                    >
                      <img src={assets.logout} className="w-5 h-5" alt="" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setVisible(true)}
                className="sm:hidden p-2 rounded-lg hover:bg-orange-50 transition"
              >
                <img
                  src={assets.MobileMenuImage}
                  className="w-6"
                  alt="Menu"
                />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={() => setVisible(false)}
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[100] w-full max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-orange-50">

          <div className="flex items-center gap-3">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-12 rounded-xl"
            />

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                RASTU
              </h2>
              <p className="text-xs text-gray-500">
                Delicious Food
              </p>
            </div>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="w-9 h-9 rounded-full bg-white shadow-sm text-gray-700 text-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition"
          >
            ×
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-2 p-5">

          {[
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`
              }
            >
              {item.name}
              <span>›</span>
            </NavLink>
          ))}

          {/* Mobile Orders */}
          {token && (
            <button
              onClick={() => {
                navigate("/myorders");
                setVisible(false);
              }}
              className="flex items-center justify-between px-5 py-4 rounded-xl text-gray-700 font-medium hover:bg-orange-50 hover:text-orange-600 transition"
            >
              My Orders
              <span>›</span>
            </button>
          )}

        </div>

        {/* Mobile Login / Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-white">

          {!token ? (
            <button
              onClick={() => {
                navigate("/login");
                setVisible(false);
              }}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-orange-600 transition-all duration-300"
            >
              LOGIN
            </button>
          ) : (
            <button
              onClick={logoutHandler}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold shadow-md hover:from-red-600 hover:to-red-500 active:scale-95 transition-all duration-300"
            >
              LOGOUT
            </button>
          )}

        </div>

      </div>
    </>
  );
};

export default Navbar;