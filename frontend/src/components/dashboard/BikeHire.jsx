import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { format } from 'date-fns';

const UserEventsNZSIRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log('UserEventsNZSIRegistration: Fetching user registrations');
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await axios.get('/api/nzsiRegistrations/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('UserEventsNZSIRegistration: Response received', response.data.length, 'registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('UserEventsNZSIRegistration: Fetch error', err.response?.data || err.message);
        let errorMessage = 'Failed to fetch registrations';
        
        if (err.response?.status === 401) {
          errorMessage = 'Authentication required. Please log in.';
        } else if (err.response?.status === 404) {
          errorMessage = 'No registrations found.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };
    
    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Registrations</h2>
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My NZ South Island 2025 Registrations
          </h1>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {registrations.length} registration{registrations.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {registrations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-500">Your registrations will appear here once submitted.</p>
            <a
              href="/nzsi-registration"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Register Now
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accommodation
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Payment
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {`${reg.personalDetails.firstName} ${reg.personalDetails.lastName}`}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reg.personalDetails.email}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {reg.accommodation.accommodationPreference}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                      ${reg.payment.totalPayment?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          reg.payment.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {reg.payment.paymentStatus || 'Pending'}
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
        )}
      </div>
    </div>
  );
};

export default UserEventsNZSIRegistration;