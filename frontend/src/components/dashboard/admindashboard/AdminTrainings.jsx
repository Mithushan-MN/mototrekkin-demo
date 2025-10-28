import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import { format } from 'date-fns';

const AdminTrainings = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reg: null });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        console.log('AdminTrainings: Fetching all MDP Phase 2 registrations');
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Admin authentication required');

        const response = await axios.get('/api/mdpPhase2Registrations/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('AdminTrainings: Loaded', response.data.length, 'registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('AdminTrainings: Error', err.response?.data || err.message);
        const msg =
          err.response?.status === 403
            ? 'Admin access required.'
            : err.response?.status === 401
            ? 'Please log in as admin.'
            : err.response?.data?.message || 'Failed to load trainings';
        setError(msg);
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  // ────────────── EDIT MODAL HANDLERS ──────────────
  const openEditModal = (reg) => {
    setEditModal({ open: true, reg: { ...reg } });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, reg: null });
  };

  const handleUpdate = async () => {
    if (!editModal.reg) return;
    try {
      const res = await axios.put(
        `/api/mdpPhase2Registrations/${editModal.reg._id}`,
        editModal.reg,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRegistrations((prev) =>
        prev.map((r) => (r._id === editModal.reg._id ? res.data : r))
      );
      closeEditModal();
      alert('Registration updated successfully');
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // ────────────── DELETE HANDLER ──────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/mdpPhase2Registrations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // ────────────── RESEND PAYMENT LINK ──────────────
  const handleResendPayment = async (reg) => {
    try {
      await axios.post(
        `/api/mdpPhase2Registrations/resend-payment/${reg._id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Payment link sent to ${reg.personalDetails.email}`);
    } catch (err) {
      alert('Failed to resend: ' + (err.response?.data?.message || err.message));
    }
  };

  // ────────────── EXPORT CSV ──────────────
  const exportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Training Location',
      'Training Date',
      'Bike',
      'Total',
      'Payment Status',
      'Created',
    ];
    const rows = registrations.map((r) => {
      const bike = r.bikeDetails?.bikeChoice === 'hire'
        ? r.bikeDetails?.hireBike || 'Hired'
        : `${r.bikeDetails?.bikeMake || ''} ${r.bikeDetails?.bikeModel || ''} ${r.bikeDetails?.bikeYear || ''}`
            .trim() || 'Own Bike';
      return [
        `${r.personalDetails.firstName} ${r.personalDetails.lastName}`,
        r.personalDetails.email,
        r.trainingState || '',
        r.trainingDate || '',
        bike,
        r.payment.totalPayment?.toFixed(2) || '0.00',
        r.payment.paymentStatus || 'Pending',
        format(new Date(r.createdAt), 'yyyy-MM-dd'),
      ];
    });

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mdp-phase2-registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  // ────────────── UI STATES ──────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading training registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">Warning</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            MDP Phase III Training Registrations
          </h1>
          <div className="flex gap-3">
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium self-center">
              {registrations.length} total
            </span>
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Empty State */}
        {registrations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">Calendar</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations yet</h3>
            <p className="text-gray-500">Training bookings will appear here.</p>
          </div>
        ) : (
          /* Table */
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
                    Location
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bike
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((reg) => {
                  const isHire = reg.bikeDetails?.bikeChoice === 'hire';
                  const bikeText = isHire
                    ? reg.bikeDetails?.hireBike || 'Hired'
                    : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''} ${reg.bikeDetails?.bikeYear || ''}`
                        .trim() || 'Own Bike';

                  return (
                    <tr key={reg._id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {`${reg.personalDetails.firstName} ${reg.personalDetails.lastName}`}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
  {reg.personalDetails?.email ? (
    <a
      href={`mailto:${reg.personalDetails.email}`}
      className="text-blue-600 hover:underline"
    >
      {reg.personalDetails.email}
    </a>
  ) : (
    "N/A"
  )}
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
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openEditModal(reg)}
                          className="text-green-600 hover:text-green-900 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleResendPayment(reg)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Resend
                        </button>
                        <button
                          onClick={() => handleDelete(reg._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ────────────── EDIT MODAL ────────────── */}
        {editModal.open && editModal.reg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Edit Registration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails.firstName || ''}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: {
                          ...editModal.reg,
                          personalDetails: {
                            ...editModal.reg.personalDetails,
                            firstName: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails.lastName || ''}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: {
                          ...editModal.reg,
                          personalDetails: {
                            ...editModal.reg.personalDetails,
                            lastName: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editModal.reg.personalDetails.email || ''}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: {
                          ...editModal.reg,
                          personalDetails: {
                            ...editModal.reg.personalDetails,
                            email: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Location</label>
                  <input
                    type="text"
                    value={editModal.reg.trainingState || ''}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: { ...editModal.reg, trainingState: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Date</label>
                  <input
                    type="text"
                    value={editModal.reg.trainingDate || ''}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: { ...editModal.reg, trainingDate: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={editModal.reg.payment.paymentStatus || 'Pending'}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: {
                          ...editModal.reg,
                          payment: {
                            ...editModal.reg.payment,
                            paymentStatus: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Payment ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editModal.reg.payment.totalPayment || 0}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        reg: {
                          ...editModal.reg,
                          payment: {
                            ...editModal.reg.payment,
                            totalPayment: parseFloat(e.target.value) || 0,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closeEditModal}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrainings;