// components/NzBikes.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "../../../axiosConfig";
import { format } from "date-fns";

const NzBikes = () => {
  /* ────────────────────── STATE ────────────────────── */
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ specs: {} });
  const [editError, setEditError] = useState("");

  const [addMode, setAddMode] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    price: "",
    remaining: "",
    available: true,
    image: "",
    specs: {
      mileage: "Not Available",
      displacement: "Not Available",
      engineType: "Not Available",
      cylinders: "Not Available",
      maxPower: "Not Available",
      maxTorque: "Not Available",
      frontBrake: "Not Available",
      rearBrake: "Not Available",
      fuelCapacity: "Not Available",
      bodyType: "Not Available",
    },
  });
  const [addError, setAddError] = useState("");

  /* ────── FILTER STATE ────── */
  const [search, setSearch] = useState("");
  const [availFilter, setAvailFilter] = useState("All"); // All | true | false

  /* ────────────────────── FETCH ────────────────────── */
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      // const { data } = await axios.get("/api/nz-bikes");
      const { data } = await axios.get("/nz-bikes");
      const list = Array.isArray(data) ? data : [];
      setBikes(list);
    } catch (err) {
      console.error("Fetch error:", err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ────── FILTERED LIST (search + availability) ────── */
  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      // ---- search ----
      const term = search.toLowerCase();
      const nameMatch = bike.name?.toLowerCase().includes(term);
      const priceMatch = bike.price?.toString().includes(term);
      const remainingMatch = bike.remaining?.toString().includes(term);
      const specsMatch = Object.values(bike.specs || {})
        .join(" ")
        .toLowerCase()
        .includes(term);
      const searchOk = !search || nameMatch || priceMatch || remainingMatch || specsMatch;

      // ---- availability ----
      const availOk =
        availFilter === "All" ||
        (availFilter === "true" && bike.available) ||
        (availFilter === "false" && !bike.available);

      return searchOk && availOk;
    });
  }, [bikes, search, availFilter]);

  /* ────────────────────── CRUD ────────────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    try {
      await axios.delete(`/nz-bikes/${id}`);
      setBikes((p) => p.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ────── EDIT ────── */
  const openEdit = () => {
    if (!selectedBike) return;
    const specsObj =
      typeof selectedBike.specs === "string"
        ? JSON.parse(selectedBike.specs)
        : selectedBike.specs || {};

    setEditData({
      name: selectedBike.name,
      price: selectedBike.price,
      remaining: selectedBike.remaining,
      available: selectedBike.available ?? true,
      image: selectedBike.image || "",
      specs: specsObj,
    });
    setEditMode(true);
    setEditError("");
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in editData.specs) {
      setEditData((p) => ({
        ...p,
        specs: { ...p.specs, [name]: value },
      }));
    } else if (type === "checkbox") {
      setEditData((p) => ({ ...p, [name]: checked }));
    } else {
      setEditData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    try {
      const payload = {
        ...editData,
        price: Number(editData.price),
        remaining: Number(editData.remaining),
        specs: editData.specs,
      };
      const { data } = await axios.put(
        `/nz-bikes/${selectedBike._id}`,
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
    if (name in addData.specs) {
      setAddData((p) => ({
        ...p,
        specs: { ...p.specs, [name]: value },
      }));
    } else if (type === "checkbox") {
      setAddData((p) => ({ ...p, [name]: checked }));
    } else {
      setAddData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      const payload = {
        ...addData,
        price: Number(addData.price),
        remaining: Number(addData.remaining),
        specs: addData.specs,
      };
      constObject;
      const { data } = await axios.post("/nz-bikes", payload);
      setBikes((p) => [...p, data.bike]);
      setAddMode(false);
      // reset form (keep spec keys)
      setAddData({
        name: "",
        price: "",
        remaining: "",
        available: true,
        image: "",
        specs: { ...addData.specs },
      });
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add bike");
    }
  };

  /* ────── IMAGE ────── */
  const getImageUrl = (img) => (img ? img : null);

  /* ────── EXPORT CSV ────── */
  const exportCSV = () => {
    if (filteredBikes.length === 0) return alert("No bikes to export");

    const headers = [
      "Name",
      "Price $/Day",
      "Remaining",
      "Available",
      "Image",
      ...Object.keys(addData.specs), // all spec columns
    ];
    const rows = filteredBikes.map((b) => [
      b.name,
      b.price,
      b.remaining,
      b.available ? "Yes" : "No",
      b.image || "",
      ...Object.values(b.specs || {}),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nz-bikes-${format(new Date(), "yyyy-MM-dd")}.csv`;
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
        <h2 className="text-3xl font-bold">All Bikes</h2>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search name, price, specs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full lg:w-64"
          />

          {/* Availability */}
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="All">All Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
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
            + Add New Bike
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
            ? "No bikes found. Click “+ Add New Bike” to start."
            : "No bikes match your filters."}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col items-center cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelectedBike(bike)}
          >
            {getImageUrl(bike.image) ? (
              <img
                src={getImageUrl(bike.image)}
                alt={bike.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-32 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-2">
                No Image
              </div>
            )}
            <h3 className="font-semibold text-center">{bike.name}</h3>
            <p className="text-yellow-400 text-center">{bike.price} $/Day</p>
            <p className="text-green-400 text-center">
              Remaining: {bike.remaining}
            </p>
            <p className={`text-xs mt-1 ${bike.available ? "text-green-400" : "text-red-400"}`}>
              {bike.available ? "Available" : "Unavailable"}
            </p>
          </div>
        ))}
      </div>

      {/* ────── DETAIL / EDIT / DELETE MODAL ────── */}
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
                <h2 className="text-2xl font-bold mb-4 text-center">
                  {selectedBike.name}
                </h2>

                {getImageUrl(selectedBike.image) ? (
                  <img
                    src={getImageUrl(selectedBike.image)}
                    alt={selectedBike.name}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 rounded-md mb-4">
                    No Image
                  </div>
                )}

                <p className="text-yellow-400 mb-2">
                  Price: {selectedBike.price} $
                </p>
                <p className="text-green-400 mb-2">
                  Remaining: {selectedBike.remaining}
                </p>
                <p className="text-gray-300 mb-2 text-sm">
                  Added on:{" "}
                  {new Date(selectedBike.createdAt).toLocaleDateString()}
                </p>

                <h3 className="font-semibold mt-3 mb-1">Specifications:</h3>
                <ul className="text-gray-300 text-sm space-y-1 mb-4">
                  {Object.entries(selectedBike.specs || {}).map(
                    ([k, v]) => (
                      <li key={k}>
                        <b className="capitalize">{k}:</b> {v}
                      </li>
                    )
                  )}
                </ul>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={openEdit}
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 font-semibold flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedBike._id)}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 font-semibold flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedBike(null)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold flex-1"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              /* ────── EDIT FORM ────── */
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Edit {selectedBike.name}
                </h2>

                {editError && (
                  <p className="text-red-400 text-sm">{editError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    placeholder="Price"
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
                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleEditChange}
                    placeholder="Image path"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                  <div className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      name="available"
                      checked={editData.available}
                      onChange={handleEditChange}
                    />
                    <label>Available</label>
                  </div>
                </div>

                <h3 className="font-semibold mt-2 mb-1">Specifications:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(editData.specs).map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <label className="text-gray-300 text-sm mb-1 capitalize">
                        {k}
                      </label>
                      <input
                        type="text"
                        name={k}
                        value={v}
                        onChange={handleEditChange}
                        className="w-full p-2 rounded bg-gray-700 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 font-semibold flex-1"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEditError("");
                    }}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold flex-1"
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
          onClick={() => {
            setAddMode(false);
            setAddError("");
          }}
        >
          <div
            className="bg-gray-800 rounded-lg w-full max-w-3xl p-6 overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Add New Bike
              </h2>

              {addError && <p className="text-red-400 text-sm">{addError}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="name"
                  value={addData.name}
                  onChange={handleAddChange}
                  placeholder="Name"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={addData.price}
                  onChange={handleAddChange}
                  placeholder="Price $/Day"
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
                <input
                  type="text"
                  name="image"
                  value={addData.image}
                  onChange={handleAddChange}
                  placeholder="Image path"
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <div className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    name="available"
                    checked={addData.available}
                    onChange={handleAddChange}
                  />
                  <label>Available</label>
                </div>
              </div>

              <h3 className="font-semibold mt-2 mb-1">Specifications:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(addData.specs).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <label className="text-gray-300 text-sm mb-1 capitalize">
                      {k}
                    </label>
                    <input
                      type="text"
                      name={k}
                      value={v}
                      onChange={handleAddChange}
                      className="w-full p-2 rounded bg-gray-700 text-white text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 font-semibold flex-1"
                >
                  Add Bike
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddMode(false);
                    setAddError("");
                  }}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 font-semibold flex-1"
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

export default NzBikes;