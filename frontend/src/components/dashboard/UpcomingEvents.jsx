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
        console.log("Fetching bookings for userId:", user.id); // Debug log
        const response = await axios.get(`http://localhost:5000/api/bikeBookings/user/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Redundant due to interceptor, but safe
        });
        console.log("Fetched bookings:", response.data); // Debug log
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!bookings.length) return <div className="text-center py-10">No upcoming bookings found.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Bike Bookings</h2>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">Booking ID: {booking._id}</h3>
            <p>Bike Model: {booking.bikeModel}</p>
            <p>Pickup Date: {new Date(booking.pickupDate).toLocaleDateString()}</p>
            <p>Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
            <p>Total Days: {booking.totalDays}</p>
            <p>Payment Status: {booking.paymentStatus || "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;