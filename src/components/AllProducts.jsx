import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProductApi, addtoCartApi } from "../Services/AllApi";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Get category from URL
  const category = new URLSearchParams(location.search).get("category");

  // Popup alert
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const isUserLoggedIn = () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    return !!user;
  };

  // ⭐ ADD TO CART
  const handleAddToCart = async (item) => {
    if (!isUserLoggedIn()) {
      showPopup("Please login to add to cart", "error");
      return;
    }

    try {
      const res = await addtoCartApi({ productId: item._id });
      showPopup(res.data.message || "Added to cart!", "success");
    } catch (err) {
      console.log(err);
      showPopup("Server error", "error");
    }
  };

  // ⭐ ORDER NOW – BLOCK WHEN NOT LOGGED IN
  const handleOrder = (item) => {
    if (!isUserLoggedIn()) {
      showPopup("Please login first to order", "error");
      return;
    }

    localStorage.setItem("product", JSON.stringify(item));
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductApi();
        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // FILTER PRODUCTS
  useEffect(() => {
    if (category) {
      const filtered = products.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <div className="relative py-12 px-4 sm:px-6 md:px-14 lg:px-20">
      
      {/* Modern animated popup */}
      {showAlert && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bottom-6 px-6 py-3 
            rounded-lg shadow-xl text-white font-semibold 
            animate-bounce-small
            ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {alertMsg}
        </div>
      )}

      <style>
        {`
          @keyframes bounceSmall {
            0% { transform: translate(-50%, 20px); opacity: 0; }
            50% { transform: translate(-50%, -5px); opacity: 1; }
            100% { transform: translate(-50%, 0px); opacity: 1; }
          }
          .animate-bounce-small {
            animation: bounceSmall 0.4s ease-out;
          }
        `}
      </style>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        {category ? `${category} Products` : "All Products"}
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <Link to={`/details/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </Link>

                <div className="p-4">
                  <h2 className="font-bold text-lg">{item.name}</h2>

                  <p className="font-extrabold text-lg">₹{item.price}</p>

                  <p className="font-semibold text-sm text-gray-600">
                    ⭐ Rating: {item.rating}
                  </p>

                  <div className="mt-3 flex justify-between">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-[48%] bg-black text-white py-2 rounded-md text-sm"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleOrder(item)}
                      className="w-[48%] bg-gray-700 text-white py-2 rounded-md text-sm"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg text-gray-600">
              No products found in this category.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
