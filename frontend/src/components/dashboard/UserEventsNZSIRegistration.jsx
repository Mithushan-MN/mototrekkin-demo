import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { format } from 'date-fns';

const UserEventsNZSIRegistration = () => {
  const [nzsiRegistrations, setNzsiRegistrations] = useState([]);
  const [ridgeRegistrations, setRidgeRegistrations] = useState([]);
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

        // Fetch both events
        const [nzsiRes, ridgeRes] = await Promise.all([
          axios.get('/nzsiRegistrations/user', { headers }),
          axios.get('/RidgeRiderVIRegistrations/user', { headers }),
        ]);

        console.log('User event registrations loaded:', {
          nzsi: nzsiRes.data.length,
          ridgeRiderVI: ridgeRes.data.length,
        });

        setNzsiRegistrations(Array.isArray(nzsiRes.data) ? nzsiRes.data : []);
        setRidgeRegistrations(Array.isArray(ridgeRes.data) ? ridgeRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        let errorMessage = 'Failed to load your event registrations';

        if (err.response?.status === 401) {
          errorMessage = 'Please log in to view your registrations.';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your event registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Registrations</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const hasNzsi = nzsiRegistrations.length > 0;
  const hasRidge = ridgeRegistrations.length > 0;

  const renderTable = (regs, title, registerLink) => {
    if (regs.length === 0) return null;

    return (
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {regs.length} registration{regs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accommodation</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payment</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regs.map((reg) => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {`${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reg.personalDetails?.email || '—'}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {reg.accommodation?.accommodationPreference || '—'}
                    </span>
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
              ))}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Event Registrations</h1>
          <p className="text-gray-600">
            View all your upcoming event registrations (NZ South Island & Ridge Rider VI)
          </p>
        </div>

        {/* NZ South Island Section */}
        {renderTable(nzsiRegistrations, 'NZ South Island 2026', '/nzsi-registration')}

        {/* Ridge Rider VI Section */}
        {renderTable(ridgeRegistrations, 'Ridge Rider VI', '/ridgerider-vi-registration')} {/* ← adjust link if needed */}

        {/* No registrations at all */}
        {nzsiRegistrations.length === 0 && ridgeRegistrations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-400 text-7xl mb-6">📋</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Event Registrations Yet</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              You don’t have any event tickets yet. Register now to secure your spot!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/nzsi-registration"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Register for NZ South Island
              </a>
              <a
                href="/ridgerider-vi-registration" // ← adjust to your actual route
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
              >
                Register for Ridge Rider VI
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEventsNZSIRegistration;