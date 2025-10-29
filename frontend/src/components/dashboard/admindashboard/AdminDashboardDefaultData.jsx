// components/AdminDashboardDefaultData.jsx
import React, { useState, useEffect } from "react";
import { Users, ShoppingCart, Calendar, Bike, Wrench, Package, Loader2 } from "lucide-react";
import axios from "../../../axiosConfig"; // With JWT

const AdminDashboardDefaultData = () => {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const [statsRes, activitiesRes] = await Promise.all([
        axios.get("/api/auth/dashboard/stats"),
        axios.get("/api/auth/dashboard/activities")
      ]);

      const rawStats = statsRes.data;
      setStats([
        { title: "Total Users", value: rawStats.totalUsers, icon: <Users className="text-blue-500 w-6 h-6" />, color: "bg-blue-100" },
        { title: "Bookings Today", value: rawStats.bookingsToday, icon: <Wrench className="text-yellow-500 w-6 h-6" />, color: "bg-yellow-100" },
        { title: "Bikes Hired", value: rawStats.bikesHired, icon: <Bike className="text-green-500 w-6 h-6" />, color: "bg-green-100" },
        { title: "Upcoming Events", value: rawStats.upcomingEvents, icon: <Calendar className="text-purple-500 w-6 h-6" />, color: "bg-purple-100" },
        { title: "Training Sessions", value: rawStats.trainingSessions, icon: <Package className="text-pink-500 w-6 h-6" />, color: "bg-pink-100" },
        { title: "Total Orders", value: rawStats.totalOrders, icon: <ShoppingCart className="text-red-500 w-6 h-6" />, color: "bg-red-100" },
      ]);

      setActivities(activitiesRes.data);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <button onClick={fetchDashboard} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome, Admin</h1>
      <p className="text-gray-600 mb-10">Here’s a quick overview of your platform’s performance today.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 ${item.color}`}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="bg-white rounded-2xl shadow-sm divide-y">
          {activities.length === 0 ? (
            <li className="p-4 text-gray-500">No recent activity</li>
          ) : (
            activities.map((act, i) => (
              <li key={i} className="p-4 hover:bg-gray-50 transition">
                <span className="text-lg">
                  {act.type === "booking" ? "Person" : "Event"}
                </span>{" "}
                <strong>{act.message}</strong>
                <br />
                <span className="text-xs text-gray-500">
                  {new Date(act.time).toLocaleString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardDefaultData;