import { useState } from "react";

const bikes = [
  {
    id: 1,
    name: "Honda CB500X",
    price: 230,
    image: "/images/cb500x.png",
    specs: {
      displacement: "471 cc",
      fuel: "17.7 L",
      cooling: "Liquid Cooled",
      power: "46.9 hp @ 8500 rpm",
      torque: "43.2 Nm @ 7000 rpm",
    },
    soldOut: false,
  },
  {
    id: 2,
    name: "Yamaha Tenere 700",
    price: 250,
    image: "/images/tenere700.png",
    specs: { displacement: "689 cc", fuel: "16 L" },
    soldOut: true,
  },
];

const gearOptions = [
  { label: "Bike hire only", value: "bike" },
  { label: "Bike hire + gear", value: "bike-gear" },
  { label: "Package Option - $100/day", value: "package" },
];

const individualGear = [
  { label: "Helmet - $45/day", value: "helmet", price: 45 },
  { label: "Jacket - $65/day", value: "jacket", price: 65 },
  { label: "Gloves - $25/day", value: "gloves", price: 25 },
];

const addons = [
  { label: "Excess Reduction - $32/day", value: "excess", price: 32 },
  { label: "Tyre Protection - $23/day", value: "tyre", price: 23 },
  { label: "Touring Windscreen (Tall) - $10/day", value: "windscreen", price: 10 },
];

const Step2BikeGear = ({ formData, setFormData,nextStep, prevStep }) => {
  const [selectedBike, setSelectedBike] = useState(formData.bike || null);

  const handleBikeSelect = (bike) => {
    if (bike.soldOut) return;
    setSelectedBike(bike);
    setFormData({ ...formData, bike });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bikes */}
      <div>
        <h2 className="text-xl font-bold mb-4">Choose Your Bike</h2>
        {bikes.map((bike) => (
          <div
            key={bike.id}
            onClick={() => handleBikeSelect(bike)}
            className={`p-4 border rounded-lg cursor-pointer mb-4 ${
              bike.soldOut ? "opacity-50 cursor-not-allowed" : ""
            } ${selectedBike?.id === bike.id ? "border-blue-500" : ""}`}
          >
            <img src={bike.image} alt={bike.name} className="h-40 object-cover mb-2" />
            <h3 className="font-semibold">{bike.name}</h3>
            <p>${bike.price}/day</p>
            {selectedBike?.id === bike.id && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Displacement: {bike.specs.displacement}</p>
                <p>Fuel: {bike.specs.fuel}</p>
                <p>Cooling: {bike.specs.cooling}</p>
                <p>Power: {bike.specs.power}</p>
                <p>Torque: {bike.specs.torque}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gear + Addons */}
      <div>
        <h2 className="text-xl font-bold mb-4">Gear Options</h2>
        {gearOptions.map((opt) => (
          <label key={opt.value} className="block">
            <input
              type="radio"
              name="gearOption"
              value={opt.value}
              checked={formData.gearOption === opt.value}
              onChange={(e) => setFormData({ ...formData, gearOption: e.target.value })}
            />
            {opt.label}
          </label>
        ))}

        {/* Show Individual Gear if chosen */}
        {formData.gearOption === "bike-gear" || formData.gearOption === "package" ? (
          <div className="mt-4">
            <h3 className="font-semibold">Individually</h3>
            {individualGear.map((g) => (
              <label key={g.value} className="block">
                <input
                  type="checkbox"
                  checked={formData.individualGear?.includes(g.value)}
                  onChange={(e) => {
                    let updated = [...(formData.individualGear || [])];
                    if (e.target.checked) {
                      updated.push(g.value);
                    } else {
                      updated = updated.filter((val) => val !== g.value);
                    }
                    setFormData({ ...formData, individualGear: updated });
                  }}
                />
                {g.label}
              </label>
            ))}
          </div>
        ) : null}

        {/* Addons */}
        <div className="mt-4">
          <h3 className="font-semibold">Add-ons</h3>
          {addons.map((a) => (
            <label key={a.value} className="block">
              <input
                type="checkbox"
                checked={formData.addons?.includes(a.value)}
                onChange={(e) => {
                  let updated = [...(formData.addons || [])];
                  if (e.target.checked) {
                    updated.push(a.value);
                  } else {
                    updated = updated.filter((val) => val !== a.value);
                  }
                  setFormData({ ...formData, addons: updated });
                }}
              />
              {a.label}
            </label>
          ))}
        </div>
        
      </div>

      <div className="flex justify-between mt-4">
  <button
    onClick={prevStep}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  >
    Previous
  </button>
  <button
    onClick={nextStep}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Next
  </button>
</div>

      
    </div>
  );
};

export default Step2BikeGear;
