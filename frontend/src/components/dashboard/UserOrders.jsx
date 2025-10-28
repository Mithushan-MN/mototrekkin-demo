// src/components/UserOrders.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "../../axiosConfig";
import { AuthContext } from "../AuthContext";

const UserOrders = () => {
  const { user, isLoading: authLoading } = useContext(AuthContext); // Include isLoading from AuthContext
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('UserOrders: useEffect triggered', { user, authLoading });
    
    const fetchBookings = async () => {
      try {
        if (!user?.id) {
          console.log('UserOrders: No user.id, skipping fetch');
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        console.log('UserOrders: Fetching bookings for user.id', user.id);
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
        console.log('UserOrders: Bookings fetched successfully', response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error('UserOrders: Failed to fetch bookings', err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch bookings");
        setLoading(false);
      }
    };

    if (!authLoading && user?.id) {
      fetchBookings();
    } else if (!authLoading) {
      console.log('UserOrders: No user or user.id, setting error');
      setError('User not authenticated');
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">
                {booking.motorcycleMake} {booking.motorcycleModel}
              </h3>
              <p>Booking ID: {booking._id}</p>
              <p>Preferred Date: {new Date(booking.preferredDateTime).toLocaleString()}</p>
              <p>Work Required: {booking.summaryOfWork}</p>
              <p>Status: {booking.status || "Pending"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;