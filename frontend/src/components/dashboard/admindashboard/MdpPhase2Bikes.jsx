// components/MdpPhase2Bikes.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../../axiosConfig";
import { format } from "date-fns";

const MdpPhase2Bikes = () => {
  /* ────────────────────── STATE ────────────────────── */
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

  /* ────── FILTER STATE ────── */
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All"); // All | true | false

  /* ────────────────────── FETCH ────────────────────── */
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const { data } = await axios.get("/api/bikes");
      const list =
        data.success && Array.isArray(data.bikes) ? data.bikes : [];
      setBikes(list);
    } catch (err) {
      console.error("Fetch error:", err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ────── FILTERED LIST ────── */
  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      // ---- search ----
      const term = search.toLowerCase();
      const nameMatch = bike.name?.toLowerCase().includes(term);
      const rateMatch = bike.dailyRate?.toString().includes(term);
      const remMatch = bike.remaining?.toString().includes(term);
      const descMatch = bike.description?.toLowerCase().includes(term);
      const searchOk =
        !search || nameMatch || rateMatch || remMatch || descMatch;

      // ---- active ----
      const activeOk =
        activeFilter === "All" ||
        (activeFilter === "true" && bike.isActive) ||
        (activeFilter === "false" && !bike.isActive);

      return searchOk && activeOk;
    });
  }, [bikes, search, activeFilter]);

  /* ────────────────────── CRUD ────────────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Deactivate this bike?")) return;
    try {
      await axios.delete(`/api/bikes/${id}`);
      setBikes((p) => p.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ────── EDIT ────── */
  const openEdit = () => {
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
    setEditData((p) => ({
      ...p,
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
      const { data } = await axios.put(
        `/api/bikes/${selectedBike._id}`,
        payload
      );
      setBikes((p) =>
        p.map((b) => (b._id === selectedBike._id ? data.bike : b))
      );
      setSelectedBike(data.bike);
      setEditMode(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed");
    }
  };

  /* ────── ADD ────── */
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddData((p) => ({
      ...p,
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
      const { data } = await axios.post("/api/bikes", payload);
      setBikes((p) => [...p, data.bike]);
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

  /* ────── EXPORT CSV ────── */
  const exportCSV = () => {
    if (filteredBikes.length === 0) return alert("No bikes to export");

    const headers = [
      "Name",
      "Daily Rate $",
      "Remaining",
      "Active",
      "Description",
    ];
    const rows = filteredBikes.map((b) => [
      b.name,
      b.dailyRate,
      b.remaining,
      b.isActive ? "Yes" : "No",
      b.description || "",
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mdp-phase2-bikes-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  /* ────────────────────── UI ────────────────────── */
  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400">Loading bikes...</p>
    );

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans min-h-screen text-white">
      {/* ────── HEADER + FILTERS ────── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">MDP Phase 2 Bikes</h2>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search name, rate, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full lg:w-64"
          />

          {/* Active filter */}
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="All">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* Export */}
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition"
          >
            Export CSV
          </button>

          {/* Add */}
          <button
            onClick={() => {
              setAddMode(true);
              setAddError("");
            }}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-semibold transition"
          >
            + Add Bike
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="mb-4">
        <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
          {filteredBikes.length} shown ({bikes.length} total)
        </span>
      </div>

      {/* Empty */}
      {filteredBikes.length === 0 && (
        <p className="text-center mt-10 text-yellow-500">
          {bikes.length === 0
            ? "No active bikes. Click “+ Add Bike” to start."
            : "No bikes match your filters."}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelectedBike(bike)}
          >
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-2">
              No Image
            </div>
            <h3 className="font-semibold text-center">{bike.name}</h3>
            <p className="text-yellow-400 text-center">
              {bike.dailyRate} $/Day
            </p>
            <p className="text-green-400 text-center">
              Remaining: {bike.remaining}
            </p>
            <p
              className={`text-xs mt-1 ${
                bike.isActive ? "text-green-400" : "text-red-400"
              }`}
            >
              {bike.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>

      {/* ────── DETAIL / EDIT / DEACTIVATE MODAL ────── */}
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
                <p className="text-yellow-400 mb-2">
                  Daily Rate: ${selectedBike.dailyRate}
                </p>
                <p className="text-green-400 mb-2">
                  Remaining: {selectedBike.remaining}
                </p>
                {selectedBike.description && (
                  <p className="text-gray-300 text-sm mb-2">
                    Desc: {selectedBike.description}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={openEdit}
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
              /* ────── EDIT FORM ────── */
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Edit {selectedBike.name}
                </h2>
                {editError && (
                  <p className="text-red-400 text-sm">{editError}</p>
                )}
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
                <div className="flex items-center space-x-2 text-white">
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

      {/* ────── ADD MODAL ────── */}
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
              <h2 className="text-2xl font-bold text-center mb-2">
                Add New Bike
              </h2>
              {addError && (
                <p className="text-red-400 text-sm">{addError}</p>
              )}
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
              <div className="flex items-center space-x-2 text-white">
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