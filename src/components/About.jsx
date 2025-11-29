import React from "react";

const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 bg-white text-black rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-black pb-4 tracking-wide">
        About Raynott Groceries
      </h1>
      
      <p className="text-lg leading-relaxed mb-6">
        Raynott Groceries offers the freshest selection of vegetables, fruits, and essential groceries sourced directly from trusted farmers and producers. Our passion is to deliver quality produce with integrity and care, helping you maintain a healthy lifestyle with ease.
      </p>
      <p className="text-lg leading-relaxed mb-6">
        Convenience meets quality — shop with confidence knowing your order will arrive on time, packed with products selected for freshness and flavor. Sustainability is at the core of our values, and we strive to embrace eco-conscious practices throughout our supply chain.
      </p>
      
      <h2 className="text-3xl font-bold mt-12 mb-4 tracking-wide">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside text-lg space-y-3 pl-4 border-l-2 border-black">
        <li>Farm-fresh, handpicked vegetables and fruits delivered to your door</li>
        <li>Wide variety of grocery essentials with quality assurance</li>
        <li>Simple and secure online ordering with fast delivery service</li>
        <li>Eco-friendly packaging to reduce environmental impact</li>
        <li>Dedicated customer support for seamless shopping experience</li>
      </ul>
      
      <p className="mt-12 text-center text-sm text-gray-600 tracking-wide">
        © {new Date().getFullYear()} Raynott Groceries. Committed to freshness, quality, and sustainability.
      </p>
    </section>
  );
};

export default About;
