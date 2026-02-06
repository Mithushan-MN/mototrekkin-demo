// components/AdminBikeHire.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../../axiosConfig";
import { format, isValid, startOfDay, endOfDay } from "date-fns";

const AdminBikeHire = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ────── FILTER STATE ──────
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [makeFilter, setMakeFilter] = useState("");

  // ────── MODAL STATE ──────
  const [modal, setModal] = useState({ open: false, booking: null });
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // ────── FETCH ──────
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/bikeBookings");
      setBookings(res.data);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Admin login required"
          : err.response?.data?.message || "Failed to load"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ────── FILTERED LIST (memoized) ──────
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // 1. Global search
      const term = search.toLowerCase();
      const riderName = `${b.riderDetails?.firstName || ""} ${b.riderDetails?.lastName || ""}`.toLowerCase();
      const matchesSearch =
        !search ||
        riderName.includes(term) ||
        b.riderDetails?.email?.toLowerCase().includes(term) ||
        b.riderDetails?.mobile?.toLowerCase().includes(term) ||
        b.bikeModel?.toLowerCase().includes(term);

      // 2. Payment status
      const matchesPayment = paymentFilter === "All" || b.paymentStatus === paymentFilter;

      // 3. Date range (pickup OR return must be inside the range)
      let matchesDate = true;
      if (dateRange.start || dateRange.end) {
        const pickup = new Date(b.pickupDate);
        const ret = new Date(b.returnDate);
        if (dateRange.start) {
          const start = startOfDay(new Date(dateRange.start));
          matchesDate = pickup >= start || ret >= start;
        }
        if (dateRange.end) {
          const end = endOfDay(new Date(dateRange.end));
          matchesDate = matchesDate && (pickup <= end || ret <= end);
        }
      }

      // 4. Make (extract from bikeModel or add a dedicated field later)
      const bikeMake = (b.bikeModel || "").split(" ")[0]?.toLowerCase();
      const matchesMake = !makeFilter || bikeMake.includes(makeFilter.toLowerCase());

      return matchesSearch && matchesPayment && matchesDate && matchesMake;
    });
  }, [bookings, search, paymentFilter, dateRange, makeFilter]);

  // ────── MODAL HELPERS ──────
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

  // ────── SAVE UPDATE ──────
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`/bikeBookings/${modal.booking._id}`, form);
      setBookings((prev) =>
        prev.map((b) => (b._id === modal.booking._id ? res.data.booking : b))
      );
      closeModal();
      alert("Booking updated");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // ────── DELETE ──────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike hire booking?")) return;
    try {
      await axios.delete(`/bikeBookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Deleted");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // ────── DATE FORMAT ──────
  const fmt = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isValid(d) ? format(d, "MMM dd, yyyy") : "Invalid";
  };

  // ────── RENDER ──────
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
      {/* ────── HEADER + FILTERS ────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left">All Bike Hire Bookings</h1>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search rider / email / bike..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full sm:w-64"
          />

          {/* Payment status */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="All">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>

          {/* Make */}
          <input
            type="text"
            placeholder="Make..."
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-32"
          />

          {/* Pickup / Return range */}
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Pickup from"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Return to"
          />
        </div>
      </div>

      {/* ────── TABLE ────── */}
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
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  No bookings match the current filters.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  {/* ID */}
                  <td className="px-3 py-2 font-mono">{b._id.slice(-6)}</td>

                  {/* RIDER */}
                  <td className="px-3 py-2">
                    {b.riderDetails?.firstName} {b.riderDetails?.lastName}
                    <br />
                    <small className="text-gray-500">
                      {b.riderDetails?.gender} |{" "}
                      {b.riderDetails?.birthday ? fmt(b.riderDetails.birthday) : ""}
                    </small>
                  </td>

                  {/* CONTACT */}
                  <td className="px-3 py-2 text-xs">
                    {b.riderDetails?.email && (
                      <a
                        href={`mailto:${b.riderDetails.email}`}
                        className="text-blue-600 hover:underline block"
                      >
                        {b.riderDetails.email}
                      </a>
                    )}
                    {b.riderDetails?.mobile && (
                      <a
                        href={`tel:${b.riderDetails.mobile}`}
                        className="text-blue-600 hover:underline block"
                      >
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

                  {/* SUBTOTAL */}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ────── EDIT MODAL ────── */}
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