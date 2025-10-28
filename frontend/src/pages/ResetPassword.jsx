import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL = "http://localhost:5000/api/auth";

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/"), 2000); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Reset Password
        </h2>

        {message && (
          <p className="text-center text-yellow-400 mb-4">{message}</p>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;