// components/UserDashboardDefaultData.jsx
import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig"; // Includes JWT token

const UserDashboardDefaultData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH USER PROFILE
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/auth/profile");
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load your profile. Please log in again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-96"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchUser}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        Welcome back, {user?.fullName?.split(" ")[0] || "User"}!
      </h2>
      <p className="text-gray-600 leading-relaxed">
        From your account dashboard you can view your{" "}
        <span className="font-medium text-blue-600">recent bike hire bookings</span> and edit your{" "}
        <span className="font-medium text-blue-600">account details</span>.
      </p>
    </div>
  );
};

export default UserDashboardDefaultData;