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
import { AuthContext } from "../../components/AuthContext";
import { useContext } from "react";
import NzBikes from "../../components/dashboard/admindashboard/NzBikes";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => logout();

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
      case "NzBikes":
        return <NzBikes />;
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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
  className={`fixed lg:sticky top-0 left-0 h-screen w-64 
  bg-white/70 backdrop-blur-md border-r border-gray-200 
  shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
  z-20 transform lg:translate-x-0
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  transition-transform duration-300 ease-in-out`}
>
  {/* Mobile Header */}
  <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
    <h2 className="font-semibold text-lg text-gray-800">Admin</h2>
    <button onClick={() => setSidebarOpen(false)}>
      <X size={24} className="text-gray-700" />
    </button>
  </div>

  {/* Admin Info */}
  <div className="p-6 pt-20 lg:pt-5 flex flex-col items-center border-b border-gray-200">
    <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
      A
    </div>
    <h2 className="font-semibold text-lg mt-3 text-gray-800">Admin Panel</h2>
  </div>

  {/* Navigation */}
  <nav className="px-4 mt-6">
    <ul className="space-y-2">
      {[
        { name: "dashboard", icon: LayoutDashboard },
        { name: "users", icon: Users },
        { name: "service bookings", icon: Wrench },
        { name: "bike hire", icon: Bike },
        { name: "event bookings", icon: Calendar },
        { name: "Trainings bookings", icon: Calendar },
        { name: "NzBikes", icon: Bike },
        { name: "products", icon: Box },
        { name: "events", icon: Calendar },
      ].map((tab) => (
        <li key={tab.name}>
          <button
            onClick={() => {
              setActiveTab(tab.name);
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-3 py-2 rounded-xl transition-all duration-200
              ${
                activeTab === tab.name
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <tab.icon
              className={`w-5 h-5 mr-2 ${
                activeTab === tab.name ? "text-white" : "text-gray-500"
              }`}
            />
            {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
          </button>
        </li>
      ))}

      {/* Logout */}
      <li className="pt-2 border-t border-gray-200 mt-4">
        <button
          onClick={() => {
            handleLogout();
            setSidebarOpen(false);
          }}
          className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5 mr-2 text-gray-500" /> Logout
        </button>
      </li>
    </ul>
  </nav>
</aside>


      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-11 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-0 lg:ml-0">
        {renderContent()}
      </main>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 w-full bg-white px-4 py-3 border-b lg:hidden flex justify-between items-center z-40">
        <h2 className="font-semibold text-lg">Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
