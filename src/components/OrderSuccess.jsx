import React, { useEffect, useState } from "react";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("order"));
    setOrder(saved);
  }, []);

  if (!order) {
    return (
      <div className="px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-3">
          No Order Found
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Please place an order first.
        </p>
        <a
          href="/allproducts"
          className="px-6 py-3 bg-black text-white rounded-lg shadow"
        >
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-16">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-3">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-600 text-center mb-10 text-lg">
        Thank you! Your order will be delivered soon.
      </p>

      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl space-y-8">

        {/* DELIVERY DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
          </div>
        </div>

        {/* PRODUCT SUMMARY */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Summary</h2>
          <div className="flex items-start gap-4">
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-28 h-28 rounded-lg object-cover shadow"
            />
            <div>
              <h3 className="font-bold text-lg">{order.productName}</h3>
              <p className="text-gray-700">
                <strong>Price:</strong> ₹{order.productPrice}
              </p>
              <p className="text-black font-bold mt-2 text-lg">
                Total Paid: ₹{order.productPrice * order.quantity}
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center mt-10">
        <a
          href="/allproducts"
          className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default OrderSuccess;
