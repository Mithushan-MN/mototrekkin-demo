// import React, { useState, useContext } from "react";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   Calendar,
//   MapPin,
//   CreditCard,
//   User,
//   Ticket,
//   LogOut,
//   Bike,
//   ToolCase,
// } from "lucide-react";
// import UserOrders from "../../components/dashboard/UserOrders";
// import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
// import Address from "../../components/dashboard/Address";
// import Payment from "../../components/dashboard/Payment";
// import AccountDetails from "../../components/dashboard/AccountDetails";
// import Vouchers from "../../components/dashboard/Vouchers";
// import UserDashboardDefaultData from "../../components/dashboard/UserDashboardDefaultData";
// import { AuthContext } from "../../components/AuthContext"
// import UserEventsNZSIRegistration from "../../components/dashboard/BikeHire";
// import TrainingBookings from "../../components/dashboard/TrainingBookings";

// const UserDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const handleLogout = () => {
//     logout();
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <UserDashboardDefaultData />;
//       case "orders":
//         return <UserOrders />;
//       case "Bike Hire":
//         return <UpcomingEvents />; 
//       case "events":
//         return <UserEventsNZSIRegistration />;
//       case "TrainingBookings":
//         return <TrainingBookings />;
//       case "address":
//         return <Address />;
//       case "payment":
//         return <Payment />;
//       case "account":
//         return <AccountDetails />;
//       case "vouchers":
//         return <Vouchers />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       <aside className="w-64 bg-white border-r">
//         <div className="p-6 flex flex-col items-center">
//           <h2 className="font-semibold text-lg mb-2">{user?.fullName || user?.email}</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-1 rounded"
//           >
//             LOGOUT
//           </button>
//         </div>
//         <nav className="px-4">
//           <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => setActiveTab("dashboard")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "dashboard"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("orders")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "orders"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <ToolCase className="w-5 h-5 mr-2" /> Bike Serivice
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("Bike Hire")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "Bike Hire"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Bike className="w-5 h-5 mr-2" /> Bike Hires
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("events")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "events"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Calendar className="w-5 h-5 mr-2" /> Events
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("TrainingBookings")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "TrainingBookings"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Bike className="w-5 h-5 mr-2" /> TrainingBookings
//               </button>
//             </li>
//             {/* <li>
//               <button
//                 onClick={() => setActiveTab("address")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "address"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <MapPin className="w-5 h-5 mr-2" /> Address
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("payment")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "payment"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <CreditCard className="w-5 h-5 mr-2" /> Payment Methods
//               </button>
//             </li> */}
//             <li>
//               <button
//                 onClick={() => setActiveTab("account")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "account"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <User className="w-5 h-5 mr-2" /> Account Details
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveTab("vouchers")}
//                 className={`flex items-center w-full px-3 py-2 rounded-lg ${
//                   activeTab === "vouchers"
//                     ? "bg-yellow-100 text-yellow-700 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Ticket className="w-5 h-5 mr-2" /> Vouchers
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//               >
//                 <LogOut className="w-5 h-5 mr-2" /> Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="flex-1 p-8">{renderContent()}</main>
//     </div>
//   );
// };

// export default UserDashboard;

