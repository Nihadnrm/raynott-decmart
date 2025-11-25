import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md hidden md:block p-6">

        <h1 className="text-2xl font-bold mb-10">
          Raynott <span className="text-blue-600">Admin</span>
        </h1>

        <nav className="space-y-4 text-gray-700 font-medium">
          <Link to="/addproduct" className="block hover:text-blue-600"> Add Products</Link>
          <Link to="/adminorders" className="block hover:text-blue-600">Orders</Link>
          <Link to="/users" className="block hover:text-blue-600">Users</Link>
          <Link to="/messages" className="block hover:text-blue-600">Messages</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10">
     
     <h2>welcome Admin</h2>

      </div>
    </div>
  );
};

export default AdminDashboard;
