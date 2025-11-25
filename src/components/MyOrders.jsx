import React, { useEffect, useState } from "react";
import { getOrderApi } from "../Services/AllApi";
const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getOrderApi();

      if (result.status === 200) {
        setOrders(result.data);
      }
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-16 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        My Orders
      </h1>

      {orders.length > 0 ? (
        orders.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 border max-w-3xl mx-auto mb-6"
          >
            {/* ORDER SUMMARY */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>

              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Phone:</strong> {item.phone}</p>

              <p className="mt-2">
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColors["Processing"]}`}
                >
                  Processing
                </span>
              </p>
            </div>

            {/* PRODUCT SECTION */}
            {item.productId ? (
              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold mb-3">Product</h2>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-24 h-24 rounded-lg object-cover shadow"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.productId.name}
                    </h3>

                    <p className="text-gray-700 mt-1">
                      <strong>Price:</strong> ₹{item.productId.price}
                    </p>

                    <p className="mt-2 font-bold text-black">
                      Total Paid: ₹{item.productId.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm border-t pt-3">
                Product details unavailable (productId not populated)
              </p>
            )}
          </div>
        ))
      ) : (
        <h3 className="text-center text-gray-500">No orders found</h3>
      )}
    </div>
  );
};

export default MyOrders;
