// components/MyGarage.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../axiosConfig";
import { format } from "date-fns";

const MyGarage = () => {
  /* ────────────────────── STATE ────────────────────── */
  const [myBikes, setMyBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
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
    imageUrl: "", // optional
  });
  const [addError, setAddError] = useState("");

  const [search, setSearch] = useState("");

  /* ────────────────────── FETCH USER'S BIKES ────────────────────── */
  useEffect(() => {
    fetchMyBikes();
  }, []);

  const fetchMyBikes = async () => {
    try {
      const { data } = await axios.get("/api/users/me/bikes"); // adjust endpoint as needed
      const list = data.success && Array.isArray(data.bikes) ? data.bikes : [];
      setMyBikes(list);
    } catch (err) {
      console.error("Failed to load your bikes:", err);
      alert(err.response?.data?.message || "Could not load your garage.");
      setMyBikes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ────── FILTERED LIST ────── */
  const filteredBikes = useMemo(() => {
    return myBikes.filter((bike) => {
      const term = search.toLowerCase();
      return (
        !search ||
        bike.name?.toLowerCase().includes(term) ||
        bike.brand?.toLowerCase().includes(term) ||
        bike.model?.toLowerCase().includes(term) ||
        bike.year?.toString().includes(term) ||
        bike.description?.toLowerCase().includes(term)
      );
    });
  }, [myBikes, search]);

  /* ────── CRUD OPERATIONS ────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this bike from your garage?")) return;

    try {
      await axios.delete(`/api/users/me/bikes/${id}`);
      setMyBikes((prev) => prev.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove bike");
    }
  };

  /* ────── EDIT ────── */
  const openEdit = () => {
    if (!selectedBike) return;
    setEditData({ ...selectedBike });
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
        year: editData.year ? Number(editData.year) : undefined,
      };

      const { data } = await axios.put(
        `/api/users/me/bikes/${selectedBike._id}`,
        payload
      );

      setMyBikes((p) => p.map((b) => (b._id === selectedBike._id ? data.bike : b)));
      setSelectedBike(data.bike);
      setEditMode(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed");
    }
  };

  /* ────── ADD NEW BIKE ────── */
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
        year: addData.year ? Number(addData.year) : undefined,
      };

      const { data } = await axios.post("/api/users/me/bikes", payload);
      setMyBikes((p) => [...p, data.bike]);
      setAddMode(false);
      setAddData({
        name: "",
        brand: "",
        model: "",
        year: "",
        dailyRate: "",
        isAvailable: true,
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add bike");
    }
  };

  /* ────── EXPORT CSV (optional for personal use) ────── */
  const exportMyGarageCSV = () => {
    if (filteredBikes.length === 0) return alert("No bikes to export");

    const headers = ["Name", "Brand", "Model", "Year", "Daily Rate $", "Available", "Description"];
    const rows = filteredBikes.map((b) => [
      b.name || "",
      b.brand || "",
      b.model || "",
      b.year || "",
      b.dailyRate || "",
      b.isAvailable ? "Yes" : "No",
      b.description || "",
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-garage-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  /* ────────────────────── UI ────────────────────── */
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">Loading your garage...</div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">My Garage</h2>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search your bikes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full lg:w-64"
          />

          <button
            onClick={exportMyGarageCSV}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => {
              setAddMode(true);
              setAddError("");
            }}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-semibold transition"
          >
            + Add My Bike
          </button>
        </div>
      </div>

      {/* Counter */}
      <div className="mb-4">
        <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
          {filteredBikes.length} bike{filteredBikes.length !== 1 ? "s" : ""} in your garage
        </span>
      </div>

      {/* Empty State */}
      {filteredBikes.length === 0 && (
        <p className="text-center mt-10 text-yellow-500">
          {myBikes.length === 0
            ? "Your garage is empty. Click “+ Add My Bike” to get started!"
            : "No bikes match your search."}
        </p>
      )}

      {/* Bike Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-xl transition border border-gray-700"
            onClick={() => setSelectedBike(bike)}
          >
            <div className="w-full h-40 bg-gray-700 rounded-md mb-3 flex items-center justify-center text-gray-500 text-xs">
              {bike.imageUrl ? (
                <img src={bike.imageUrl} alt={bike.name} className="w-full h-full object-cover rounded-md" />
              ) : (
                "No Image"
              )}
            </div>
            <h3 className="font-semibold text-lg truncate">{bike.name}</h3>
            <p className="text-sm text-gray-400">
              {bike.brand} {bike.model} {bike.year && `(${bike.year})`}
            </p>
            <p className="text-yellow-400 font-medium">{bike.dailyRate} $/day</p>
            <p className={`text-sm mt-1 ${bike.isAvailable ? "text-green-400" : "text-red-400"}`}>
              {bike.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>
        ))}
      </div>

      {/* Detail / Edit Modal */}
      {selectedBike && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setSelectedBike(null);
            setEditMode(false);
          }}
        >
          <div
            className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!editMode ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-4">{selectedBike.name}</h2>
                <div className="w-full h-64 bg-gray-700 rounded-md mb-4 overflow-hidden">
                  {selectedBike.imageUrl ? (
                    <img src={selectedBike.imageUrl} alt={selectedBike.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                  )}
                </div>

                <div className="space-y-2 text-lg">
                  <p><strong>Brand:</strong> {selectedBike.brand || "-"}</p>
                  <p><strong>Model:</strong> {selectedBike.model || "-"}</p>
                  <p><strong>Year:</strong> {selectedBike.year || "-"}</p>
                  <p><strong>Daily Rate:</strong> <span className="text-yellow-400">${selectedBike.dailyRate}</span></p>
                  <p><strong>Status:</strong> <span className={selectedBike.isAvailable ? "text-green-400" : "text-red-400"}>
                    {selectedBike.isAvailable ? "Available" : "Not Available"}
                  </span></p>
                  {selectedBike.description && (
                    <p className="text-gray-300 text-sm mt-3"><strong>Description:</strong> {selectedBike.description}</p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={openEdit} className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 rounded font-bold">
                    Edit Bike
                  </button>
                  <button onClick={() => handleDelete(selectedBike._id)} className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded font-bold">
                    Remove from Garage
                  </button>
                  <button onClick={() => setSelectedBike(null)} className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded font-bold">
                    Close
                  </button>
                </div>
              </>
            ) : (
              /* Edit Form */
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Edit Bike</h2>
                {editError && <p className="text-red-400 text-sm">{editError}</p>}

                <input name="name" value={editData.name} onChange={handleEditChange} placeholder="Name" required className="w-full p-3 bg-gray-700 rounded" />
                <input name="brand" value={editData.brand || ""} onChange={handleEditChange} placeholder="Brand" className="w-full p-3 bg-gray-700 rounded" />
                <input name="model" value={editData.model || ""} onChange={handleEditChange} placeholder="Model" className="w-full p-3 bg-gray-700 rounded" />
                <input name="year" type="number" value={editData.year || ""} onChange={handleEditChange} placeholder="Year" className="w-full p-3 bg-gray-700 rounded" />
                <input name="dailyRate" type="number" value={editData.dailyRate} onChange={handleEditChange} placeholder="Daily Rate ($)" required className="w-full p-3 bg-gray-700 rounded" />
                <textarea name="description" value={editData.description || ""} onChange={handleEditChange} placeholder="Description" className="w-full p-3 bg-gray-700 rounded h-24" />
                <input name="imageUrl" value={editData.imageUrl || ""} onChange={handleEditChange} placeholder="Image URL (optional)" className="w-full p-3 bg-gray-700 rounded" />

                <div className="flex items-center gap-3">
                  <input type="checkbox" name="isAvailable" checked={editData.isAvailable} onChange={handleEditChange} />
                  <label>Available for rent</label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 py-3 bg-green-500 hover:bg-green-400 rounded font-bold">Save Changes</button>
                  <button type="button" onClick={() => setEditMode(false)} className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded font-bold">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Bike Modal */}
      {addMode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setAddMode(false)}>
          <div className="bg-gray-800 rounded-lg max-w-xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center">Add Bike to My Garage</h2>
              {addError && <p className="text-red-400 text-sm">{addError}</p>}

              <input name="name" value={addData.name} onChange={handleAddChange} placeholder="Bike Name" required className="w-full p-3 bg-gray-700 rounded" />
              <input name="brand" value={addData.brand} onChange={handleAddChange} placeholder="Brand (e.g. Yamaha)" className="w-full p-3 bg-gray-700 rounded" />
              <input name="model" value={addData.model} onChange={handleAddChange} placeholder="Model" className="w-full p-3 bg-gray-700 rounded" />
              <input name="year" type="number" value={addData.year} onChange={handleAddChange} placeholder="Year" className="w-full p-3 bg-gray-700 rounded" />
              <input name="dailyRate" type="number" value={addData.dailyRate} onChange={handleAddChange} placeholder="Daily Rate ($)" required className="w-full p-3 bg-gray-700 rounded" />
              <textarea name="description" value={addData.description} onChange={handleAddChange} placeholder="Description (optional)" className="w-full p-3 bg-gray-700 rounded h-24" />
              <input name="imageUrl" value={addData.imageUrl} onChange={handleAddChange} placeholder="Image URL (optional)" className="w-full p-3 bg-gray-700 rounded" />

              <div className="flex items-center gap-3">
                <input type="checkbox" name="isAvailable" checked={addData.isAvailable} onChange={handleAddChange} />
                <label>Available for rent</label>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 py-3 bg-green-500 hover:bg-green-400 rounded font-bold">Add to Garage</button>
                <button type="button" onClick={() => setAddMode(false)} className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGarage;