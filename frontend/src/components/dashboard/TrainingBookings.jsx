import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { format } from 'date-fns';

const TrainingBookings = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log('TrainingBookings: Fetching user MDP Phase II registrations');
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await axios.get('/api/mdpPhase2Registrations/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('TrainingBookings: Response received', response.data.length, 'registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('TrainingBookings: Fetch error', err.response?.data || err.message);
        let errorMessage = 'Failed to fetch training bookings';

        if (err.response?.status === 401) {
          errorMessage = 'Authentication required. Please log in.';
        } else if (err.response?.status === 404) {
          errorMessage = 'No training bookings found.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // ────────────── LOADING ──────────────
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

  // ────────────── ERROR ──────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">Warning</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ────────────── MAIN UI ──────────────
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px- max-w-6xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My MDP Phase III Training Bookings
          </h1>
          <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            {registrations.length} booking{registrations.length !== 1 ? 's' : ''}
          </span>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">Calendar</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training bookings yet</h3>
            <p className="text-gray-500 mb-6">
              Your MDP Phase II training bookings will appear here once submitted.
            </p>
            <a
              href="/mdp-phase2-registration"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Book Training Now
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
                    Training Location
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Date
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bike
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((reg) => {
                  const isHire = reg.bikeDetails?.bikeChoice === 'hire';
                  const bikeText = isHire
                    ? reg.bikeDetails?.hireBike || 'Hired Bike'
                    : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''} ${reg.bikeDetails?.bikeYear || ''}`.trim() || 'Own Bike';

                  return (
                    <tr key={reg._id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {`${reg.personalDetails.firstName} ${reg.personalDetails.lastName}`}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                        {reg.personalDetails.email}
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
                        ${reg.payment.totalPayment?.toFixed(2) || '0.00'}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            reg.payment.paymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : reg.payment.paymentStatus === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {reg.payment.paymentStatus || 'Pending'}
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
        )}
      </div>
    </div>
  );
};

export default TrainingBookings;