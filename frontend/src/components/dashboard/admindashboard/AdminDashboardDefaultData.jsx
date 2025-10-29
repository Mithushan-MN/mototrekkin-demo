import React from "react";

const AdminDashboardDefaultData = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome Back, Admin 👋
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        You’re in control of everything here — manage users, bookings, events, and more with ease.  
        Keep track of the latest updates and ensure your platform runs smoothly.
      </p>

      <div className="mt-10">
        <p className="text-gray-500">
          Select a section from the sidebar to get started 🚀
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardDefaultData;
