// import { useState, useEffect } from "react";
// import { User, Menu, X } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import logo from "../assets/MT.webp";

// export default function Navbar({ onUserClick, loggedInUser }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   useEffect(() => {
//     if (loggedInUser) setUser(loggedInUser);
//   }, [loggedInUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setProfileOpen(false);
//   };

//   return (
//     <nav className="bg-black text-yellow-500 px-6 py-3 sticky top-0 z-50 shadow-lg">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex-shrink-0">
//           <NavLink to="/">
//             <img src={logo} alt="logo" className="w-32 h-auto" />
//           </NavLink>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex space-x-8 text-sm font-medium">
//           <a href="/motorcycle-adventures" className="hover:text-yellow-400">Adventures</a>
//           <a href="/MotorcycleHire" className="hover:text-yellow-400">Hire</a>
//           <a href="/mototrekkin-videos" className="hover:text-yellow-400">Videos</a>
//           <a href="https://store.mototrekkin.com.au/" className="hover:text-yellow-400">Shop</a>
//           <a href="/training" className="hover:text-yellow-400">Training</a>
//           <a href="https://store.mototrekkin.com.au/tyres/" className="hover:text-yellow-400">Tyres</a>
//           <a href="/services" className="hover:text-yellow-400">Service</a>
//           <a href="tel:0240724511" className="hover:text-yellow-400">02 4072 4511</a>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4 relative">
//           {!user ? (
//             <button
//               onClick={onUserClick}
//               className="p-2 rounded-full hover:bg-yellow-600 transition cursor-pointer"
//             >
//               <User size={24} />
//             </button>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700 transition"
//               >
//                 My Account
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 p-4 text-white">
//                   <p className="font-semibold truncate">{user.fullName}</p>
//                   <p className="text-sm text-gray-300 truncate mb-2">{user.email}</p>

//                   <NavLink
//                     to={user.role === "admin" ? "/admin/dashboard" : "/userdashboard"}
//                     className="block w-full text-center py-1 mb-2 bg-blue-600 rounded hover:bg-blue-700"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     {user.role === "admin" ? "Admin Panel" : "User Panel"}
//                   </NavLink>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full py-1 bg-red-600 rounded hover:bg-red-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-yellow-500 hover:text-yellow-400"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="lg:hidden mt-4 flex flex-col items-center space-y-4 py-4 bg-black border-t border-gray-800">
//           <a href="/motorcycle-adventures" className="hover:text-yellow-400">Adventures</a>
//           <a href="/MotorcycleHire" className="hover:text-yellow-400">Hire</a>
//           <a href="/mototrekkin-videos" className="hover:text-yellow-400">Videos</a>
//           <a href="https://store.mototrekkin.com.au/" className="hover:text-yellow-400">Shop</a>
//           <a href="/training" className="hover:text-yellow-400">Training</a>
//           <a href="https://store.mototrekkin.com.au/tyres/" className="hover:text-yellow-400">Tyres</a>
//           <a href="/services" className="hover:text-yellow-400">Service</a>
//           <a href="tel:0240724511" className="hover:text-yellow-400">02 4072 4511</a>
//         </div>
//       )}
//     </nav>
//   );
// }




import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import logo from "../assets/MT.webp";
import { AuthContext } from "./AuthContext";

export default function Navbar({ onUserClick }) {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-black text-yellow-500 px-6 py-3 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-44 h-auto" />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-sm font-medium">
          <NavLink
            to="/motorcycle-adventures"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
          >
            Adventures
          </NavLink>
          <NavLink
            to="/MotorcycleHire"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
          >
            Hire
          </NavLink>
          <NavLink
            to="/mototrekkin-videos"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
          >
            Videos
          </NavLink>
          <a
            href="https://store.mototrekkin.com.au/"
            className="hover:text-yellow-400"
          >
            Shop
          </a>
          <NavLink
            to="/training"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
          >
            Training
          </NavLink>
          <a
            href="https://store.mototrekkin.com.au/tyres/"
            className="hover:text-yellow-400"
          >
            Tyres
          </a>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
          >
            Service
          </NavLink>
          <a href="tel:0240724511" className="hover:text-yellow-400">
            02 4072 4511
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {!isAuthenticated ? (
            <button
              onClick={onUserClick}
              className="p-2 rounded-full hover:bg-yellow-600 transition cursor-pointer"
            >
              <User size={24} />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="px-3 py-1 text-white bg-yellow-600 rounded hover:bg-yellow-700 transition"
              >
                My Account
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 p-4 text-white">
                  <p className="font-semibold truncate">{user.fullName}</p>
                  <p className="text-sm text-gray-300 truncate mb-2">
                    {user.email}
                  </p>

                  <NavLink
                    to={user.role === "admin" ? "/admin/dashboard" : "/userdashboard"}
                    className="block w-full text-center py-1 mb-2 bg-yellow-600 rounded hover:bg-yellow-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    {user.role === "admin" ? "Admin Panel" : "User Panel"}
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full py-1 bg-red-600 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-yellow-500 hover:text-yellow-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-center space-y-4 py-4 bg-black border-t border-gray-800">
          <NavLink
            to="/motorcycle-adventures"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
            onClick={() => setIsOpen(false)}
          >
            Adventures
          </NavLink>
          <NavLink
            to="/MotorcycleHire"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
            onClick={() => setIsOpen(false)}
          >
            Hire
          </NavLink>
          <NavLink
            to="/mototrekkin-videos"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
            onClick={() => setIsOpen(false)}
          >
            Videos
          </NavLink>
          <a
            href="https://store.mototrekkin.com.au/"
            className="hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </a>
          <NavLink
            to="/training"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
            onClick={() => setIsOpen(false)}
          >
            Training
          </NavLink>
          <a
            href="https://store.mototrekkin.com.au/tyres/"
            className="hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            Tyres
          </a>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-yellow-400"
            }
            onClick={() => setIsOpen(false)}
          >
            Service
          </NavLink>
          <a
            href="tel:0240724511"
            className="hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            02 4072 4511
          </a>
        </div>
      )}
    </nav>
  );
}