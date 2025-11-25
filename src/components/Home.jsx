import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductApi, addtoCartApi } from "../Services/AllApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup alert states
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1800);
  };

  // ⭐ Add to Cart
  const handleAddToCart = async (item) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    if (!user) {
      showPopup("Please login to add items to cart", "error");
      return;
    }

    try {
      const res = await addtoCartApi({
        productId: item._id,
      });

      showPopup(res.data.message || "Added to cart!", "success");
    } catch (err) {
      console.log(err);
      showPopup("Server error!", "error");
    }
  };

  // Load products
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProductApi();
        if (res.status === 200) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log("Home fetch error:", err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="w-full bg-white text-black">

      {/* Popup */}
      {showAlert && (
        <div
          className={`fixed left-1/2 transform -translate-x-1/2 bottom-8 px-6 py-3 rounded-lg shadow-lg text-white font-semibold 
            ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {alertMsg}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] bg-black flex items-center justify-center px-4 sm:px-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white">
            Raynott DecMart
          </h1>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-white/80">
            Fresh groceries delivered at unbeatable prices.
          </p>

          <Link
            to="/allproducts"
            className="mt-6 inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-black hover:text-white border border-white duration-300"
          >
            Buy Groceries
          </Link>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-10 px-4 sm:px-8 md:px-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Grocery Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {[
            {
              name: "Fruits",
              image:
                "https://img.freepik.com/free-photo/mixed-fruits-with-apple-banana-orange-other_74190-938.jpg",
            },
            {
              name: "Vegetables",
              image:
                "https://png.pngtree.com/png-clipart/20241016/original/pngtree-fruit-and-vegetable-png-image_16343587.png",
            },
            {
              name: "Dairy",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGmivs2rrFir-fyjUJrRQXjOeFydVgL_RCA&s",
            },
            {
              name: "Groceries",
              image:
                "https://5.imimg.com/data5/MG/FQ/SA/SELLER-283756/all-fmcg-grocery-products.jpg",
            },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-black shadow hover:shadow-xl cursor-pointer transition"
            >
              <Link to={`/allproducts?category=${cat.name}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-28 sm:h-32 md:h-40 object-cover rounded-t-xl"
                />
              </Link>
              <p className="text-center font-semibold py-3">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Best Selling Groceries
        </h2>

        {loading && (
          <p className="text-center text-black/60 text-lg">Loading products...</p>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-black shadow hover:shadow-xl transition overflow-hidden"
                >
                  <Link to={'/allproducts'}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-xl"
                    />
                  </Link>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{item.name}</h3>

                    <p className="font-bold text-base mt-1">₹{item.price}</p>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-3 w-full bg-black text-white py-2 rounded-lg 
                      hover:bg-white hover:text-black border border-black duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* VIEW MORE */}
            <div className="text-center mt-10">
              <Link
                to="/allproducts"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold 
                hover:bg-white hover:text-black border border-black duration-300"
              >
                View More Products →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ⭐ PERFECT NEW FEATURED BRANDS SECTION */}
      <section className="py-16 bg-white px-6 sm:px-12 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Featured Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
          {[
            "https://media.istockphoto.com/id/1142838974/vector/dairy-icon-with-jug-blue-sign-for-milk-company.jpg?s=612x612&w=0&k=20&c=wB2xovAUGwRBXM1VyRlxTYN9GgfGXH5M_BO09FV2l_s=",
            "https://t3.ftcdn.net/jpg/15/24/06/70/360_F_1524067013_QcDgmHxlvmUOwRLdEIFB7lkItjOegtqD.jpg",
            "https://www.shutterstock.com/image-vector/vintage-bakery-logo-design-quinoa-600nw-2464055473.jpg",
            "https://images-platform.99static.com/W9I89I_QSQA5qw9JRc0oVquXoko=/38x40:920x922/500x500/top/smart/99designs-contests-attachments/78/78393/attachment_78393431",
            "https://images-platform.99static.com//Mk4k2kLr-e9iNeORr5hl-gnP4Z0=/231x139:733x641/fit-in/500x500/99designs-contests-attachments/119/119714/attachment_119714800",
          ].map((logo, i) => (
            <div
              key={i}
              className="w-32 h-28 flex items-center justify-center border border-black rounded-xl bg-white shadow hover:shadow-xl transition p-4"
            >
              <img
                src={logo}
                alt="brand"
                className="w-full h-full object-contain grayscale"
              />
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-100 px-6 sm:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Raynott DecMart?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh & Quality Products",
              desc: "We deliver only clean, fresh, and premium groceries to your doorstep.",
            },
            {
              title: "Fast Delivery",
              desc: "Get your groceries delivered in under 30 minutes in major cities.",
            },
            {
              title: "Best Prices",
              desc: "Save more with our everyday low prices and seasonal offers.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-black rounded-xl p-6 text-center shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-black/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-12 bg-black text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">Join Raynott DecMart</h2>
        <p className="mt-3 max-w-xl mx-auto text-white/80">
          Receive updates on grocery offers & new arrivals.
        </p>

        <button className="mt-6 px-8 py-3 bg-white text-black rounded-full text-lg hover:bg-black hover:text-white border border-white duration-300 font-semibold">
          Subscribe Now
        </button>
      </section>
    </div>
  );
};

export default Home;
