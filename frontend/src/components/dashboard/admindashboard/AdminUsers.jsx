// components/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import { format, isValid } from 'date-fns';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState({ open: false, mode: 'create', user: null });
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'user' }); // ← FIXED
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
      setLoading(false);
    }
  };

  const openModal = (mode, user = null) => {
    setModal({ open: true, mode, user });
    if (mode === 'create') {
      setForm({ fullName: '', email: '', password: '', role: 'user' });
    } else {
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        role: user.role || 'user',
      });
    }
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
        res = await axios.post('/api/auth/users', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(prev => [res.data.user, ...prev]);
      } else {
        res = await axios.put(`/api/auth/users/${modal.user._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(prev => prev.map(u => u._id === modal.user._id ? res.data.user : u));
      }

      closeModal();
      alert(modal.mode === 'create' ? 'User created' : 'User updated');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u._id !== id));
      alert('User deleted');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
  };

  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <div className="flex gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
              {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => openModal('create')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add User
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">No users</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">{user.fullName || '—'}</td>
                    <td className="py-4 px-6 text-sm">{user.email}</td>
                    <td classemaking className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-6 space-x-2">
                      <button
                        onClick={() => openModal('edit', user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900"
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

        {/* MODAL */}
        {modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">
                {modal.mode === 'create' ? 'Add New User' : 'Edit User'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {modal.mode === 'create' ? 'Password' : 'New Password (optional)'}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder={modal.mode === 'edit' ? 'Leave blank to keep current' : ''}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-4 py-2 rounded flex items-center gap-2 ${
                    saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    modal.mode === 'create' ? 'Create' : 'Update'
                  )}
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