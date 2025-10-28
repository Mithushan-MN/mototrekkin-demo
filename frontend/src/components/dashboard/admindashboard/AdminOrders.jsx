// components/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import { format, isValid } from "date-fns";

const AdminOrders = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal
  const [modal, setModal] = useState({ open: false, mode: "create", booking: null });
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // FETCH ALL BOOKINGS
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/api/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      const msg = err.response?.status === 401
        ? "Please log in as admin"
        : err.response?.data?.message || "Failed to load";
      setError(msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // OPEN MODAL
  const openModal = (mode, booking = null) => {
    setModal({ open: true, mode, booking });
    if (mode === "create") {
      setForm({
        firstName: "", lastName: "", email: "", mobileNumber: "",
        motorcycleMake: "", motorcycleModel: "", preferredDateTime: "",
        summaryOfWork: "", status: "Pending"
      });
    } else {
      setForm({ ...booking });
    }
  };

  const closeModal = () => {
    setModal({ open: false, mode: "create", booking: null });
    setForm({});
    setSaving(false);
  };

  // SAVE (CREATE / UPDATE)
  const handleSave = async () => {
    if (!form.firstName || !form.email || !form.preferredDateTime) {
      return alert("First Name, Email, and Preferred Date are required");
    }

    setSaving(true);
    try {
      let res;
      if (modal.mode === "create") {
        res = await axios.post("/api/bookings", form);
        setBookings(prev => [res.data.booking, ...prev]);
        alert("Booking created");
      } else {
        res = await axios.put(`/api/bookings/${modal.booking._id}`, form);
        setBookings(prev => prev.map(b => b._id === modal.booking._id ? res.data.booking : b));
        alert("Booking updated");
      }
      closeModal();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      alert("Deleted");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // SAFE DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isValid(d) ? format(d, "MMM dd, yyyy HH:mm") : "Invalid";
  };

  if (loading) return <p className="text-black p-4">Loading...</p>;
  if (error) return (
    <div className="text-red-500 p-4">
      <p>{error}</p>
      {error.includes("log in") && (
        <button onClick={() => window.location.href = "/?openAuthModal=true"}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Log In
        </button>
      )}
    </div>
  );

  return (
    <div className="p-4 w-full h-full text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Service Bookings</h1>
        {/* <button
          onClick={() => openModal("create")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Booking
        </button> */}  
      </div>

      <div className="max-w-full overflow-auto border rounded-lg shadow-lg max-h-[80vh]">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Mobile</th>
              <th className="px-3 py-2">Bike</th>
              <th className="px-3 py-2">Preferred</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id} className="hover:bg-gray-50 border-b">
                <td className="px-3 py-2 text-xs">{b._id.slice(-6)}</td>
                <td className="px-3 py-2">{b.firstName} {b.lastName}</td>
                <td className="px-3 py-2">
                  <a href={`mailto:${b.email}`} className="text-blue-600 hover:underline text-xs">
                    {b.email}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <a href={`tel:${b.mobileNumber}`} className="text-blue-600 hover:underline text-xs">
                    {b.mobileNumber}
                  </a>
                </td>
                <td className="px-3 py-2 text-xs">
                  {b.motorcycleMake} {b.motorcycleModel}
                </td>
                <td className="px-3 py-2 text-xs">{formatDate(b.preferredDateTime)}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    b.status === "Confirmed" ? "bg-green-100 text-green-800" :
                    b.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {b.status || "Pending"}
                  </span>
                </td>
                <td className="px-3 py-2 space-x-1">
                  <button
                    onClick={() => openModal("edit", b)}
                    className="text-indigo-600 hover:text-indigo-900 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-600 hover:text-red-900 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">
              {modal.mode === "create" ? "Add Booking" : "Edit Booking"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  value={form.firstName || ""}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={form.lastName || ""}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email || ""}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Mobile *</label>
                <input
                  type="text"
                  value={form.mobileNumber || ""}
                  onChange={e => setForm({ ...form, mobileNumber: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Make *</label>
                <input
                  type="text"
                  value={form.motorcycleMake || ""}
                  onChange={e => setForm({ ...form, motorcycleMake: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Model *</label>
                <input
                  type="text"
                  value={form.motorcycleModel || ""}
                  onChange={e => setForm({ ...form, motorcycleModel: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Preferred Date & Time *</label>
                <input
                  type="datetime-local"
                  value={form.preferredDateTime ? form.preferredDateTime.slice(0, 16) : ""}
                  onChange={e => setForm({ ...form, preferredDateTime: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <select
                  value={form.status || "Pending"}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">Work Summary</label>
                <textarea
                  value={form.summaryOfWork || ""}
                  onChange={e => setForm({ ...form, summaryOfWork: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-1 border rounded"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
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
                  saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
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
                  modal.mode === "create" ? "Create" : "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;