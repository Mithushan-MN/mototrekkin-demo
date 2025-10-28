import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  Calendar,
  LogOut,
  Menu,
  X,
  Bike,
  Wrench,
} from "lucide-react";
import AdminDashboardDefaultData from "../../components/dashboard/admindashboard/AdminDashboardDefaultData";
import AdminUsers from "../../components/dashboard/admindashboard/AdminUsers";
import AdminOrders from "../../components/dashboard/admindashboard/AdminOrders";
import AdminProducts from "../../components/dashboard/admindashboard/AdminProducts";
import AdminEvents from "../../components/dashboard/admindashboard/AdminTrainings";
import AdminBikeHire from "../../components/dashboard/admindashboard/AdminBikeHire";
import AdminEventBookings from "../../components/dashboard/admindashboard/AdminEventBookings";
import AdminTrainings from "../../components/dashboard/admindashboard/AdminTrainings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboardDefaultData />;
      case "users":
        return <AdminUsers />;
      case "service bookings":
        return <AdminOrders />;
      case "bike hire":
        return <AdminBikeHire />;
      case "event bookings":
        return <AdminEventBookings />;
      case "Trainings bookings":
        return <AdminTrainings />;
      case "products":
        return <AdminProducts />;
      case "events":
        return <AdminEvents />;
      case "logout":
        return (
          <div>
            <h2 className="text-2xl font-bold">Logged Out</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Mobile & Tablet Top Bar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b lg:hidden">
        <h2 className="font-semibold text-lg">Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 lg:h-screen h-full w-64 bg-white border-r z-0 transform 
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile/Tablet Title */}
        <div className="p-6 flex flex-col items-center lg:hidden">
          <h2 className="font-semibold text-lg mb-2">Admin</h2>
        </div>

        {/* Desktop nav with top padding */}
        <nav className="px-4 mt-4 lg:mt-4 lg:pt-2">
          <ul className="space-y-2">
            {[
              { name: "dashboard", icon: LayoutDashboard },
              { name: "users", icon: Users },
              { name: "service bookings", icon: Wrench },
              { name: "bike hire", icon: Bike },
              { name: "event bookings", icon: Bike },
              { name: "Trainings bookings", icon: Bike },
              { name: "products", icon: Box },
              { name: "events", icon: Calendar },
              { name: "logout", icon: LogOut },
            ].map((tab) => (
              <li key={tab.name}>
                <button
                  onClick={() => {
                    setActiveTab(tab.name);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg ${
                    activeTab === tab.name
                      ? "bg-yellow-100 text-yellow-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />{" "}
                  {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

  
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

    
      <main className="flex-1 p-4 lg:p-8 lg:ml-">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
