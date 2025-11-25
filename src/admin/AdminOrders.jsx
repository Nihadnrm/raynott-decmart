import React, { useEffect, useState } from "react";
import { getAllOrderApi } from "../Services/AllApi";
const statusColors = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getAllOrderApi();
      if (result.status === 200) {
        setOrders(result.data);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  // Handle Status Update
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatusApi(orderId, newStatus);

      if (res.status === 200) {
        // Update UI instantly
        setOrders((prev) =>
          prev.map((ord) =>
            ord._id === orderId ? { ...ord, status: newStatus } : ord
          )
        );
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="px-6 py-10 md:px-16">
      <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>

      <div className="bg-white p-6 shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Quantity</th>
              <th className="py-3 px-2">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                <td className="py-3 px-2">{item._id}</td>

                <td className="py-3 px-2">{item.name}</td>

                <td className="py-3 px-2">
                  {item.productId ? item.productId.name : "Product Removed"}
                </td>

                <td className="py-3 px-2 font-semibold">
                  ₹{item.productId ? item.productId.price : "N/A"}
                </td>

                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusColors[item.status || "Processing"]}`}
                  >
                    {item.status || "Processing"}
                  </span>
                </td>

                <td className="py-3 px-2">{item.quantity}</td>

                {/* Status Update Dropdown */}
                <td className="py-3 px-2">
                  <select
                    className="border p-2 rounded-lg text-sm bg-gray-100 cursor-pointer"
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    defaultValue={item.status || "Processing"}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
