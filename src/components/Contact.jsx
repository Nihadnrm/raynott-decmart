import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  return (
    <div className="px-6 py-10 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT — FORM */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-3 rounded-lg"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>

            {/* No function - backend will handle */}
            <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 duration-300">
              Send Message
            </button>
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Reach Us</h2>

          <p className="text-gray-700 mb-3">
            <strong>Email:</strong> support@raynottdecmart.com
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Address:</strong> Raynott DecMart HQ, Mumbai, India
          </p>

          {/* MAP */}
          <div className="mt-6">
            <iframe
              title="Location Map"
              className="w-full h-56 rounded-xl shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1161018006!2d72.74109990595052!3d19.082197839722874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630091f6e13%3A0xdeb1e1a50637e2b2!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707229731740!5m2!1sen!2sin"
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
