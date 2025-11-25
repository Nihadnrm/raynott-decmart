import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductApi, addtoCartApi } from "../Services/AllApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1800);
  };

  // Load product details
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await getProductApi();
        if (res.status === 200) {
          const found = res.data.find((p) => p._id === id);
          setProduct(found || null);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    if (!user) {
      showPopup("Please login to add items to cart", "error");
      return;
    }

    try {
      const res = await addtoCartApi({ productId: product._id });
      showPopup(res.data.message || "Added to cart!", "success");
    } catch (err) {
      showPopup("Server error", "error");
    }
  };

  const handleOrder = () => {
    localStorage.setItem("product", JSON.stringify(product));
    navigate("/checkout");
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-xl">Loading...</p>
    );

  if (!product)
    return (
      <p className="text-center mt-10 text-red-500 text-xl">
        Product not found!
      </p>
    );

  return (
    <div className="px-4 sm:px-6 md:px-20 py-10">

      {/* POPUP */}
      {showAlert && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bottom-8 px-6 py-3 rounded-lg shadow-lg text-white font-semibold 
            ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {alertMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* PRODUCT IMAGE */}
        <div className="w-full flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm sm:max-w-md h-64 sm:h-80 md:h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>

          {product.description && (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          )}

          <p className="text-gray-700 text-sm sm:text-base">
            <strong>Category:</strong>{" "}
            <span className="font-semibold">{product.category}</span>
          </p>

          <p className="text-3xl font-bold">₹{product.price}</p>

          <p className="text-lg text-yellow-500 font-semibold">
            ⭐ Rating: {product.rating || "4.5"}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-1/2 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800"
            >
              Add to Cart
            </button>

            <button
              onClick={handleOrder}
              className="w-full sm:w-1/2 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600"
            >
              Order Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
