// components/AdminBikeHire.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import { format, isValid } from "date-fns";

const AdminBikeHire = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal
  const [modal, setModal] = useState({ open: false, booking: null });
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // FETCH ALL
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/bikeBookings");
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Admin login required"
          : err.response?.data?.message || "Failed to load"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // OPEN EDIT
  const openEdit = (booking) => {
    setModal({ open: true, booking });
    setForm({
      paymentStatus: booking.paymentStatus || "pending",
      pickupDate: booking.pickupDate?.slice(0, 10) || "",
      returnDate: booking.returnDate?.slice(0, 10) || "",
      pickupTime: booking.pickupTime || "",
      returnTime: booking.returnTime || "",
      totalDays: booking.totalDays || "",
    });
  };

  const closeModal = () => {
    setModal({ open: false, booking: null });
    setForm({});
    setSaving(false);
  };

  // SAVE UPDATE
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`/api/bikeBookings/${modal.booking._id}`, form);
      setBookings(prev =>
        prev.map(b => (b._id === modal.booking._id ? res.data.booking : b))
      );
      closeModal();
      alert("Booking updated");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike hire booking?")) return;
    try {
      await axios.delete(`/api/bikeBookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      alert("Deleted");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // SAFE DATE
  const fmt = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isValid(d) ? format(d, "MMM dd, yyyy") : "Invalid";
  };

  if (loading) return <p className="p-4 text-center">Loading bike hire bookings...</p>;
  if (error)
    return (
      <div className="p-4 text-red-600 text-center">
        <p>{error}</p>
        {error.includes("login") && (
          <button
            onClick={() => (window.location.href = "/?openAuthModal=true")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log In
          </button>
        )}
      </div>
    );

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bike Hire Bookings</h1>

      <div className="max-w-full mx-auto overflow-x-auto border rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto text-xs text-left border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Rider</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Bike</th>
              <th className="px-3 py-2">Dates</th>
              <th className="px-3 py-2">Licence</th>
              <th className="px-3 py-2">Gear</th>
              <th className="px-3 py-2 text-right">Subtotal (USD)</th>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50">
                {/* ID */}
                <td className="px-3 py-2 font-mono">{b._id.slice(-6)}</td>

                {/* RIDER */}
                <td className="px-3 py-2">
                  {b.riderDetails?.firstName} {b.riderDetails?.lastName}
                  <br />
                  <small className="text-gray-500">
                    {b.riderDetails?.gender} | {b.riderDetails?.birthday ? fmt(b.riderDetails.birthday) : ""}
                  </small>
                </td>

                {/* CONTACT */}
                <td className="px-3 py-2 text-xs">
                  {b.riderDetails?.email && (
                    <a href={`mailto:${b.riderDetails.email}`} className="text-blue-600 hover:underline block">
                      {b.riderDetails.email}
                    </a>
                  )}
                  {b.riderDetails?.mobile && (
                    <a href={`tel:${b.riderDetails.mobile}`} className="text-blue-600 hover:underline block">
                      {b.riderDetails.mobile}
                    </a>
                  )}
                </td>

                {/* BIKE */}
                <td className="px-3 py-2">
                  <strong>{b.bikeModel}</strong>
                  <br />
                  <small>{b.gearOption}</small>
                </td>

                {/* DATES */}
                <td className="px-3 py-2 text-xs">
                  Pick: {fmt(b.pickupDate)} @ {b.pickupTime}
                  <br />
                  Return: {fmt(b.returnDate)} @ {b.returnTime}
                  <br />
                  <strong>{b.totalDays} days</strong>
                </td>

                {/* LICENCE */}
                <td className="px-3 py-2 text-xs">
                  {b.licenceDetails?.licenceNumber}
                  <br />
                  Expires: {fmt(b.licenceDetails?.licenceExpiry)}
                  <br />
                  State: {b.licenceDetails?.licenceState}
                </td>

                {/* GEAR */}
                <td className="px-3 py-2 text-xs">
                  H: {b.gear?.helmet ? "Yes" : "No"} |
                  J: {b.gear?.jacket ? "Yes" : "No"} |
                  G: {b.gear?.gloves ? "Yes" : "No"}
                </td>

                  {/* subtotalUSD */}
                <td className="px-3 py-2 text-right font-medium">
  ${b.subtotalUSD?.toFixed(2) || "—"}
</td>

                {/* PAYMENT */}
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      b.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : b.paymentStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {b.paymentStatus || "pending"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-3 py-2 space-x-1">
                  <button
                    onClick={() => openEdit(b)}
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

      {/* EDIT MODAL */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block font-medium">Payment Status</label>
                <select
                  value={form.paymentStatus || "pending"}
                  onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Pickup Date</label>
                <input
                  type="date"
                  value={form.pickupDate || ""}
                  onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Return Date</label>
                <input
                  type="date"
                  value={form.returnDate || ""}
                  onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Total Days</label>
                <input
                  type="number"
                  value={form.totalDays || ""}
                  onChange={(e) => setForm({ ...form, totalDays: e.target.value })}
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
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBikeHire;