import React, { useState, useEffect, useContext } from "react";
import axios from "../../axiosConfig";
import { AuthContext } from "../AuthContext";

const UpcomingEvents = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching bookings for userId:", user.id);
        const response = await axios.get(
          // `https://mototrekkin-bakend.vercel.app/api/bikeBookings/user/${user.id}`,
          `/api/bikeBookings/user/${user.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        console.log("Fetched bookings:", response.data);

        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([]);
          setError("Unexpected data format from server");
        }
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.");
        console.error("Error fetching bookings:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-5xl mb-3">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg">
          <div className="text-gray-400 text-6xl mb-4">🏍️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Upcoming Bookings</h3>
          <p className="text-gray-600 mb-6">
            Your upcoming bike bookings will appear here once confirmed.
          </p>
          <a
            href="/bike-booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            Book Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Upcoming Bike Bookings</h1>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.bikeModel}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.paymentStatus?.toLowerCase() === "paid"
                      ? "bg-green-100 text-green-700"
                      : booking.paymentStatus?.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.paymentStatus || "Pending"}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Booking ID:</span> {booking._id}</p>
                <p><span className="font-semibold">Pickup Date:</span> {new Date(booking.pickupDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Return Date:</span> {new Date(booking.returnDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Total Days:</span> {booking.totalDays}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
