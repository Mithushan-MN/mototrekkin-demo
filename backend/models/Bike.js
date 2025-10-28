import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true, default: false },
  remaining: { type: Number, required: true, default: 0 },
  image: { type: String, required: false }, // Store image path or URL
  specs: {
    mileage: { type: String, default: 'Not Available' },
    displacement: { type: String, default: 'Not Available' },
    engineType: { type: String, default: 'Not Available' },
    cylinders: { type: String, default: 'Not Available' },
    maxPower: { type: String, default: 'Not Available' },
    maxTorque: { type: String, default: 'Not Available' },
    frontBrake: { type: String, default: 'Not Available' },
    rearBrake: { type: String, default: 'Not Available' },
    fuelCapacity: { type: String, default: 'Not Available' },
    bodyType: { type: String, default: 'Not Available' },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Bike', bikeSchema);