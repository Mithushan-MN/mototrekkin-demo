import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axiosConfig';
import { format, startOfDay, endOfDay } from 'date-fns';

const AdminEventsNZSIRegistration = () => {
  const [nzsiRegistrations, setNzsiRegistrations] = useState([]);
  const [ridgeRegistrations, setRidgeRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reg: null, event: null });

  // Shared filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [accommodationFilter, setAccommodationFilter] = useState("All"); // mainly for NZSI
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Admin login required');

        const headers = { Authorization: `Bearer ${token}` };

        const [nzsiRes, ridgeRes] = await Promise.all([
          axios.get('/nzsiRegistrations/admin', { headers }),
          axios.get('/RidgeRiderVIRegistrations/admin', { headers }),
        ]);

        console.log('Admin Events loaded:', {
          NZSI: nzsiRes.data.length,
          RidgeRiderVI: ridgeRes.data.length,
        });

        setNzsiRegistrations(Array.isArray(nzsiRes.data) ? nzsiRes.data : []);
        setRidgeRegistrations(Array.isArray(ridgeRes.data) ? ridgeRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load event registrations');
        setLoading(false);
      }
    };

    fetchAllRegistrations();
  }, []);

  // Unique accommodation options (mainly from NZSI, fallback for Ridge if it has the field)
  const uniqueAccommodations = useMemo(() => {
    const prefs = nzsiRegistrations
      .map(r => r.accommodation?.accommodationPreference)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(prefs))];
  }, [nzsiRegistrations]);

  // Shared filter function
  const applyFilters = (regs) => {
    return regs.filter(reg => {
      const name = `${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`.toLowerCase();
      const email = (reg.personalDetails?.email || '').toLowerCase();
      const licence = (reg.licenceDetails?.licenceNumber || '').toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch = !search ||
        name.includes(term) ||
        email.includes(term) ||
        licence.includes(term);

      const matchesStatus = statusFilter === "All" || reg.payment?.paymentStatus === statusFilter;

      // Accommodation filter mainly applies to NZSI
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
  };

  const filteredNzsi = useMemo(() => applyFilters(nzsiRegistrations), [nzsiRegistrations, search, statusFilter, accommodationFilter, dateRange]);
  const filteredRidge = useMemo(() => applyFilters(ridgeRegistrations), [ridgeRegistrations, search, statusFilter, accommodationFilter, dateRange]);

  // ────── Modal & Actions ──────
  const openEditModal = (reg, event) => {
    setEditModal({ open: true, reg: { ...reg }, event });
  };

  const closeEditModal = () => setEditModal({ open: false, reg: null, event: null });

  const handleUpdate = async () => {
    if (!editModal.reg || !editModal.event) return;
    try {
      const endpoint = editModal.event === 'nzsi' ? 'nzsiRegistrations' : 'RidgeRiderVIRegistrations';
      const res = await axios.put(
        `/${endpoint}/${editModal.reg._id}`,
        editModal.reg,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (editModal.event === 'nzsi') {
        setNzsiRegistrations(prev => prev.map(r => r._id === editModal.reg._id ? res.data : r));
      } else {
        setRidgeRegistrations(prev => prev.map(r => r._id === editModal.reg._id ? res.data : r));
      }

      closeEditModal();
      alert('Registration updated');
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, event) => {
    if (!window.confirm('Delete this registration permanently?')) return;
    try {
      const endpoint = event === 'nzsi' ? 'nzsiRegistrations' : 'RidgeRiderVIRegistrations';
      await axios.delete(`/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (event === 'nzsi') {
        setNzsiRegistrations(prev => prev.filter(r => r._id !== id));
      } else {
        setRidgeRegistrations(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleResendPayment = async (reg, event) => {
    try {
      const endpoint = event === 'nzsi' ? 'nzsiRegistrations' : 'RidgeRiderVIRegistrations';
      await axios.post(
        `/${endpoint}/resend-payment/${reg._id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Payment link resent to ${reg.personalDetails?.email || 'registered email'}`);
    } catch (err) {
      alert('Resend failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const exportCSV = (eventType = 'all') => {
    let data;
    if (eventType === 'nzsi') data = filteredNzsi;
    else if (eventType === 'ridge') data = filteredRidge;
    else data = [...filteredNzsi, ...filteredRidge];

    if (data.length === 0) return alert('No data to export');

    const headers = ['Event', 'Name', 'Email', 'Accommodation', 'Total', 'Status', 'Created'];
    const rows = data.map(r => {
      const eventName = eventType === 'nzsi' ? 'NZ South Island' : eventType === 'ridge' ? 'Ridge Rider VI' : 'Unknown';
      return [
        eventName,
        `${r.personalDetails?.firstName || ''} ${r.personalDetails?.lastName || ''}`,
        r.personalDetails?.email || 'N/A',
        r.accommodation?.accommodationPreference || '—',
        r.payment?.totalPayment?.toFixed(2) || '0.00',
        r.payment?.paymentStatus || 'Pending',
        format(new Date(r.createdAt), 'yyyy-MM-dd'),
      ];
    });

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (loading) return <div className="text-center py-20 text-lg">Loading event registrations...</div>;
  if (error) return <div className="text-center py-20 text-red-600 text-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header + Filters */}
        <div className="flex flex-col justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Event Registrations Admin</h1>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search name / email / licence..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
            />

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={accommodationFilter}
              onChange={e => setAccommodationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {uniqueAccommodations.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              type="date"
              value={dateRange.start}
              onChange={e => setDateRange(p => ({ ...p, start: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={e => setDateRange(p => ({ ...p, end: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => exportCSV('nzsi')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Export NZ South Island
          </button>
          <button onClick={() => exportCSV('ridge')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Export Ridge Rider VI
          </button>
          <button onClick={() => exportCSV('all')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Export All Events
          </button>
        </div>

        {/* NZ South Island Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            NZ South Island 2026
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredNzsi.length} / {nzsiRegistrations.length}
            </span>
          </h2>

          {filteredNzsi.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No NZSI registrations match the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
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
                  {filteredNzsi.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">{`${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`}</td>
                      <td className="py-4 px-6">
                        {reg.personalDetails?.email ? (
                          <a href={`mailto:${reg.personalDetails.email}`} className="text-blue-600 hover:underline">
                            {reg.personalDetails.email}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {reg.accommodation?.accommodationPreference || '—'}
                        </span>
                      </td>
                      <td className="py-4 px-6">${(reg.payment?.totalPayment || 0).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.payment?.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{format(new Date(reg.createdAt), 'MMM dd, yyyy')}</td>
                      <td className="py-4 px-6 space-x-3">
                        <button onClick={() => openEditModal(reg, 'nzsi')} className="text-green-600 hover:text-green-800">Edit</button>
                        <button onClick={() => handleResendPayment(reg, 'nzsi')} className="text-blue-600 hover:text-blue-800">Resend</button>
                        <button onClick={() => handleDelete(reg._id, 'nzsi')} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Ridge Rider VI Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            Ridge Rider VI
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredRidge.length} / {ridgeRegistrations.length}
            </span>
          </h2>

          {filteredRidge.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No Ridge Rider VI registrations match the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
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
                  {filteredRidge.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">{`${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`}</td>
                      <td className="py-4 px-6">
                        {reg.personalDetails?.email ? (
                          <a href={`mailto:${reg.personalDetails.email}`} className="text-blue-600 hover:underline">
                            {reg.personalDetails.email}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {reg.accommodation?.accommodationPreference || '—'}
                        </span>
                      </td>
                      <td className="py-4 px-6">${(reg.payment?.totalPayment || 0).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.payment?.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{format(new Date(reg.createdAt), 'MMM dd, yyyy')}</td>
                      <td className="py-4 px-6 space-x-3">
                        <button onClick={() => openEditModal(reg, 'ridge')} className="text-green-600 hover:text-green-800">Edit</button>
                        <button onClick={() => handleResendPayment(reg, 'ridge')} className="text-blue-600 hover:text-blue-800">Resend</button>
                        <button onClick={() => handleDelete(reg._id, 'ridge')} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Edit Modal – shared for both events */}
        {editModal.open && editModal.reg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Edit {editModal.event === 'nzsi' ? 'NZ South Island' : 'Ridge Rider VI'} Registration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Personal Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails?.firstName || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, personalDetails: { ...p.reg.personalDetails, firstName: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails?.lastName || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, personalDetails: { ...p.reg.personalDetails, lastName: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editModal.reg.personalDetails?.email || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, personalDetails: { ...p.reg.personalDetails, email: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>

                {/* Licence Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Licence Valid</label>
                  <select
                    value={editModal.reg.licenceDetails?.licenceValid || 'No'}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, licenceDetails: { ...p.reg.licenceDetails, licenceValid: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Licence Number</label>
                  <input
                    type="text"
                    value={editModal.reg.licenceDetails?.licenceNumber || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, licenceDetails: { ...p.reg.licenceDetails, licenceNumber: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Licence State</label>
                  <input
                    type="text"
                    value={editModal.reg.licenceDetails?.licenceState || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, licenceDetails: { ...p.reg.licenceDetails, licenceState: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>

                {/* Payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={editModal.reg.payment?.paymentStatus || 'Pending'}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, payment: { ...p.reg.payment, paymentStatus: e.target.value } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
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
                    value={editModal.reg.payment?.totalPayment || 0}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, payment: { ...p.reg.payment, totalPayment: parseFloat(e.target.value) || 0 } }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end gap-4">
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2.5 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition"
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

export default AdminEventsNZSIRegistration;