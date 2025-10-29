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


import React, { useState, useContext } from "react";
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

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      case "TrainingBookings":
        return <TrainingBookings />;
      case "account":
        return <AccountDetails />;
      case "vouchers":
        return <Vouchers />;
      default:
        return null;
    }
  };

  const menuItems = [
    { name: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { name: "orders", icon: ToolCase, label: "Bike Service" },
    { name: "Bike Hire", icon: Bike, label: "Bike Hires" },
    { name: "events", icon: Calendar, label: "Events" },
    { name: "TrainingBookings", icon: Bike, label: "Training Bookings" },
    { name: "account", icon: User, label: "Account Details" },
    { name: "vouchers", icon: Ticket, label: "Vouchers" },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 relative">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b lg:hidden">
        <h2 className="font-semibold text-lg">
          {user?.fullName || user?.email || "User"}
        </h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-lg z-50 transform 
        lg:relative lg:z-auto lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 flex flex-col items-center border-b">
          <h2 className="font-semibold text-lg mb-2">
            {user?.fullName || user?.email}
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            LOGOUT
          </button>
        </div>

        <nav className="px-4 mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    setActiveTab(item.name);
                    setSidebarOpen(false); // close sidebar on mobile
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg ${
                    activeTab === item.name
                      ? "bg-yellow-100 text-yellow-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Black overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8">{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;
