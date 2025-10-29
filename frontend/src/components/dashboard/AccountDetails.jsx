// components/AccountDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig"; // Includes JWT token
import { format } from "date-fns";

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/auth/profile");
      setUser(res.data);
      setForm({ fullName: res.data.fullName, email: res.data.email });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // SAVE UPDATE
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.patch("/api/auth/profile", form);
      setUser(res.data);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading your account...</p>
      </div>
    );

  if (error && !user)
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchProfile}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* FULL NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* READ-ONLY INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{user?.role || "user"}</span>
          </div>
          <div>
            <span className="font-medium">Member Since:</span>{" "}
            {user?.createdAt ? format(new Date(user.createdAt), "MMM dd, yyyy") : "—"}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={fetchProfile}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              saving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;