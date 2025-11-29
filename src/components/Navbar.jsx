import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const nav = useNavigate();

  // Load user data from sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem("userData");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    nav("/auth");
  };

  return (
    <nav className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-black">
            Raynott <span className="text-gray-600">DecMart</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/"><li className="hover:text-black cursor-pointer">Home</li></Link>
          <Link to="/about"><li className="hover:text-black cursor-pointer">About</li></Link>
          <Link to="/allproducts"><li className="hover:text-black cursor-pointer">Products</li></Link>

          {user && (
            <Link to="/MyOrders">
              <li className="hover:text-black cursor-pointer">My Orders</li>
            </Link>
          )}
                    <Link to="/admin"><li className="hover:text-black cursor-pointer">Admin</li></Link>

        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">

          {/* USERNAME HIGHLIGHTED + LOGOUT */}
          {user ? (
            <>
              <span
                className="font-semibold text-black underline underline-offset-4 decoration-gray-400"
                style={{ letterSpacing: "0.5px" }}
              >
                👤 {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            /* Login */
            <Link to="/auth" className="hover:text-black">
              Login
            </Link>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <span className="text-xl">🛒</span>
            </Link>
           
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 flex flex-col gap-4 text-gray-700">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-black">Home</p>
          </Link>

          <Link to="/allproducts" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-black">Products</p>
          </Link>

         

          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            <p className="hover:text-black">Admin</p>
          </Link>

          {user && (
            <Link to="/MyOrders" onClick={() => setMenuOpen(false)}>
              <p className="hover:text-black">My Orders</p>
            </Link>
          )}

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <span>🛒</span> Cart
          </Link>

          {/* Mobile login/logout */}
          {user ? (
            <>
              <span className="font-semibold">👤 {user.username}</span>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="hover:text-black"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
