// src/components/UserOrders.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "../../axiosConfig";
import { AuthContext } from "../AuthContext";

const UserOrders = () => {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user?.id) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://mototrekkin-bakend.vercel.app/api/bookings/user/${user.id}`
        );
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
        setLoading(false);
      }
    };

    if (!authLoading && user?.id) {
      fetchBookings();
    } else if (!authLoading) {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600 text-lg">
        Loading your bookings...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
        <p className="text-lg font-medium mb-4">{error}</p>
        <button
          onClick={() => (window.location.href = "/?openAuthModal=true")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </div>
    );

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Your Service Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-md">
            <p className="text-gray-600 text-lg">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {booking.motorcycleMake} {booking.motorcycleModel}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Booking ID:{" "}
                  <span className="font-medium text-gray-700">
                    {booking._id}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Preferred Date:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(booking.preferredDateTime).toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Work Required:{" "}
                  <span className="font-medium text-gray-700">
                    {booking.summaryOfWork}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-semibold px-2 py-1 rounded-full text-xs ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
