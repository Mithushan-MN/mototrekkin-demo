import React, { useState, useContext } from "react";
import axios from "axios";
import authimg from "../assets/login-sideimage.webp";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "http://localhost:5000/api/auth";

  if (!isOpen) return null;

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/signup`, {
        fullName,
        email,
        password,
        confirmPassword,
      });
      setMessage(res.data.message);
      setIsLogin(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      console.log("AuthModal: Login successful", {
        token: res.data.token,
        user: res.data.user,
      });
      login(res.data.token, res.data.user);
      const from = location.state?.from?.pathname || "/userdashboard";
      onClose();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("AuthModal: Login failed", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  // Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage(res.data.message || "Reset link sent to your email.");
      setIsForgot(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-black rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">
    
        <div className="hidden md:block md:w-1/2">
          <img src={authimg} alt="Bike" className="h-full w-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 relative text-white">
          <button
            className="absolute p-1 top-3 right-3 text-gray-400 hover:text-white cursor-pointer hover:border hover:rounded-2xl hover:bg-yellow-600 transition"
            onClick={onClose}
          >
            ✕
          </button>

          
          {!isForgot && (
            <div className="flex mb-6 border-b border-gray-700 mt-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 p-2 text-lg font-semibold cursor-pointer rounded-md ${
                  isLogin
                    ? "border-b-2 border-yellow-500 text-yellow-400 bg-yellow-900"
                    : "text-gray-400"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 p-2 text-lg font-semibold cursor-pointer rounded-md ${
                  !isLogin
                    ? "border-b-2 border-yellow-500 text-yellow-400 bg-yellow-900"
                    : "text-gray-400"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {message && <p className="mb-3 text-yellow-400">{message}</p>}

          {isForgot ? (
            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
              <p className="text-gray-400 text-sm mb-4">
                Enter your email to receive a password reset link.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer">
                Send Reset Link
              </button>
              <p
                onClick={() => setIsForgot(false)}
                className="text-yellow-400 text-sm cursor-pointer hover:underline text-center"
              >
                Back to Login
              </p>
            </form>
          ) : isLogin ? (
            // Login form
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <div className="flex justify-between items-center">
                <p
                  onClick={() => setIsForgot(true)}
                  className="text-yellow-400 text-sm cursor-pointer hover:underline"
                >
                  Forgot Password?
                </p>
              </div>
              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer">
                Sign In
              </button>
            </form>
          ) : (
            // Signup form
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                required
              />
              <button className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;