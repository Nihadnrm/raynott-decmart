import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Raynott <span className="text-gray-400">DecMart</span>
          </h2>
          <p className="text-gray-400">
            Your trusted online grocery marketplace providing fresh and quality
            essentials at the best prices.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex mt-4 gap-4 text-xl">
            <a href="#" className="hover:text-white"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#" className="hover:text-white"><i className="fa-solid fa-phone"></i></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/allproducts" className="hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/myorders" className="hover:text-white">My Orders</Link></li>
            <li><Link to="/admin" className="hover:text-white">admin</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-3">Get fresh grocery deal updates.</p>

         
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 border-t border-gray-800 mt-10 pt-5">
        © {new Date().getFullYear()} Raynott DecMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
