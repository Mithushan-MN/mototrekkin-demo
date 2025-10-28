// components/AdminEventsNZSIRegistration.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import { format } from 'date-fns';

const AdminEventsNZSIRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reg: null });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Login required');

        const response = await axios.get('/api/nzsiRegistrations/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(response.data) ? response.data : [];
        setRegistrations(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load');
        setRegistrations([]);
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const openEditModal = (reg) => {
    setEditModal({ open: true, reg: { ...reg } });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, reg: null });
  };

  const updateField = (section, field, value) => {
    setEditModal({
      ...editModal,
      reg: {
        ...editModal.reg,
        [section]: {
          ...editModal.reg[section],
          [field]: value,
        },
      },
    });
  };

  const handleUpdate = async () => {
    if (!editModal.reg) return;

    const payload = {
      licenceValid: editModal.reg.licenceDetails?.licenceValid || 'No',
      licenceNumber: editModal.reg.licenceDetails?.licenceNumber || '',
      licenceExpiryDate: editModal.reg.licenceDetails?.licenceExpiryDate?.split('T')[0] || '',
      licenceState: editModal.reg.licenceDetails?.licenceState || '',
      personalDetails: JSON.stringify(editModal.reg.personalDetails),
      motorcycle: JSON.stringify(editModal.reg.motorcycle),
      payment: JSON.stringify({
        paymentStatus: editModal.reg.payment?.paymentStatus,
        totalPayment: editModal.reg.payment?.totalPayment,
      }),
    };

    try {
      const res = await axios.put(
        `/api/nzsiRegistrations/${editModal.reg._id}`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRegistrations(prev => prev.map(r => r._id === editModal.reg._id ? res.data.registration : r));
      closeEditModal();
      alert('Updated successfully');
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try {
      await axios.delete(`/api/nzsiRegistrations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRegistrations(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleResendPayment = async (reg) => {
    try {
      const res = await axios.post(`/api/nzsiRegistrations/resend-payment/${reg._id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(`Payment link sent to ${reg.personalDetails.email}`);
    } catch (err) {
      alert('Failed to resend');
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) return alert('No data');

    const headers = ['Name', 'Email', 'Accommodation', 'Total', 'Status', 'Created'];
    const rows = registrations.map(r => [
      `${r.personalDetails?.firstName} ${r.personalDetails?.lastName}`,
      r.personalDetails?.email,
      r.accommodation?.accommodationPreference || '',
      r.payment?.totalPayment?.toFixed(2) || '0.00',
      r.payment?.paymentStatus || 'Pending',
      format(new Date(r.createdAt), 'yyyy-MM-dd'),
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nzsi-registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NZ South Island 2025</h1>
          <div className="flex gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
              {registrations.length} total
            </span>
            <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded">
              Export CSV
            </button>
          </div>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">No registrations yet</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Accommodation</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map(reg => (
                  <tr key={reg._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">{`${reg.personalDetails?.firstName} ${reg.personalDetails?.lastName}`}</td>
                 <td className="py-4 px-6 text-sm">
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

                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {reg.accommodation?.accommodationPreference || '—'}
                      </span>
                    </td>
                    <td className="py-4 px-6">${reg.payment?.totalPayment?.toFixed(2) || '0.00'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                        reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {reg.payment?.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {format(new Date(reg.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-4 px-6 space-x-2">
                      <button onClick={() => openEditModal(reg)} className="text-green-600 hover:text-green-900">Edit</button>
                      <button onClick={() => handleResendPayment(reg)} className="text-blue-600 hover:text-blue-900">Resend</button>
                      <button onClick={() => handleDelete(reg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EDIT MODAL */}
        {editModal.open && editModal.reg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Registration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Personal */}
                <div><label className="block text-sm font-medium mb-1">First Name</label>
                  <input type="text" value={editModal.reg.personalDetails?.firstName || ''} onChange={e => updateField('personalDetails', 'firstName', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Last Name</label>
                  <input type="text" value={editModal.reg.personalDetails?.lastName || ''} onChange={e => updateField('personalDetails', 'lastName', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={editModal.reg.personalDetails?.email || ''} onChange={e => updateField('personalDetails', 'email', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>

                {/* Licence */}
                <div><label className="block text-sm font-medium mb-1">Licence Valid</label>
                  <select value={editModal.reg.licenceDetails?.licenceValid || 'No'} onChange={e => setEditModal({ ...editModal, reg: { ...editModal.reg, licenceDetails: { ...editModal.reg.licenceDetails, licenceValid: e.target.value } } })} className="w-full px-3 py-2 border rounded-md">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Licence Number</label>
                  <input type="text" value={editModal.reg.licenceDetails?.licenceNumber || ''} onChange={e => setEditModal({ ...editModal, reg: { ...editModal.reg, licenceDetails: { ...editModal.reg.licenceDetails, licenceNumber: e.target.value } } })} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Licence State</label>
                  <input type="text" value={editModal.reg.licenceDetails?.licenceState || ''} onChange={e => setEditModal({ ...editModal, reg: { ...editModal.reg, licenceDetails: { ...editModal.reg.licenceDetails, licenceState: e.target.value } } })} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input type="date" value={editModal.reg.licenceDetails?.licenceExpiryDate?.split('T')[0] || ''} onChange={e => setEditModal({ ...editModal, reg: { ...editModal.reg, licenceDetails: { ...editModal.reg.licenceDetails, licenceExpiryDate: e.target.value } } })} className="w-full px-3 py-2 border rounded-md" />
                </div>

                {/* Motorcycle */}
                <div><label className="block text-sm font-medium mb-1">Hire Option</label>
                  <select value={editModal.reg.motorcycle?.hireOption || ''} onChange={e => updateField('motorcycle', 'hireOption', e.target.value)} className="w-full px-3 py-2 border rounded-md">
                    <option value="Hire a Motorcycle">Hire</option>
                    <option value="Own Bike">Own</option>
                  </select>
                </div>

                {/* Payment */}
                <div><label className="block text-sm font-medium mb-1">Status</label>
                  <select value={editModal.reg.payment?.paymentStatus || 'Pending'} onChange={e => updateField('payment', 'paymentStatus', e.target.value)} className="w-full px-3 py-2 border rounded-md">
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Total ($)</label>
                  <input type="number" step="0.01" value={editModal.reg.payment?.totalPayment || 0} onChange={e => updateField('payment', 'totalPayment', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button onClick={closeEditModal} className="px-5 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleUpdate} className="px-5 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsNZSIRegistration;