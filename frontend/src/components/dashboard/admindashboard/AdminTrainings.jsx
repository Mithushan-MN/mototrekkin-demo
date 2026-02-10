import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axiosConfig';
import { format, startOfDay, endOfDay } from 'date-fns';

const AdminTrainings = () => {
  const [phase1Registrations, setPhase1Registrations] = useState([]);
  const [phase2Registrations, setPhase2Registrations] = useState([]);
  const [phase3Registrations, setPhase3Registrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reg: null, phase: null });

  // Shared filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Admin authentication required');

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all three phases
        const [phase1Res, phase2Res, phase3Res] = await Promise.all([
          axios.get('/mdpPhase1Registrations/admin', { headers }),
          axios.get('/mdpPhase2Registrations/admin', { headers }),
          axios.get('/mdpPhase3Registrations/admin', { headers }), // ← Phase 3 endpoint
        ]);

        console.log('Loaded registrations →', {
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
        const msg =
          err.response?.status === 403 ? 'Admin access required.' :
          err.response?.status === 401 ? 'Please log in as admin.' :
          err.response?.data?.message || 'Failed to load registrations';
        setError(msg);
        setLoading(false);
      }
    };

    fetchAllRegistrations();
  }, []);

  // Combined unique locations from all phases
  const uniqueLocations = useMemo(() => {
    const allLocs = [
      ...phase1Registrations.map(r => r.trainingState),
      ...phase2Registrations.map(r => r.trainingState),
      ...phase3Registrations.map(r => r.trainingState),
    ].filter(Boolean);
    return ["All", ...Array.from(new Set(allLocs))];
  }, [phase1Registrations, phase2Registrations, phase3Registrations]);

  // Shared filter logic
  const applyFilters = (regs) => {
    return regs.filter(reg => {
      const name = `${reg.personalDetails?.firstName || ''} ${reg.personalDetails?.lastName || ''}`.toLowerCase();
      const email = (reg.personalDetails?.email || '').toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch = !search || name.includes(term) || email.includes(term);

      const matchesStatus = statusFilter === "All" || reg.payment?.paymentStatus === statusFilter;

      const matchesLocation = locationFilter === "All" || reg.trainingState === locationFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const trainingDate = new Date(reg.trainingDate);
        if (isNaN(trainingDate.getTime())) return false;
        if (dateRange.start) matchesDate = matchesDate && trainingDate >= startOfDay(new Date(dateRange.start));
        if (dateRange.end) matchesDate = matchesDate && trainingDate <= endOfDay(new Date(dateRange.end));
      }

      return matchesSearch && matchesStatus && matchesLocation && matchesDate;
    });
  };

  const filteredPhase1 = useMemo(() => applyFilters(phase1Registrations), [phase1Registrations, search, statusFilter, locationFilter, dateRange]);
  const filteredPhase2 = useMemo(() => applyFilters(phase2Registrations), [phase2Registrations, search, statusFilter, locationFilter, dateRange]);
  const filteredPhase3 = useMemo(() => applyFilters(phase3Registrations), [phase3Registrations, search, statusFilter, locationFilter, dateRange]);

  // ────── Modal & Actions ──────
  const openEditModal = (reg, phase) => {
    setEditModal({ open: true, reg: { ...reg }, phase });
  };

  const closeEditModal = () => setEditModal({ open: false, reg: null, phase: null });

  const handleUpdate = async () => {
    if (!editModal.reg || !editModal.phase) return;
    try {
      const endpointMap = {
        phase1: 'mdpPhase1Registrations',
        phase2: 'mdpPhase2Registrations',
        phase3: 'mdpPhase3Registrations',
      };
      const endpoint = endpointMap[editModal.phase];
      const res = await axios.put(
        `/${endpoint}/${editModal.reg._id}`,
        editModal.reg,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const setterMap = {
        phase1: setPhase1Registrations,
        phase2: setPhase2Registrations,
        phase3: setPhase3Registrations,
      };
      setterMap[editModal.phase](prev => prev.map(r => r._id === editModal.reg._id ? res.data : r));

      closeEditModal();
      alert('Registration updated successfully');
    } catch (err) {
      alert('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, phase) => {
    if (!window.confirm('Delete this registration? This action cannot be undone.')) return;
    try {
      const endpointMap = {
        phase1: 'mdpPhase1Registrations',
        phase2: 'mdpPhase2Registrations',
        phase3: 'mdpPhase3Registrations',
      };
      const endpoint = endpointMap[phase];
      await axios.delete(`/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const setterMap = {
        phase1: setPhase1Registrations,
        phase2: setPhase2Registrations,
        phase3: setPhase3Registrations,
      };
      setterMap[phase](prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleResendPayment = async (reg, phase) => {
    try {
      const endpointMap = {
        phase1: 'mdpPhase1Registrations',
        phase2: 'mdpPhase2Registrations',
        phase3: 'mdpPhase3Registrations',
      };
      const endpoint = endpointMap[phase];
      await axios.post(
        `/${endpoint}/resend-payment/${reg._id}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Payment link resent to ${reg.personalDetails?.email || 'the registered email'}`);
    } catch (err) {
      alert('Failed to resend payment link: ' + (err.response?.data?.message || err.message));
    }
  };

  // ────── CSV Export ──────
  const exportCSV = (phase = 'all') => {
    let data;
    if (phase === 'phase1') data = filteredPhase1;
    else if (phase === 'phase2') data = filteredPhase2;
    else if (phase === 'phase3') data = filteredPhase3;
    else data = [...filteredPhase1, ...filteredPhase2, ...filteredPhase3];

    if (data.length === 0) return alert('No data to export');

    const headers = ['Phase', 'Name', 'Email', 'Location', 'Date', 'Bike', 'Total', 'Status', 'Created'];
    const rows = data.map(r => {
      const phaseLabel =
        phase === 'phase1' ? 'Phase I' :
        phase === 'phase2' ? 'Phase II' :
        phase === 'phase3' ? 'Phase III' : 'Unknown';

      const bike = r.bikeDetails?.bikeChoice === 'hire'
        ? r.bikeDetails?.hireBike || 'Hired'
        : `${r.bikeDetails?.bikeMake || ''} ${r.bikeDetails?.bikeModel || ''} ${r.bikeDetails?.bikeYear || ''}`.trim() || 'Own Bike';

      return [
        phaseLabel,
        `${r.personalDetails?.firstName || ''} ${r.personalDetails?.lastName || ''}`,
        r.personalDetails?.email || 'N/A',
        r.trainingState || '',
        r.trainingDate || '',
        bike,
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
    a.download = `mdp-all-phases-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  // ────── Loading / Error ──────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading all MDP registrations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header + Filters */}
        <div className="flex flex-col  justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">MDP All Phases Admin</h1>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search name, email..."
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
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
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
          <button onClick={() => exportCSV('phase1')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export Phase I
          </button>
          <button onClick={() => exportCSV('phase2')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export Phase II
          </button>
          <button onClick={() => exportCSV('phase3')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export Phase III
          </button>
          <button onClick={() => exportCSV('all')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Export All Phases
          </button>
        </div>

        {/* Phase 1 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            MDP Phase I
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredPhase1.length} / {phase1Registrations.length}
            </span>
          </h2>
          {filteredPhase1.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No Phase I registrations match the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Bike</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPhase1.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{reg.personalDetails?.firstName} {reg.personalDetails?.lastName}</td>
                      <td className="py-4 px-6">{reg.personalDetails?.email || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingState || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingDate || '—'}</td>
                      <td className="py-4 px-6">
                        {reg.bikeDetails?.bikeChoice === 'hire' ? reg.bikeDetails?.hireBike || 'Hired' : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''}`.trim() || 'Own'}
                      </td>
                      <td className="py-4 px-6">${(reg.payment?.totalPayment || 0).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.payment?.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{format(new Date(reg.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-4 px-6 space-x-3 text-sm">
                        <button onClick={() => openEditModal(reg, 'phase1')} className="text-green-600 hover:text-green-800">Edit</button>
                        <button onClick={() => handleResendPayment(reg, 'phase1')} className="text-blue-600 hover:text-blue-800">Resend</button>
                        <button onClick={() => handleDelete(reg._id, 'phase1')} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Phase 2 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            MDP Phase II
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredPhase2.length} / {phase2Registrations.length}
            </span>
          </h2>
          {filteredPhase2.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No Phase II registrations match the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                {/* same thead as above */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Bike</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPhase2.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      {/* same columns as Phase 1 */}
                      <td className="py-4 px-6 font-medium">{reg.personalDetails?.firstName} {reg.personalDetails?.lastName}</td>
                      <td className="py-4 px-6">{reg.personalDetails?.email || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingState || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingDate || '—'}</td>
                      <td className="py-4 px-6">
                        {reg.bikeDetails?.bikeChoice === 'hire' ? reg.bikeDetails?.hireBike || 'Hired' : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''}`.trim() || 'Own'}
                      </td>
                      <td className="py-4 px-6">${(reg.payment?.totalPayment || 0).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.payment?.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{format(new Date(reg.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-4 px-6 space-x-3 text-sm">
                        <button onClick={() => openEditModal(reg, 'phase2')} className="text-green-600 hover:text-green-800">Edit</button>
                        <button onClick={() => handleResendPayment(reg, 'phase2')} className="text-blue-600 hover:text-blue-800">Resend</button>
                        <button onClick={() => handleDelete(reg._id, 'phase2')} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Phase 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            MDP Phase III
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredPhase3.length} / {phase3Registrations.length}
            </span>
          </h2>
          {filteredPhase3.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500">No Phase III registrations match the filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Bike</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPhase3.map(reg => (
                    <tr key={reg._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{reg.personalDetails?.firstName} {reg.personalDetails?.lastName}</td>
                      <td className="py-4 px-6">{reg.personalDetails?.email || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingState || '—'}</td>
                      <td className="py-4 px-6">{reg.trainingDate || '—'}</td>
                      <td className="py-4 px-6">
                        {reg.bikeDetails?.bikeChoice === 'hire' ? reg.bikeDetails?.hireBike || 'Hired' : `${reg.bikeDetails?.bikeMake || ''} ${reg.bikeDetails?.bikeModel || ''}`.trim() || 'Own'}
                      </td>
                      <td className="py-4 px-6">${(reg.payment?.totalPayment || 0).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          reg.payment?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          reg.payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {reg.payment?.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{format(new Date(reg.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-4 px-6 space-x-3 text-sm">
                        <button onClick={() => openEditModal(reg, 'phase3')} className="text-green-600 hover:text-green-800">Edit</button>
                        <button onClick={() => handleResendPayment(reg, 'phase3')} className="text-blue-600 hover:text-blue-800">Resend</button>
                        <button onClick={() => handleDelete(reg._id, 'phase3')} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Edit Modal – shared across all phases */}
        {editModal.open && editModal.reg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Edit {editModal.phase === 'phase1' ? 'Phase I' : editModal.phase === 'phase2' ? 'Phase II' : 'Phase III'} Registration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails?.firstName || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: {
                        ...p.reg,
                        personalDetails: { ...p.reg.personalDetails, firstName: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editModal.reg.personalDetails?.lastName || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: {
                        ...p.reg,
                        personalDetails: { ...p.reg.personalDetails, lastName: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editModal.reg.personalDetails?.email || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: {
                        ...p.reg,
                        personalDetails: { ...p.reg.personalDetails, email: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Location</label>
                  <input
                    type="text"
                    value={editModal.reg.trainingState || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, trainingState: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Date</label>
                  <input
                    type="text"
                    value={editModal.reg.trainingDate || ''}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: { ...p.reg, trainingDate: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={editModal.reg.payment?.paymentStatus || 'Pending'}
                    onChange={e => setEditModal(p => ({
                      ...p,
                      reg: {
                        ...p.reg,
                        payment: { ...p.reg.payment, paymentStatus: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      reg: {
                        ...p.reg,
                        payment: { ...p.reg.payment, totalPayment: parseFloat(e.target.value) || 0 }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

export default AdminTrainings;