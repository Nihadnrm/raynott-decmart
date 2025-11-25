import React, { useState } from "react";
import { addProductApi } from "../Services/AllApi";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    rating: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const handleSave = async () => {
    const { name, price, category, image, rating } = form;

    if (!name || !price || !category || !image) {
      showPopup("Please fill all required fields", "error");
      return;
    }

    try {
      const response = await addProductApi(form);

      if (response.status === 200) {
        showPopup("Product added successfully!", "success");

        setForm({
          name: "",
          price: "",
          category: "",
          image: "",
          rating: "",
        });
      }
    } catch (err) {
      showPopup("Failed to add product!", "error");
    }
  };

  return (
    <>
      {/* Popup Alert */}
      <div
        className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-500
        ${showAlert ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
        ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        {alertMsg}
      </div>

      <div className="px-6 py-10 md:px-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Add New Product
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* IMAGE */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Image</h2>

              <div className="border rounded-xl p-4 bg-gray-50 text-center">
                <div className="w-full h-56 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                  Image Preview
                </div>

                <input
                  type="text"
                  placeholder="Paste image URL"
                  className="w-full mt-4 border p-3 rounded-lg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
            </div>

            {/* DETAILS */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>

              <input
                type="text"
                placeholder="Product Name"
                className="w-full border p-3 rounded-lg mb-3"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Price (₹)"
                className="w-full border p-3 rounded-lg mb-3"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <select
                className="w-full border p-3 rounded-lg mb-3"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Groceries</option>
                <option>Snacks</option>
              </select>

              <input
                type="number"
                placeholder="Rating (1–5)"
                className="w-full border p-3 rounded-lg mb-3"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 duration-300"
          >
            Save Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
