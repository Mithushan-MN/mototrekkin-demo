import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { format } from 'date-fns';

const TrainingBookings = () => {
  const [phase1Registrations, setPhase1Registrations] = useState([]);
  const [phase2Registrations, setPhase2Registrations] = useState([]);
  const [phase3Registrations, setPhase3Registrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all 3 phases
        const [phase1Res, phase2Res, phase3Res] = await Promise.all([
          axios.get('/mdpPhase1Registrations/user', { headers }),
          axios.get('/mdpPhase2Registrations/user', { headers }),
          axios.get('/mdpPhase3Registrations/user', { headers }), // ← Phase 3
        ]);

        console.log('User bookings loaded:', {
          phase1: phase1Res.data.length,
          phase2: phase2Res.data.length,
          phase3: phase3Res.data.length,
        });

        setPhase1Registrations(phase1Res.data);
        setPhase2Registrations(phase2Res.data);
        setPhase3Registrations(phase3Res.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        let errorMessage = 'Failed to load your training bookings';

        if (err.response?.status === 401) {
          errorMessage = 'Please log in to view your bookings.';
        } else if (err.response?.status === 403) {
          errorMessage = 'You do not have permission to view this.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchUserRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your training bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const hasAnyBookings =
    phase1Registrations.length > 0 ||
    phase2Registrations.length > 0 ||
    phase3Registrations.length > 0;

  const renderTable = (regs, title, registrationLink) => {
    if (regs.length === 0) return null;

    return (
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            {regs.length} booking{regs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regs.map((reg) => {
                const isHire = reg.bikeDetails?.bikeChoice === 'hire';
                const bikeText = isHire
                  ? reg.bikeDetails?.hireBike || 'Hired Bike'
                  : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''} ${reg.bikeDetails?.bikeYear || ''}`.trim() || 'Own Bike';

                return (
                  <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {reg.personalDetails?.firstName} {reg.personalDetails?.lastName}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                      {reg.personalDetails?.email || '—'}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {reg.trainingState || '—'}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                      {reg.trainingDate || '—'}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                      {bikeText}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                      ${(reg.payment?.totalPayment || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          reg.payment?.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : reg.payment?.paymentStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reg.payment?.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(reg.createdAt), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My MDP Training Bookings</h1>
          <p className="text-gray-600">
            View all your Masterclass Development Program registrations (Phase I, II & III)
          </p>
        </div>

        {/* Phase I */}
        {renderTable(phase1Registrations, 'MDP Phase I')}

        {/* Phase II */}
        {renderTable(phase2Registrations, 'MDP Phase II')}

        {/* Phase III */}
        {renderTable(phase3Registrations, 'MDP Phase III')}

        {/* No bookings at all */}
        {phase1Registrations.length === 0 &&
         phase2Registrations.length === 0 &&
         phase3Registrations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-400 text-7xl mb-6">📅</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Training Bookings Yet</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              You haven't registered for any MDP training sessions yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mdp-phase1-registration"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow transition"
              >
                Book Phase I
              </a>
              <a
                href="/mdp-phase2-registration"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow transition"
              >
                Book Phase II
              </a>
              <a
                href="/mdp-phase3-registration"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow transition"
              >
                Book Phase III
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingBookings;