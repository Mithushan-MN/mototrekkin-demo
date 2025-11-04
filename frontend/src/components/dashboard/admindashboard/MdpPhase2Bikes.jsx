// components/MdpPhase2Bikes.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";

const MdpPhase2Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [editError, setEditError] = useState("");

  const [addMode, setAddMode] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    dailyRate: "",
    remaining: "",
    isActive: true,
    description: "",
  });
  const [addError, setAddError] = useState("");

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axios.get("/api/bikes");
      const list = res.data.success && Array.isArray(res.data.bikes) ? res.data.bikes : [];
      setBikes(list);
    } catch (err) {
      console.error("Fetch error:", err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deactivate this bike?")) return;
    try {
      await axios.delete(`/api/bikes/${id}`);
      setBikes((prev) => prev.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEditClick = () => {
    if (!selectedBike) return;
    setEditData({
      name: selectedBike.name,
      dailyRate: selectedBike.dailyRate,
      remaining: selectedBike.remaining,
      isActive: selectedBike.isActive,
      description: selectedBike.description || "",
    });
    setEditMode(true);
    setEditError("");
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    try {
      const payload = {
        ...editData,
        dailyRate: Number(editData.dailyRate),
        remaining: Number(editData.remaining),
      };
      const res = await axios.put(`/api/bikes/${selectedBike._id}`, payload);
      setBikes((prev) =>
        prev.map((b) => (b._id === selectedBike._id ? res.data.bike : b))
      );
      setSelectedBike(res.data.bike);
      setEditMode(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed");
    }
  };

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      const payload = {
        ...addData,
        dailyRate: Number(addData.dailyRate),
        remaining: Number(addData.remaining),
      };
      const res = await axios.post("/api/bikes", payload);
      setBikes((prev) => [...prev, res.data.bike]);
      setAddMode(false);
      setAddData({
        name: "",
        dailyRate: "",
        remaining: "",
        isActive: true,
        description: "",
      });
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add bike");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading bikes...</p>;

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">MDP Phase 2 Bikes</h2>
        <button
          onClick={() => {
            setAddMode(true);
            setAddError("");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold"
        >
          + Add Bike
        </button>
      </div>

      {bikes.length === 0 && (
        <p className="text-center text-yellow-500 mt-10">
          No active bikes. Click "+ Add Bike" to start.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelectedBike(bike)}
          >
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-2">
              No Image
            </div>
            <h3 className="font-semibold text-center">{bike.name}</h3>
            <p className="text-yellow-400 text-center">{bike.dailyRate} $/Day</p>
            <p className="text-green-400 text-center">Remaining: {bike.remaining}</p>
          </div>
        ))}
      </div>

      {/* DETAIL / EDIT / DELETE MODAL */}
      {selectedBike && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => {
            setSelectedBike(null);
            setEditMode(false);
            setEditError("");
          }}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-3xl p-6 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {!editMode ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-4">
                  {selectedBike.name}
                </h2>
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
                  No Image
                </div>
                <p className="text-yellow-400 mb-2">Daily Rate: ${selectedBike.dailyRate}</p>
                <p className="text-green-400 mb-2">Remaining: {selectedBike.remaining}</p>
                {selectedBike.description && (
                  <p className="text-gray-300 text-sm mb-2">Desc: {selectedBike.description}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedBike._id)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => setSelectedBike(null)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Edit {selectedBike.name}
                </h2>
                {editError && <p className="text-red-400 text-sm">{editError}</p>}
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="dailyRate"
                  value={editData.dailyRate}
                  onChange={handleEditChange}
                  placeholder="Daily Rate"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="remaining"
                  value={editData.remaining}
                  onChange={handleEditChange}
                  placeholder="Remaining"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Description (optional)"
                  className="w-full p-2 rounded bg-gray-700 text-white h-20"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editData.isActive}
                    onChange={handleEditChange}
                  />
                  <label>Active</label>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-400 rounded font-semibold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => setAddMode(false)}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <h2 className="text-2xl font-bold text-center mb-2">Add New Bike</h2>
              {addError && <p className="text-red-400 text-sm">{addError}</p>}
              <input
                type="text"
                name="name"
                value={addData.name}
                onChange={handleAddChange}
                placeholder="Bike Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="number"
                name="dailyRate"
                value={addData.dailyRate}
                onChange={handleAddChange}
                placeholder="Daily Rate ($)"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="number"
                name="remaining"
                value={addData.remaining}
                onChange={handleAddChange}
                placeholder="Remaining"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <textarea
                name="description"
                value={addData.description}
                onChange={handleAddChange}
                placeholder="Description"
                className="w-full p-2 rounded bg-gray-700 text-white h-20"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={addData.isActive}
                  onChange={handleAddChange}
                />
                <label>Active</label>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-400 rounded font-semibold"
                >
                  Add Bike
                </button>
                <button
                  type="button"
                  onClick={() => setAddMode(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
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

export default MdpPhase2Bikes;