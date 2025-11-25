import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi, loginApi } from "../Services/AllApi";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [reg, setReg] = useState({ username: "", email: "", password: "" });
  const [log, setLog] = useState({ email: "", password: "" });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const nav = useNavigate();

  const showPopup = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleRegister = async () => {
    if (!reg.username || !reg.email || !reg.password) {
      showPopup("Please fill all fields", "error");
      return;
    }

    try {
      const response = await registerApi(reg);
      if (response.status === 200) {
        showPopup("Registered successfully!", "success");
        setReg({ username: "", email: "", password: "" });
        setIsLogin(true);
      }
    } catch (err) {
      showPopup("Registration failed. Try again.", "error");
    }
  };

  const handleLogin = async () => {
    if (!log.email || !log.password) {
      showPopup("Please enter email & password", "error");
      return;
    }

    try {
      const response = await loginApi(log);

      if (response.status === 200) {
        showPopup("Login successful!", "success");

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            _id: response.data._id,
            username: response.data.username,
            email: response.data.email,
          })
        );

        setTimeout(() => nav("/"), 1000);
      }
    } catch (err) {
      showPopup("Invalid credentials", "error");
    }
  };

  return (
    <>
      {/* 🔔 POPUP ALERT */}
      <div
        className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 
        px-6 py-3 rounded-xl shadow-lg text-white font-semibold
        transition-all duration-500
        ${showAlert ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${alertType === "success" ? "bg-black" : "bg-red-700"}`}
      >
        {alertMsg}
      </div>

      {/* PAGE WRAPPER */}
      <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-300">

          <h2 className="text-3xl font-bold text-center text-black mb-8">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* LOGIN FORM */}
          {isLogin && (
            <>
              <div className="mb-4">
                <label className="text-black block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-100 border border-black p-3 rounded-lg outline-none focus:border-gray-700"
                  value={log.email}
                  onChange={(e) => setLog({ ...log, email: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <label className="text-black block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-100 border border-black p-3 rounded-lg outline-none focus:border-gray-700"
                  value={log.password}
                  onChange={(e) => setLog({ ...log, password: e.target.value })}
                />
              </div>

              <button
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 shadow-md transition"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="text-center text-black mt-4">
                Don't have an account?{" "}
                <span
                  className="text-gray-900 font-semibold cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </span>
              </p>
            </>
          )}

          {/* REGISTER FORM */}
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="text-black block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full bg-gray-100 border border-black p-3 rounded-lg outline-none focus:border-gray-700"
                  value={reg.username}
                  onChange={(e) => setReg({ ...reg, username: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="text-black block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-100 border border-black p-3 rounded-lg outline-none focus:border-gray-700"
                  value={reg.email}
                  onChange={(e) => setReg({ ...reg, email: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <label className="text-black block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full bg-gray-100 border border-black p-3 rounded-lg outline-none focus:border-gray-700"
                  value={reg.password}
                  onChange={(e) => setReg({ ...reg, password: e.target.value })}
                />
              </div>

              <button
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 shadow-md transition"
                onClick={handleRegister}
              >
                Register
              </button>

              <p className="text-center text-black mt-4">
                Already have an account?{" "}
                <span
                  className="text-gray-900 font-semibold cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
