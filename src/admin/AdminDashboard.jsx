import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 bg-white shadow-md p-6 w-64 transform
          md:relative md:translate-x-0 md:block
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          z-30
        `}
      >
        {/* Close button inside sidebar on small screens */}
        <button
          className="md:hidden mb-6 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold mb-10">
          Raynott <span className="text-blue-600">Admin</span>
        </h1>

        <nav className="space-y-4 text-gray-700 font-medium">
          <Link to="/addproduct" className="block hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Add Products</Link>
          <Link to="/adminorders" className="block hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Orders</Link>
          <Link to="/users" className="block hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Users</Link>
          <Link to="/messages" className="block hover:text-blue-600" onClick={() => setSidebarOpen(false)}>Messages</Link>
        </nav>
      </aside>

      {/* Overlay when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 relative">
        {/* Toggle Button in top right */}
        <button
          className="md:hidden absolute top-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg focus:outline-none z-40"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          &#9776;
        </button>

        <div className="bg-white rounded-lg shadow-xl p-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
            Welcome, <span className="text-blue-600">Admin</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Manage your products, orders, users, and messages from the dashboard below.
          </p>

          {/* Example info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">125</p>
              <p className="mt-2 text-gray-700">Products</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-green-600">48</p>
              <p className="mt-2 text-gray-700">Orders</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-yellow-600">30</p>
              <p className="mt-2 text-gray-700">Users</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
