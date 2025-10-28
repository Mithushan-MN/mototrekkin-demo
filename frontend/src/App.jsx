// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Footer from './components/Footer';
// import MotorcycleAdventure from './pages/MotorcycleAdventure';
// import EventCalendar2025 from './pages/EventCalendar2025';
// import NzSouthIsland2025 from './components/events/NzSouthIsland2025';
// import EventCalendar2026 from './pages/ventCalendar2026';
// import RidgeRider2026 from './components/events/RidgeRider2026';
// import NzSouthIsland2026 from './components/events/NzSouthIsland2026';
// import MotorcycleHire from './pages/MotorcycleHire';
// import Videos from './pages/Videos';

// import AuthModal from './components/AuthModal';   // ✅ import modal
// import MotorcycleAdventureOnroad from './pages/MotorcycleAdventureOnroad';
// import OnroadEventCalendar2025 from './pages/OnroadEventCalendar2025';
// import RoadRallye2025Onroad from './components/events/RoadRallye2025Onroad';
// import HearingProtection from './pages/HearingProtection';
// import EarMoldBooking from './pages/EarMoldBooking';
// import TrainingPage from './pages/TrainingPage';
// import OffRoadTrainingDetailPage from './pages/OffRoadTrainingDetailPage';
// import RegistrationPage from './pages/RegistrationPage';

// import ServicesPage from './pages/services';
// import ServiceBookingForm from './components/serviceBookingForm';
// import UserDashboard from './pages/dashboard/UserDashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import MDPPhase2RegistrationPage from './components/bookingforms/MDPPhase2RegistrationPage';
// import MDPPhase3RegistrationPage from './components/bookingforms/MDPPhase3RegistrationPage';




// const App = () => {

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [isAuthOpen, setIsAuthOpen] = useState(false);

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         {/* Pass modal control to Navbar */}
//         <Navbar onUserClick={() => setIsAuthOpen(true)} />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/motorcycle-adventures" element={<MotorcycleAdventure />} />
//           <Route path="/motorcycle-adventures-onroad" element={<MotorcycleAdventureOnroad />} />
//           <Route path="/event-calendar-2025" element={<EventCalendar2025 />} />
//           <Route path="/event-calendar-2026" element={<EventCalendar2026 />} />
//           <Route path="/onroad-event-calendar-2025" element={<OnroadEventCalendar2025 />} />
//           <Route path="/MotorcycleHire" element={<MotorcycleHire />} />
//           <Route path="/mototrekkin-videos" element={<Videos />} />
//           <Route path="/hearing-protection" element={<HearingProtection/>} />
//           <Route path="/hearing-protection/ear-mold-booking" element={<EarMoldBooking/>} />

//           <Route path="/event-calendar-2025/NzSouthIsland2025" element={<NzSouthIsland2025 />} />
//           <Route path="/event-calendar-2026/NzSouthIsland2026" element={<NzSouthIsland2026 />} />
//           <Route path="/event-calendar-2026/RidgeRider2026" element={<RidgeRider2026 />} />
//           <Route path="/onroad-event-calendar-2025/RoadRallye2025Onroad" element={<RoadRallye2025Onroad />} />


//           <Route path="/training" element={<TrainingPage />} />
//           <Route path="/off-road-training-detail" element={<OffRoadTrainingDetailPage />} />
//           <Route path="/registration" element={<RegistrationPage />} />

//            <Route path="/services" element ={<ServicesPage/>}/>
//            <Route path="/service-booking-form" element ={<ServiceBookingForm/>}/>
//                <Route path="/registration-mdp-phase-2" element={<MDPPhase2RegistrationPage />} />
//           <Route path="/registration-mdp-phase-3" element={<MDPPhase3RegistrationPage />} />


//            <Route path="/userdashboard" element={<UserDashboard />} />
//            <Route path="admin/dashboard" element={<AdminDashboard />} />


//         </Routes>

//         <Footer />

//         {/* Auth Modal */}
//         <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;



