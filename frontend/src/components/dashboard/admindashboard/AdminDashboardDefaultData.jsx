// components/AdminDashboardDefaultData.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";

const AdminDashboardDefaultData = () => {
  const [stats, setStats] = useState({
    users: 0,
    mdpPhase2Registrations: 0,
    eventBookings: 0,
    serviceBookings: 0,
    nzBikes: 0,
    mdpPhase2Bikes: 0,
    activeMdpPhase2Bikes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const headers = { Authorization: `Bearer ${token}` };

        // Parallel API calls
        const [
          usersRes,
          mdpRegRes,
          eventBookingsRes,
          serviceBookingsRes,
          nzBikesRes,
          mdpBikesRes,
        ] = await Promise.all([
          axios.get("/api/auth/users", { headers }),
          axios.get("/api/mdpPhase2Registrations/admin", { headers }),
          axios.get("/api/nzsiRegistrations/admin", { headers }), // Adjust if route differs
          axios.get("/api/bookings", { headers }), // Adjust if route differs
          axios.get("/api/nz-bikes"),
          axios.get("/api/bikes"),
        ]);

        // Extract MDP bikes
        const mdpBikes = mdpBikesRes.data.success && Array.isArray(mdpBikesRes.data.bikes)
          ? mdpBikesRes.data.bikes
          : [];
        const activeMdpBikes = mdpBikes.filter(b => b.isActive).length;

        setStats({
          users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          mdpPhase2Registrations: Array.isArray(mdpRegRes.data) ? mdpRegRes.data.length : 0,
          eventBookings: Array.isArray(eventBookingsRes.data) ? eventBookingsRes.data.length : 0,
          serviceBookings: Array.isArray(serviceBookingsRes.data) ? serviceBookingsRes.data.length : 0,
          nzBikes: Array.isArray(nzBikesRes.data) ? nzBikesRes.data.length : 0,
          mdpPhase2Bikes: mdpBikes.length,
          activeMdpPhase2Bikes: activeMdpBikes,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Failed to load dashboard stats. Some data may be missing.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition hover:shadow-lg`}>
      <div className={`p-3 rounded-full ${color} text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back, Admin
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Monitor your platform in real time — users, bookings, bikes, and services.
        </p>
      </div>

      {/* ────── STATS GRID (7 CARDS) ────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-10">
        {/* 1. Users */}
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9v-1c0-1.657-1.343-3-3-3s-3 1.343-3 3v1m6-6c1.657 0 3 1.343 3 3v1m0-4c-1.657 0-3 1.343-3 3v1m6-6c1.657 0 3 1.343 3 3v1m-6-4c-1.657 0-3 1.343-3 3v1" /></svg>}
          color="bg-indigo-600"
        />

        {/* 2. MDP Phase 2 Bookings */}
        <StatCard
          title="MDP Phase 3 Bookings"
          value={stats.mdpPhase2Registrations}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          color="bg-orange-600"
        />

        {/* 3. Event Bookings */}
        <StatCard
          title="Event Bookings"
          value={stats.eventBookings}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          color="bg-purple-600"
        />

        {/* 4. Service Bookings */}
        <StatCard
          title="Service Bookings"
          value={stats.serviceBookings}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-teal-600"
        />

        {/* 5. NZ Bikes */}
        <StatCard
          title="NZ Bikes"
          value={stats.nzBikes}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          color="bg-blue-600"
        />

        {/* 6. MDP Phase 2 Bikes */}
        <StatCard
          title="MDP Phase 3 Bikes"
          value={stats.mdpPhase2Bikes}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          color="bg-green-600"
        />

        {/* 7. Active MDP Bikes */}
        <StatCard
          title="Active MDP Bikes"
          value={stats.activeMdpPhase2Bikes}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-emerald-600"
        />
      </div>

      <div className="text-center">
        <p className="text-gray-500">
          Select a section from the sidebar to dive into details
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardDefaultData;