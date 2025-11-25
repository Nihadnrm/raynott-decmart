import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addOrderApi } from "../Services/AllApi";

const Checkout = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success"); 
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  // SHOW POPUP ALERT
  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("product"));
    if (saved) {
      setProduct(saved);
      setQuantity(saved.quantity || 1);
    }
  }, []);

  // Update quantity & product in localStorage
  const updateQuantity = (val) => {
    const newQty = Math.max(1, quantity + val);
    setQuantity(newQty);

    const updated = { ...product, quantity: newQty };
    localStorage.setItem("product", JSON.stringify(updated));
  };

  // ------------------------
  // PLACE ORDER FUNCTION
  // ------------------------
  const handleOrder = async () => {
    if (!data.name || !data.address || !data.phone) {
      showPopup("Please fill all delivery fields", "error");
      return;
    }

    if (!product) {
      showPopup("No product found!", "error");
      return;
    }

    const orderData = {
      productId: product._id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      quantity: quantity,
      productImage: product.image,
      productName: product.name,
      productPrice: product.price,
    };

    try {
      const result = await addOrderApi(orderData);

      if (result.status === 200 || result.status === 201) {
        showPopup("Order placed successfully!", "success");

        localStorage.setItem("order", JSON.stringify(orderData));
        localStorage.removeItem("product");

        setTimeout(() => navigate("/success"), 1500);
      } else {
        showPopup("Something went wrong!", "error");
      }
    } catch (err) {
      console.log(err);
      showPopup("Server error!", "error");
    }
  };

  return (
    <div className="relative px-6 py-10 md:px-16">

      {/* 🌟 Stylish Bottom Alert Popup */}
      {showAlert && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bottom-5 px-6 py-3 
            rounded-lg shadow-lg text-white text-lg font-semibold 
            transition-all duration-500 
            ${alertType === "success" ? "bg-green-600" : "bg-red-600"} 
            animate-slideUp`}
        >
          {alertMsg}
        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            0% { transform: translate(-50%, 40px); opacity: 0; }
            100% { transform: translate(-50%, 0px); opacity: 1; }
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
        `}
      </style>

      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* LEFT — DELIVERY FORM */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg mb-3"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <textarea
            placeholder="Full Address"
            className="w-full border p-3 rounded-lg mb-3"
            rows="3"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          ></textarea>

          <input
            type="text"
            placeholder="Phone Number"
            maxLength={10}
            className="w-full border p-3 rounded-lg mb-3"
            value={data.phone}
            onChange={(e) =>
              setData({ ...data, phone: e.target.value.replace(/\D/g, "") })
            }
          />

          {/* PLACE ORDER BUTTON */}
          <button
            onClick={handleOrder}
            className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        {product && (
          <div className="bg-white p-6 shadow rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex gap-4 items-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 rounded-lg object-cover shadow"
              />

              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>

                <p className="text-gray-600 text-sm">
                  <strong>Price:</strong> ₹{product.price}
                </p>

                {/* QUANTITY */}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(-1)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>

                  <span className="font-semibold">{quantity}</span>

                  <button
                    onClick={() => updateQuantity(1)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL */}
                <p className="font-semibold text-black mt-3">
                  Subtotal: ₹{product.price * quantity}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
