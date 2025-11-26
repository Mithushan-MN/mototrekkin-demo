// components/AccountDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { format } from "date-fns";

const AccountDetails = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get current user ID (adjust based on your auth setup)
  const userId = localStorage.getItem("userId") || JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch full profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/userProfile/${userId}`);

      setProfile(res.data);

      // Format licence expiry for input[type="date"]
      const licenceDate = res.data.licenceExpiry
        ? format(new Date(res.data.licenceExpiry), "yyyy-MM-dd")
        : "";

      setForm({
        ...res.data,
        licenceExpiry: licenceDate || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updates = { ...form };
      if (updates.licenceExpiry) {
        updates.licenceExpiry = new Date(updates.licenceExpiry);
      }

      const res = await axios.patch(`/api/userProfile/${userId}`, updates);
      setProfile(res.data);
      setSuccess("All changes saved successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchProfile} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Account Details & Profile</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">

        {/* PERSONAL INFORMATION */}
        <Section title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" name="firstName" value={form.firstName || ""} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={form.lastName || ""} onChange={handleChange} required />
            <Input label="Gender" name="gender" value={form.gender || ""} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={form.email || ""} onChange={handleChange} required />
            <Input label="Birthday" name="birthday" type="date" value={form.birthday || ""} onChange={handleChange} />
            <Input label="Occupation" name="occupation" value={form.occupation || ""} onChange={handleChange} />
            <Input label="Mobile" name="mobile" value={form.mobile || ""} onChange={handleChange} />
            <Input label="Landline" name="landline" value={form.landline || ""} onChange={handleChange} />
          </div>
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Street Address" name="streetAddress" value={form.streetAddress || ""} onChange={handleChange} />
            <Input label="Apt/Suite/Unit" name="streetAddress2" value={form.streetAddress2 || ""} onChange={handleChange} />
            <Input label="City" name="city" value={form.city || ""} onChange={handleChange} />
            <Input label="State/Province" name="state" value={form.state || ""} onChange={handleChange} />
            <Input label="Postal Code" name="postCode" value={form.postCode || ""} onChange={handleChange} />
            <Input label="Country" name="country" value={form.country || ""} onChange={handleChange} />
          </div>
        </Section>

        {/* EMERGENCY CONTACT */}
        <Section title="Emergency Contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" name="emergencyFirstName" value={form.emergencyFirstName || ""} onChange={handleChange} />
            <Input label="Last Name" name="emergencyLastName" value={form.emergencyLastName || ""} onChange={handleChange} />
            <Input label="Relationship" name="emergencyRelation" value={form.emergencyRelation || ""} onChange={handleChange} />
            <Input label="Email" name="emergencyEmail" type="email" value={form.emergencyEmail || ""} onChange={handleChange} />
            <Input label="Mobile" name="emergencyMobile" value={form.emergencyMobile || ""} onChange={handleChange} />
            <Input label="Landline" name="emergencyLandline" value={form.emergencyLandline || ""} onChange={handleChange} />
          </div>
        </Section>

        {/* DRIVER'S LICENCE */}
        <Section title="Driver's Licence">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Licence Number" name="licenceNumber" value={form.licenceNumber || ""} onChange={handleChange} />
            <Input label="Expiry Date" name="licenceExpiry" type="date" value={form.licenceExpiry || ""} onChange={handleChange} />
            <Input label="State Issued" name="licenceState" value={form.licenceState || ""} onChange={handleChange} />
          </div>
        </Section>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={fetchProfile}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-8 py-3 rounded-lg font-medium text-white transition ${
              saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-5">{title}</h3>
    {children}
  </div>
);

const Input = ({ label, name, type = "text", value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

export default AccountDetails;