import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import national from "../assets/national.png";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-1">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <img src={national} alt="National" className="h-8 w-auto" />
          </div>
          <NavLink
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium ml-6">
            Home
          </NavLink>
        </div>
        <div></div>
        <div>
          <NavLink to="/form">
            <button className="cursor-pointer bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
              ADD +
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
