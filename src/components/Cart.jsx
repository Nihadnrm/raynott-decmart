import React, { useEffect, useState } from "react";
import {
  getCartApi,
  deleteCartApi,
  addtoCartApi,
  reduceCartApi,
} from "../Services/AllApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200) setCart(res.data);
    } catch (err) {
      console.log("Error loading cart:", err);
    }
  };

  const increaseQty = async (productId) => {
    try {
      await addtoCartApi({ productId });
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      await reduceCartApi({ productId });
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartApi(id);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Price Calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.productId?.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const gst = Number((subtotal * 0.05).toFixed(2));
  const grandTotal = subtotal + deliveryFee + gst;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ⭐ SEND CART ITEMS TO CHECKOUT
  const goToCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    navigate("/checkout");
  };

  return (
    <div className="px-6 py-10 md:px-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-6 bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={item.productId.image}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.productId.name}
                  </h2>
                  <p className="font-bold mt-1 text-lg">
                    ₹{item.productId.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.productId._id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.productId._id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-3 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 shadow rounded-xl h-fit sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Items ({totalItems})</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={goToCheckout}
              className="w-full bg-black text-white mt-5 py-3 rounded-xl"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
