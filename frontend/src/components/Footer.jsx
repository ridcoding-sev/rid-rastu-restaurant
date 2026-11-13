import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/asset";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <img src={assets.logo} alt="logo" className="w-16 mb-3 rounded-lg" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Fresh and delicious food delivered to your doorstep.
              Taste the best biriyani and fast food with premium quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className="hover:text-orange-500">Home</NavLink></li>
              <li><NavLink to="/menu" className="hover:text-orange-500">Menu</NavLink></li>
              <li><NavLink to="/about" className="hover:text-orange-500">About</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-orange-500">Contact</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/cart" className="hover:text-orange-500">Cart</NavLink></li>
              <li><NavLink to="/myorders" className="hover:text-orange-500">Orders</NavLink></li>
              <li><NavLink to="/verify" className="hover:text-orange-500">Verify</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">
              Barishal, Bangladesh<br />
              Email: support@foodapp.com<br />
              Phone: +880 1XXXXXXXXX
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} FoodApp. All rights reserved.
          </p>

          {/* Social Icons (simple style) */}
          <div className="flex gap-4 text-sm">
            <span className="hover:text-orange-500 cursor-pointer">Facebook</span>
            <span className="hover:text-orange-500 cursor-pointer">Instagram</span>
            <span className="hover:text-orange-500 cursor-pointer">YouTube</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;