import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import MotorcycleAdventure from './pages/MotorcycleAdventure';
import EventCalendar2025 from './pages/EventCalendar2025';
import NzSouthIsland2025 from './components/events/NzSouthIsland2025';
import EventCalendar2026 from './pages/ventCalendar2026';
import RidgeRider2026 from './components/events/RidgeRider2026';
import NzSouthIsland2026 from './components/events/NzSouthIsland2026';
import MotorcycleHire from './pages/MotorcycleHire';
import Videos from './pages/Videos';
import AuthModal from './components/AuthModal';
import MotorcycleAdventureOnroad from './pages/MotorcycleAdventureOnroad';
import OnroadEventCalendar2025 from './pages/OnroadEventCalendar2025';
import RoadRallye2025Onroad from './components/events/RoadRallye2025Onroad';
import HearingProtection from './pages/HearingProtection';
import EarMoldBooking from './pages/EarMoldBooking';
import TrainingPage from './pages/TrainingPage';
import OffRoadTrainingDetailPage from './pages/OffRoadTrainingDetailPage';

import ServicesPage from './pages/services';
import ServiceBookingForm from './components/serviceBookingForm';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MDPPhase2RegistrationPage from './components/bookingforms/MDPPhase2RegistrationPage';
import MDPPhase3RegistrationPage from './components/bookingforms/MDPPhase3RegistrationPage';
// import NZSIRegistrationForm from './components/nzsi/NZSIRegistrationForm';
import { AuthContext, AuthProvider } from "../src/components/AuthContext"
import ProtectedRoute from '../src/components/ProtectedRoute';
import NZSIRegistrationFormRefactored from './components/bookingforms/nzsi/NZSIRegistrationFormRefactored';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import RegistrationPage from './components/bookingforms/RegistrationPage';
import MDPPhase2Registration from './components/bookingforms/MDPphase2/MDPPhase2Registration';



// Child component to use AuthContext
const AppContent = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.openAuthModal && !isAuthenticated) {
      setIsAuthOpen(true);
    }
  }, [location, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onUserClick={() => setIsAuthOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motorcycle-adventures" element={<MotorcycleAdventure />} />
         {/* <Route path="/adventures/nzsi-2025/registration" element={<NZSIRegistrationForm />} /> */}
         <Route path="/adventures/nzsi-2025/registration" element={<ProtectedRoute element={<NZSIRegistrationFormRefactored />} requiredRole="user" />}
         />
        <Route
          path="/motorcycle-adventures-onroad"
          element={<MotorcycleAdventureOnroad />}
        />
        <Route path="/event-calendar-2025" element={<EventCalendar2025 />} />
        <Route path="/event-calendar-2026" element={<EventCalendar2026 />} />
        <Route
          path="/onroad-event-calendar-2025"
          element={<OnroadEventCalendar2025 />}
        />
        <Route path="/MotorcycleHire" element={<MotorcycleHire />} />
        <Route path="/mototrekkin-videos" element={<Videos />} />
        <Route path="/hearing-protection" element={<HearingProtection />} />
        <Route
          path="/hearing-protection/ear-mold-booking"
          element={<EarMoldBooking />}
        />
        <Route
          path="/event-calendar-2025/NzSouthIsland2025"
          element={<NzSouthIsland2025 />}
        />
        <Route
          path="/event-calendar-2026/NzSouthIsland2026"
          element={<NzSouthIsland2026 />}
        />
        <Route
          path="/event-calendar-2026/RidgeRider2026"
          element={<RidgeRider2026 />}
        />
        <Route
          path="/onroad-event-calendar-2025/RoadRallye2025Onroad"
          element={<RoadRallye2025Onroad />}
        />
        <Route path="/training" element={<TrainingPage />} />
        <Route
          path="/off-road-training-detail"
          element={<OffRoadTrainingDetailPage />}
        />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/service-booking-form"
          element={<ProtectedRoute element={<ServiceBookingForm />} requiredRole="user" />}
        />
        {/* <Route
          path="/registration-mdp-phase-2"
          element={<MDPPhase2RegistrationPage />}
        /> */}
        <Route
          path="/registration-mdp-phase-3"
          element={<ProtectedRoute element={<MDPPhase2Registration />}requiredRole="user" />}
        />
        {/* <Route
          path="/registration-mdp-phase-3"
          element={<MDPPhase3RegistrationPage />}
        /> */}
        <Route
          path="/userdashboard"
          element={<ProtectedRoute element={<UserDashboard />} requiredRole="user" />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
        />
          <Route
          path="/success"
          element={<SuccessPage />}
        />
      <Route
          path="/cancel"
          element={<CancelPage />}
        />
        
      </Routes>

    

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;