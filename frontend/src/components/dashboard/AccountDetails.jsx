// components/AccountDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "../../axiosConfig";
import { format } from "date-fns";

const AccountDetails = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const userId = localStorage.getItem("userId") || JSON.parse(localStorage.getItem("user"))?.id;
  const fileInputRef = useRef(null);

  // CLOUDINARY CLOUD NAME – CHANGE THIS TO YOURS!
  const CLOUDINARY_CLOUD_NAME = "doxov8fwn"; // CHANGE THIS

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/userProfile/${userId}`);

      const licenceDate = res.data.licenceExpiry
        ? format(new Date(res.data.licenceExpiry), "yyyy-MM-dd")
        : "";

      setProfile(res.data);
      setForm({
        ...res.data,
        licenceExpiry: licenceDate || "",
        photoUrl: res.data.photoUrl || "",
        medicalInfo: {
          hasMedicalCondition: res.data.medicalInfo?.hasMedicalCondition || "",
          medicalCondition: res.data.medicalInfo?.medicalCondition || "",
          medications: res.data.medicalInfo?.medications || "",
          hasMedicationAllergies: res.data.medicalInfo?.hasMedicationAllergies || "",
          medicationAllergies: res.data.medicalInfo?.medicationAllergies || "",
          hasFoodAllergies: res.data.medicalInfo?.hasFoodAllergies || "",
          foodAllergies: res.data.medicalInfo?.foodAllergies || "",
          dietaryRequirements: res.data.medicalInfo?.dietaryRequirements || "",
          hasHealthFund: res.data.medicalInfo?.hasHealthFund || "",
          healthFundName: res.data.medicalInfo?.healthFundName || "",
          healthFundNumber: res.data.medicalInfo?.healthFundNumber || "",
          hasAmbulanceCover: res.data.medicalInfo?.hasAmbulanceCover || "",
          medicareNumber: res.data.medicalInfo?.medicareNumber || "",
          medicarePosition: res.data.medicalInfo?.medicarePosition || "",
        },
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

  const handleMedicalChange = (e) => {
    const { name, value } = e.target;
    const field = name.split(".")[1];
    setForm(prev => ({
      ...prev,
      medicalInfo: { ...prev.medicalInfo, [field]: value }
    }));
  };

  // PHOTO UPLOAD
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mototrekkin_profiles"); // you can create this in Cloudinary → Settings → Upload Presets (unsigned)

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm(prev => ({ ...prev, photoUrl: data.secure_url }));
      setSuccess("Photo uploaded! Click Save to confirm.");
    } catch (err) {
      setError("Photo upload failed");
    } finally {
      setUploading(false);
    }
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

  // Avatar with initials fallback
  const Avatar = () => {
    const name = `${form.firstName || ""} ${form.lastName || ""}`.trim();
    const initials = name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    return (
      <div className="relative">
        {form.photoUrl ? (
          <img
            src={form.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {initials}
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        {uploading && <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"><span className="text-white">Uploading...</span></div>}
      </div>
    );
  };

  if (loading) return <div className="p-10 text-center text-lg text-gray-600">Loading your profile...</div>;
  if (error && !profile) return (
    <div className="p-10 text-center">
      <p className="text-red-600 mb-4">{error}</p>
      <button onClick={fetchProfile} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Retry</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Account Details & Profile</h2>

      {success && <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">{success}</div>}
      {error && <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">{error}</div>}

      <form onSubmit={handleSave} className="space-y-8">

        {/* PROFILE PHOTO + NAME */}
        <Section title="Profile Photo">
          <div className="flex flex-col items-center md:flex-row gap-8">
            <Avatar />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold">{form.firstName} {form.lastName}</h3>
              <p className="text-gray-600">{form.email}</p>
              <p className="text-sm text-gray-500 mt-2">Click the camera icon to change photo</p>
            </div>
          </div>
        </Section>

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
            <Input label="Landline" name="emergencyLandline" value={form.emergencyLandline || ""} onChange={handleChange} placeholder="+61123456789" />
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

        {/* MEDICAL INFORMATION */}
        <Section title="Medical Information">
          <div className="space-y-6">

            <Select
              label="Do you have any medical conditions?"
              name="medicalInfo.hasMedicalCondition"
              value={form.medicalInfo?.hasMedicalCondition || ""}
              onChange={handleMedicalChange}
              options={["", "Yes", "No"]}
              required
            />
            {form.medicalInfo?.hasMedicalCondition === "Yes" && (
              <Input label="Please describe" name="medicalInfo.medicalCondition" value={form.medicalInfo?.medicalCondition || ""} onChange={handleMedicalChange} />
            )}

            <Input label="Current Medications" name="medicalInfo.medications" value={form.medicalInfo?.medications || ""} onChange={handleMedicalChange} />

            <Select
              label="Do you have medication allergies?"
              name="medicalInfo.hasMedicationAllergies"
              value={form.medicalInfo?.hasMedicationAllergies || ""}
              onChange={handleMedicalChange}
              options={["", "Yes", "No"]}
              required
            />
            {form.medicalInfo?.hasMedicationAllergies === "Yes" && (
              <Input label="List allergies" name="medicalInfo.medicationAllergies" value={form.medicalInfo?.medicationAllergies || ""} onChange={handleMedicalChange} />
            )}

            <Select
              label="Do you have food allergies?"
              name="medicalInfo.hasFoodAllergies"
              value={form.medicalInfo?.hasFoodAllergies || ""}
              onChange={handleMedicalChange}
              options={["", "Yes", "No"]}
              required
            />
            {form.medicalInfo?.hasFoodAllergies === "Yes" && (
              <Input label="List food allergies" name="medicalInfo.foodAllergies" value={form.medicalInfo?.foodAllergies || ""} onChange={handleMedicalChange} />
            )}

            <Input label="Dietary Requirements (e.g. vegetarian, gluten-free)" name="medicalInfo.dietaryRequirements" value={form.medicalInfo?.dietaryRequirements || ""} onChange={handleMedicalChange} />

            <Select
              label="Private Health Fund?"
              name="medicalInfo.hasHealthFund"
              value={form.medicalInfo?.hasHealthFund || ""}
              onChange={handleMedicalChange}
              options={["", "Yes", "No"]}
            />
            {form.medicalInfo?.hasHealthFund === "Yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Health Fund Name" name="medicalInfo.healthFundName" value={form.medicalInfo?.healthFundName || ""} onChange={handleMedicalChange} />
                <Input label="Membership Number" name="medicalInfo.healthFundNumber" value={form.medicalInfo?.healthFundNumber || ""} onChange={handleMedicalChange} />
              </div>
            )}

            <Select
              label="Ambulance Cover?"
              name="medicalInfo.hasAmbulanceCover"
              value={form.medicalInfo?.hasAmbulanceCover || ""}
              onChange={handleMedicalChange}
              options={["", "Yes", "No"]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Medicare Number" name="medicalInfo.medicareNumber" value={form.medicalInfo?.medicareNumber || ""} onChange={handleMedicalChange} />
              <Input label="Position on Card (e.g. 1)" name="medicalInfo.medicarePosition" value={form.medicalInfo?.medicarePosition || ""} onChange={handleMedicalChange} />
            </div>
          </div>
        </Section>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
          <button type="button" onClick={fetchProfile} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-8 py-3 rounded-lg font-medium text-white transition ${saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
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

const Select = ({ label, name, value, onChange, options, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    >
      <option value="">— Select —</option>
      {options.filter(opt => opt !== "").map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default AccountDetails;