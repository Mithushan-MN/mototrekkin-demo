// components/AdminUsers.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from '../../../axiosConfig';
import { format, isValid, startOfDay, endOfDay } from 'date-fns';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ open: false, mode: 'create', user: null });
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'user' });
  const [saving, setSaving] = useState(false);

  // ────── FILTER STATE ──────
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      // const res = await axios.get('/api/auth/users', {
      const res = await axios.get('/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
      setLoading(false);
    }
  };

  // ────── FILTERED USERS ──────
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const name = (user.fullName || '').toLowerCase();
      const email = (user.email || '').toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch = !search ||
        name.includes(term) ||
        email.includes(term);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const created = new Date(user.createdAt);
        if (isNaN(created.getTime())) return false;
        if (dateRange.start) {
          matchesDate = created >= startOfDay(new Date(dateRange.start));
        }
        if (dateRange.end) {
          matchesDate = matchesDate && created <= endOfDay(new Date(dateRange.end));
        }
      }

      return matchesSearch && matchesRole && matchesDate;
    });
  }, [users, search, roleFilter, dateRange]);

  // ────── MODAL HANDLERS ──────
  const openModal = (mode, user = null) => {
    setModal({ open: true, mode, user });
    setForm(
      mode === 'create'
        ? { fullName: '', email: '', password: '', role: 'user' }
        : { fullName: user.fullName || '', email: user.email || '', password: '', role: user.role || 'user' }
    );
  };

  const closeModal = () => {
    setModal({ open: false, mode: 'create', user: null });
    setForm({ fullName: '', email: '', password: '', role: 'user' });
    setSaving(false);
  };

  const handleSave = async () => {
    if (!form.fullName?.trim() || !form.email?.trim()) return alert('Name and email required');
    if (modal.mode === 'create' && !form.password) return alert('Password required');

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      let res;
      if (modal.mode === 'create') {
        // res = await axios.post('/api/auth/users', payload, {
        res = await axios.post('/auth/users', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(prev => [res.data.user, ...prev]);
      } else {
        // res = await axios.put(`/api/auth/users/${modal.user._id}`, payload, {
        res = await axios.put(`/auth/users/${modal.user._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(prev => prev.map(u => (u._id === modal.user._id ? res.data.user : u)));
      }

      closeModal();
      alert(modal.mode === 'create' ? 'User created' : 'User updated');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      // await axios.delete(`/api/auth/users/${id}`, {
      await axios.delete(`/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== id));
      alert('User deleted');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = dateStr => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
  };

  // ────── EXPORT CSV ──────
  const exportCSV = () => {
    if (filteredUsers.length === 0) return alert('No users to export');

    const headers = ['Name', 'Email', 'Role', 'Created'];
    const rows = filteredUsers.map(u => [
      u.fullName || '',
      u.email,
      u.role,
      format(new Date(u.createdAt), 'yyyy-MM-dd'),
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  // ────── LOADING / ERROR ──────
  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ────── HEADER + FILTERS ────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search name / email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
            />

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* Date Range */}
            <input
              type="date"
              value={dateRange.start}
              onChange={e => setDateRange(p => ({ ...p, start: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={e => setDateRange(p => ({ ...p, end: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* ────── COUNTER + ACTIONS ────── */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              {filteredUsers.length} shown ({users.length} total)
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Export CSV
            </button>
            <button
              onClick={() => openModal('create')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* ────── TABLE OR EMPTY STATE ────── */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-400 text-6xl mb-4">Users</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {users.length === 0 ? "No users yet" : "No users match filters"}
            </h3>
            <p className="text-gray-500">
              {users.length === 0 ? "Create your first user above." : "Try adjusting your filters."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 sm:px-6">{user.fullName || '—'}</td>
                    <td className="py-3 px-4 sm:px-6">
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="py-3 px-4 sm:px-6 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openModal('edit', user)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ────── MODAL (Styled like others) ────── */}
        {modal.open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 sm:p-8 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
              >
                X
              </button>

              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-orange-600">
                {modal.mode === 'create' ? 'Add New User' : 'Edit User'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {modal.mode === 'create' ? 'Password' : 'New Password (optional)'}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder={modal.mode === 'edit' ? 'Leave blank to keep current' : ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                    saving
                      ? 'bg-orange-400 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  {saving ? 'Saving...' : modal.mode === 'create' ? 'Create User' : 'Update User'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;