import axios from "../../axiosConfig";   // ← ADD THIS IMPORT (top with others)
import React, { useState, useContext, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  LogOut,
  Bike,
  ToolCase,
  Menu,
  X,
  User,
} from "lucide-react";
import UserOrders from "../../components/dashboard/UserOrders";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import AccountDetails from "../../components/dashboard/AccountDetails";
import Vouchers from "../../components/dashboard/Vouchers";
import UserDashboardDefaultData from "../../components/dashboard/UserDashboardDefaultData";
import { AuthContext } from "../../components/AuthContext";
import UserEventsNZSIRegistration from "../../components/dashboard/BikeHire";
import TrainingBookings from "../../components/dashboard/TrainingBookings";
import FutureEvents from "../../components/dashboard/FutureEvents";
import MyGarage from "../../components/dashboard/MyGarage";
import PastEvents from "../../components/dashboard/PastEvent";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null); // ← NEW: to hold photoUrl

  useEffect(() => {
  const fetchProfilePhoto = async () => {
    try {
      const userId = localStorage.getItem("userId") || JSON.parse(localStorage.getItem("user"))?.id;
      if (!userId) return;
      const { data } = await axios.get(`/api/userProfile/${userId}`);
      setProfile(data);
    } catch (err) {
      console.log("Profile photo not loaded");
    }
  };
  fetchProfilePhoto();
}, []);

  const handleLogout = () => logout();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <UserDashboardDefaultData />;
      case "orders":
        return <UserOrders />;
      case "Bike Hire":
        return <UpcomingEvents />;
      case "events":
        return <UserEventsNZSIRegistration />;
      case "future events":
        return <FutureEvents />;
      case "past events":
        return <PastEvents />;
      case "Rider Training":
        return <TrainingBookings />;
      case "account":
        return <AccountDetails />;
      case "My Garage":
        return <MyGarage />;
      case "vouchers":
        return <Vouchers />;
      default:
        return null;
    }
  };

  const menuItems = [
    { name: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { name: "account", icon: User, label: "Personal Details" },
    { name: "future events", icon: Calendar, label: "Future Events" },
    // { name: "past events", icon: Calendar, label: "Past Events" },
    { name: "events", icon: Calendar, label: "My Events" },
    { name: "Rider Training", icon: Bike, label: "Rider Training" },
    { name: "orders", icon: ToolCase, label: "Bike Service" },
    { name: "Bike Hire", icon: Bike, label: "Bike Hires" },
    { name: "My Garage", icon: Bike, label: "My Garage" },
    { name: "vouchers", icon: Ticket, label: "Vouchers" },
  ];

  // ADD THIS AVATAR COMPONENT (anywhere inside the component, before return)
const Avatar = ({ size = "lg" }) => {
  const sizeClass = size === "lg" ? "w-20 h-20 text-3xl" : "w-12 h-12 text-lg";
  const name = user?.fullName || user?.email || "User";
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return profile?.photoUrl ? (
    <img
      src={profile.photoUrl}
      alt={name}
      className={`${sizeClass} rounded-full object-cover border-4 border-white shadow-lg`}
    />
  ) : (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg`}>
      {initials}
    </div>
  );
};


  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
<aside
  className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 
  bg-white/80 backdrop-blur-md border-r border-gray-200 
  shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
   transform lg:translate-x-0
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  transition-transform duration-300 ease-in-out`}
>
  {/* Mobile Header (inside sidebar) */}
  <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
    <h2 className="font-semibold text-lg text-gray-800">
      {user?.fullName || user?.email || "User"}
    </h2>
    <button onClick={() => setSidebarOpen(false)}>
      <X size={24} className="text-gray-700" />
    </button>
  </div>

  {/* User Info */}
  <div className="p-6 pt-20 lg:pt-5 flex flex-col items-center border-b border-gray-200">
  <Avatar size="lg" />
  <h2 className="font-semibold text-lg mt-3 text-gray-800 text-center">
    {user?.fullName || user?.email}
  </h2>
</div>

  {/* Navigation */}
  <nav className="flex-1 px-4 mt-6 overflow-y-auto">
    <ul className="space-y-2 pb-20">
      {menuItems.map((item) => (
        <li key={item.name}>
          <button
            onClick={() => {
              setActiveTab(item.name);
              setSidebarOpen(false);
            }}
            className={`flex items-center w-full px-3 py-2 rounded-xl transition-all duration-200
              ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <item.icon
              className={`w-5 h-5 mr-2 ${
                activeTab === item.name ? "text-white" : "text-gray-500"
              }`}
            />
            {item.label}
          </button>
        </li>
    ))}
  </ul>

     {/* Logout — Pinned to bottom */}
  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
    >
      <LogOut className="w-5 h-5 mr-3" />
      Logout
    </button>
  </div>
  </nav>
</aside>

{/* Black overlay for mobile */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  ></div>
)}



      {/* Black overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-1 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 p-4 lg:p-8 ml-0 lg:ml-0">
        {renderContent()}
      </main>

      {/* Mobile top bar (outside sidebar) */}
<div className="fixed left-0 w-full bg-white px-4 py-3 border-b lg:hidden flex justify-between items-center z-40 shadow-sm">
  <div className="flex items-center gap-3">
    <Avatar size="sm" />
    <div>
      <h2 className="font-semibold text-gray-800">
        {user?.fullName || user?.email || "User"}
      </h2>
    </div>
  </div>
  <button onClick={() => setSidebarOpen(!sidebarOpen)}>
    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>

    </div>
  );
};

export default UserDashboard;
