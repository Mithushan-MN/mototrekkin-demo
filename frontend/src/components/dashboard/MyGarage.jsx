// components/MyGarage.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "../../axiosConfig";
import { format } from "date-fns";

const MyGarage = () => {
  const [myBikes, setMyBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [editUploading, setEditUploading] = useState(false);
  const [editError, setEditError] = useState("");

  const [addMode, setAddMode] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    dailyRate: "",
    isAvailable: true,
    description: "",
    imageUrl: "",
  });
  const [addUploading, setAddUploading] = useState(false);
  const [addError, setAddError] = useState("");

  const [search, setSearch] = useState("");

  // Cloudinary Settings
  const CLOUDINARY_CLOUD_NAME = "doxov8fwn";
  const UPLOAD_PRESET = "mototrekkin_bikes"; // ← Make sure this preset exists (unsigned)

  const addFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  // Fetch all bikes
  useEffect(() => {
    fetchMyBikes();
  }, []);

  const fetchMyBikes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users/me/bikes");
      setMyBikes(data.bikes || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load your garage");
      setMyBikes([]);
    } finally {
      setLoading(false);
    }
  };

  // Shared image upload function
  const uploadImage = async (file, isAddMode = true) => {
    if (!file) return;

    const setUploading = isAddMode ? setAddUploading : setEditUploading;
    const setData = isAddMode ? setAddData : setEditData;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setData(prev => ({ ...prev, imageUrl: data.secure_url }));
    } catch (err) {
      alert("Image upload failed. Check Cloudinary preset.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Reusable Image Uploader Component
  const ImageUploader = ({ imageUrl, onUpload, uploading, fileInputRef, isAdd = true }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">Bike Photo</label>
      <div
        className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 transition bg-gray-800"
        onClick={() => fileInputRef.current?.click()}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Bike preview"
            className="mx-auto max-h-64 rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="text-gray-400">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16l16-12 16 12v20a4 4 0 01-4 4H8a4 4 0 01-4-4V16z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 32l8-8m-8 8l-8-8m16 8l8-8" />
            </svg>
            <p className="mt-3 text-lg">Click or drop image here</p>
            <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
          </div>
        )}
        {uploading && (
          <div className="mt-4 text-orange-400 font-medium">Uploading photo...</div>
        )}
      </div>
      {imageUrl && !uploading && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-orange-400 hover:text-orange-300 underline"
        >
          Change Photo
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => onUpload(e.target.files[0], isAdd)}
        className="hidden"
      />
    </div>
  );

  // Filter bikes
  const filteredBikes = useMemo(() => {
    return myBikes.filter((bike) => {
      const term = search.toLowerCase();
      return (
        bike.name?.toLowerCase().includes(term) ||
        bike.brand?.toLowerCase().includes(term) ||
        bike.model?.toLowerCase().includes(term) ||
        bike.year?.toString().includes(term)
      );
    });
  }, [myBikes, search]);

  // Delete bike
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this bike from your garage?")) return;
    try {
      await axios.delete(`/api/userbikes/${id}`);
      setMyBikes(prev => prev.filter(b => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert("Failed to delete bike");
    }
  };

  // Add bike
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      const payload = {
        ...addData,
        dailyRate: Number(addData.dailyRate),
        year: addData.year ? Number(addData.year) : undefined,
      };
      const { data } = await axios.post("/api/userbikes", payload);
      setMyBikes(prev => [...prev, data.bike]);
      setAddMode(false);
      setAddData({
        name: "", brand: "", model: "", year: "", dailyRate: "",
        isAvailable: true, description: "", imageUrl: ""
      });
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add bike");
    }
  };

  // Edit bike
  const openEdit = () => {
    setEditData({ ...selectedBike });
    setEditMode(true);
    setEditError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    try {
      const payload = {
        ...editData,
        dailyRate: Number(editData.dailyRate),
        year: editData.year ? Number(editData.year) : undefined,
      };
      const { data } = await axios.put(`/api/userbikes/${selectedBike._id}`, payload);
      setMyBikes(prev => prev.map(b => b._id === selectedBike._id ? data.bike : b));
      setSelectedBike(data.bike);
      setEditMode(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading your garage...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h1 className="text-4xl font-bold">My Garage</h1>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search your bikes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-80"
            />
            <button
              onClick={() => setAddMode(true)}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-bold transition"
            >
              + Add Bike
            </button>
          </div>
        </div>

        <p className="text-orange-400 text-lg mb-8">
          {filteredBikes.length} bike{filteredBikes.length !== 1 ? "s" : ""} in your garage
        </p>

        {/* Bike Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBikes.map((bike) => (
            <div
              key={bike._id}
              onClick={() => setSelectedBike(bike)}
              className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-orange-500 transition-all shadow-lg"
            >
              {bike.imageUrl ? (
                <img src={bike.imageUrl} alt={bike.name} className="w-full h-56 object-cover" />
              ) : (
                <div className="bg-gray-700 h-56 flex items-center justify-center text-gray-500 text-lg">
                  No Photo
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold truncate">{bike.name}</h3>
                <p className="text-gray-400">
                  {bike.brand} {bike.model} {bike.year && `(${bike.year})`}
                </p>
                <p className="text-2xl font-bold text-yellow-400 mt-2">
                  ${bike.dailyRate}/day
                </p>
                <p className={`mt-2 text-sm ${bike.isAvailable ? "text-green-400" : "text-red-400"}`}>
                  {bike.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBikes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
              {myBikes.length === 0
                ? "Your garage is empty. Add your first bike!"
                : "No bikes match your search."}
            </p>
          </div>
        )}
      </div>

      {/* Add Bike Modal */}
      {addMode && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setAddMode(false)}>
          <div className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold mb-8 text-center">Add Your Bike</h2>
            {addError && <p className="text-red-400 text-center mb-4">{addError}</p>}
            <form onSubmit={handleAddSubmit} className="space-y-6">
              <ImageUploader
                imageUrl={addData.imageUrl}
                onUpload={uploadImage}
                uploading={addUploading}
                fileInputRef={addFileInputRef}
                isAdd={true}
              />
              <input
                name="name"
                value={addData.name}
                onChange={(e) => setAddData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Bike Name *"
                required
                className="w-full px-5 py-4 bg-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  name="brand"
                  value={addData.brand}
                  onChange={(e) => setAddData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Brand"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
                <input
                  name="model"
                  value={addData.model}
                  onChange={(e) => setAddData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Model"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input
                  name="year"
                  type="number"
                  value={addData.year}
                  onChange={(e) => setAddData(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="Year"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
                <input
                  name="dailyRate"
                  type="number"
                  value={addData.dailyRate}
                  onChange={(e) => setAddData(prev => ({ ...prev, dailyRate: e.target.value }))}
                  placeholder="Daily Rate ($)"
                  required
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
              </div>
              <textarea
                name="description"
                value={addData.description}
                onChange={(e) => setAddData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description (optional)"
                rows={4}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
              <label className="flex items-center gap-4 text-lg">
                <input
                  type="checkbox"
                  checked={addData.isAvailable}
                  onChange={(e) => setAddData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                  className="w-6 h-6"
                />
                <span>Available for rent</span>
              </label>
              <div className="flex gap-6 pt-6">
                <button
                  type="submit"
                  disabled={addUploading}
                  className="flex-1 py-5 bg-orange-600 hover:bg-orange-700 rounded-xl font-bold text-xl transition disabled:opacity-70"
                >
                  {addUploading ? "Uploading..." : "Add to Garage"}
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode(false)}
                  className="flex-1 py-5 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View / Edit Modal */}
      {selectedBike && !editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBike(null)}>
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-4xl font-bold text-center mb-8">{selectedBike.name}</h2>
            {selectedBike.imageUrl ? (
              <img src={selectedBike.imageUrl} alt={selectedBike.name} className="w-full h-96 object-cover rounded-xl mb-8 shadow-2xl" />
            ) : (
              <div className="bg-gray-700 h-96 rounded-xl mb-8 flex items-center justify-center text-3xl text-gray-500">No Photo</div>
            )}
            <div className="grid grid-cols-2 gap-8 text-xl">
              <p><strong>Brand:</strong> {selectedBike.brand || "-"}</p>
              <p><strong>Model:</strong> {selectedBike.model || "-"}</p>
              <p><strong>Year:</strong> {selectedBike.year || "-"}</p>
              <p><strong>Daily Rate:</strong> <span className="text-yellow-400 font-bold">${selectedBike.dailyRate}</span></p>
              <p><strong>Status:</strong> <span className={selectedBike.isAvailable ? "text-green-400" : "text-red-400"}>
                {selectedBike.isAvailable ? "Available" : "Not Available"}
              </span></p>
            </div>
            {selectedBike.description && (
              <p className="mt-8 text-lg text-gray-300"><strong>Description:</strong> {selectedBike.description}</p>
            )}
            <div className="flex gap-6 mt-10">
              <button onClick={openEdit} className="flex-1 py-5 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-xl">
                Edit Bike
              </button>
              <button onClick={() => handleDelete(selectedBike._id)} className="flex-1 py-5 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-xl">
                Remove from Garage
              </button>
              <button onClick={() => setSelectedBike(null)} className="flex-1 py-5 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editMode && selectedBike && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setEditMode(false)}>
          <div className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold mb-8 text-center">Edit Bike</h2>
            {editError && <p className="text-red-400 text-center mb-4">{editError}</p>}
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <ImageUploader
                imageUrl={editData.imageUrl}
                onUpload={(file) => uploadImage(file, false)}
                uploading={editUploading}
                fileInputRef={editFileInputRef}
                isAdd={false}
              />
              <input
                name="name"
                value={editData.name || ""}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Bike Name *"
                required
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-6">
                <input
                  name="brand"
                  value={editData.brand || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Brand"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
                <input
                  name="model"
                  value={editData.model || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Model"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input
                  name="year"
                  type="number"
                  value={editData.year || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="Year"
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
                <input
                  name="dailyRate"
                  type="number"
                  value={editData.dailyRate || ""}
                  onChange={(e) => setEditData(prev => ({ ...prev, dailyRate: e.target.value }))}
                  placeholder="Daily Rate ($)"
                  required
                  className="px-5 py-4 bg-gray-700 rounded-lg"
                />
              </div>
              <textarea
                name="description"
                value={editData.description || ""}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description"
                rows={4}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
              <label className="flex items-center gap-4 text-lg">
                <input
                  type="checkbox"
                  checked={editData.isAvailable || false}
                  onChange={(e) => setEditData(prev => ({ ...prev, isAvailable: e.target.checked }))}
                  className="w-6 h-6"
                />
                <span>Available for rent</span>
              </label>
              <div className="flex gap-6 pt-6">
                <button
                  type="submit"
                  disabled={editUploading}
                  className="flex-1 py-5 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-xl transition"
                >
                  {editUploading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-5 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGarage;