// components/NzBikes.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

const NzBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ specs: {} });
  const [editError, setEditError] = useState("");

  // ---------- Add-modal ----------
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

  const navigate = useNavigate();

  /* ------------------------------------------------------------------ */
  /* 1. FETCH ALL BIKES (no .filter – show everything, then UI can hide) */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axios.get("/api/nz-bikes");
      console.log("API raw response:", res); // <-- keep for a moment, then delete

      // Safety – always work with an array
      const list = Array.isArray(res.data) ? res.data : [];
      setBikes(list);
    } catch (err) {
      console.error("Fetch error:", err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 2. DELETE */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    try {
      await axios.delete(`/api/nz-bikes/${id}`);
      setBikes((prev) => prev.filter((b) => b._id !== id));
      setSelectedBike(null);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ------------------------------------------------------------------ */
  /* 3. EDIT – open modal */
  /* ------------------------------------------------------------------ */
  const handleEditClick = () => {
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
      setEditData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [name]: value },
      }));
    } else if (type === "checkbox") {
      setEditData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
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
      const res = await axios.put(`/api/nz-bikes/${selectedBike._id}`, payload);
      setBikes((prev) =>
        prev.map((b) => (b._id === selectedBike._id ? res.data.bike : b))
      );
      setSelectedBike(res.data.bike);
      setEditMode(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed");
    }
  };

  /* ------------------------------------------------------------------ */
  /* 4. ADD – change handler */
  /* ------------------------------------------------------------------ */
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in addData.specs) {
      setAddData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [name]: value },
      }));
    } else if (type === "checkbox") {
      setAddData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setAddData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ------------------------------------------------------------------ */
  /* 5. ADD – submit */
  /* ------------------------------------------------------------------ */
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
      const res = await axios.post("/api/nz-bikes", payload);
      setBikes((prev) => [...prev, res.data.bike]);
      setAddMode(false);
      // reset form
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

  /* ------------------------------------------------------------------ */
  /* 6. IMAGE URL (static assets) */
  /* ------------------------------------------------------------------ */
  const getImageUrl = (image) => (image ? image : null);

  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */
  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400">Loading bikes...</p>
    );

  return (
    <div className="bg-gray-900 p-6 sm:p-8 font-sans min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl text-white font-bold mb-4 sm:mb-0">
          All Bikes
        </h2>
        <button
          onClick={() => {
            setAddMode(true);
            setAddError("");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
        >
          + Add New Bike
        </button>
      </div>

      {/* No bikes message */}
      {bikes.length === 0 && (
        <p className="text-center mt-10 text-yellow-500">
          No bikes found. Click “+ Add New Bike” to start.
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {bikes.map((bike) => (
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
            <h3 className="text-white font-semibold text-center">
              {bike.name}
            </h3>
            <p className="text-yellow-400 text-center">{bike.price} $/Day</p>
            <p className="text-green-400 text-center">
              Remaining: {bike.remaining}
            </p>
          </div>
        ))}
      </div>

      {/* ------------------- DETAIL / EDIT / DELETE MODAL ------------------- */}
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
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
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

                <h3 className="text-white font-semibold mt-3 mb-1">
                  Specifications:
                </h3>
                <ul className="text-gray-300 text-sm space-y-1 mb-4">
                  {Object.entries(selectedBike.specs || {}).map(
                    ([key, value]) => (
                      <li key={key}>
                        <b className="capitalize">{key}:</b> {value}
                      </li>
                    )
                  )}
                </ul>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-white font-semibold flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedBike._id)}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedBike(null)}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              /* ------------------- EDIT FORM ------------------- */
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
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
                    placeholder="Image path (e.g. /assets/...)"
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

                <h3 className="text-white font-semibold mt-2 mb-1">
                  Specifications:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(editData.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-gray-300 text-sm mb-1 capitalize">
                        {key}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleEditChange}
                        className="w-full p-2 rounded bg-gray-700 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white font-semibold flex-1"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEditError("");
                    }}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ------------------- ADD MODAL ------------------- */}
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
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
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
                  placeholder="Image path (e.g. /assets/...)"
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

              <h3 className="text-white font-semibold mt-2 mb-1">
                Specifications:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(addData.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-gray-300 text-sm mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleAddChange}
                      className="w-full p-2 rounded bg-gray-700 text-white text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-400 text-white font-semibold flex-1"
                >
                  Add Bike
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddMode(false);
                    setAddError("");
                  }}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold flex-1"
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