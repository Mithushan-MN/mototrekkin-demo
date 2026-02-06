// components/AdminEventsNZSIRegistration.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axiosConfig';
import { format, startOfDay, endOfDay } from 'date-fns';

const AdminEventsNZSIRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reg: null });

  // ────── FILTER STATE ──────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [accommodationFilter, setAccommodationFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Login required');

        const response = await axios.get('/nzsiRegistrations/admin', {
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

  // ────── UNIQUE ACCOMMODATIONS FOR FILTER ──────
  const uniqueAccommodations = useMemo(() => {
    const prefs = registrations.map(r => r.accommodation?.accommodationPreference).filter(Boolean);
    return ["All", ...Array.from(new Set(prefs))];
  }, [registrations]);

  // ────── FILTERED REGISTRATIONS ──────
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const name = `${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`.toLowerCase();
      const email = (reg.personalDetails?.email || '').toLowerCase();
      const licence = (reg.licenceDetails?.licenceNumber || '').toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch = !search ||
        name.includes(term) ||
        email.includes(term) ||
        licence.includes(term);

      const matchesStatus = statusFilter === "All" || reg.payment?.paymentStatus === statusFilter;

      const matchesAccommodation = accommodationFilter === "All" ||
        reg.accommodation?.accommodationPreference === accommodationFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const created = new Date(reg.createdAt);
        if (dateRange.start) {
          matchesDate = created >= startOfDay(new Date(dateRange.start));
        }
        if (dateRange.end) {
          matchesDate = matchesDate && created <= endOfDay(new Date(dateRange.end));
        }
      }

      return matchesSearch && matchesStatus && matchesAccommodation && matchesDate;
    });
  }, [registrations, search, statusFilter, accommodationFilter, dateRange]);

  // ────── MODAL HELPERS ──────
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
        `/nzsiRegistrations/${editModal.reg._id}`,
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
      await axios.delete(`/nzsiRegistrations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRegistrations(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleResendPayment = async (reg) => {
    try {
      const res = await axios.post(`/nzsiRegistrations/resend-payment/${reg._id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(`Payment link sent to ${reg.personalDetails.email}`);
    } catch (err) {
      alert('Failed to resend');
    }
  };

  const exportCSV = () => {
    if (filteredRegistrations.length === 0) return alert('No data to export');

    const headers = ['Name', 'Email', 'Accommodation', 'Total', 'Status', 'Created'];
    const rows = filteredRegistrations.map(r => [
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
        {/* ────── HEADER + FILTERS ────── */}
        <div className="flex flex-col md:flex-col justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">NZ South Island 2025</h1>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search name / email / licence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full sm:w-64"
            />

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Accommodation */}
            <select
              value={accommodationFilter}
              onChange={(e) => setAccommodationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {uniqueAccommodations.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {/* Date Range */}
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(p => ({ ...p, start: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(p => ({ ...p, end: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
              {filteredRegistrations.length} shown ({registrations.length} total)
            </span>
          </div>
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Export CSV
          </button>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">No registrations match filters</div>
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
                {filteredRegistrations.map(reg => (
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

        {/* ────── EDIT MODAL (unchanged) ────── */}
        {editModal.open && editModal.reg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Registration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div><label className="block text-sm font-medium mb-1">First Name</label>
                  <input type="text" value={editModal.reg.personalDetails?.firstName || ''} onChange={e => updateField('personalDetails', 'firstName', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Last Name</label>
                  <input type="text" value={editModal.reg.personalDetails?.lastName || ''} onChange={e => updateField('personalDetails', 'lastName', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div><label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={editModal.reg.personalDetails?.email || ''} onChange={e => updateField('personalDetails', 'email', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                </div>

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

                <div><label className="block text-sm font-medium mb-1">Hire Option</label>
                  <select value={editModal.reg.motorcycle?.hireOption || ''} onChange={e => updateField('motorcycle', 'hireOption', e.target.value)} className="w-full px-3 py-2 border rounded-md">
                    <option value="Hire a Motorcycle">Hire</option>
                    <option value="Own Bike">Own</option>
                  </select>
                </div>

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
                <button onClick={closeEditModal} className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleUpdate} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsNZSIRegistration;