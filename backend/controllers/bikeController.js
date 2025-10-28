import Bike from '../models/Bike.js';

export const getBikes = async (req, res) => {
  try {
    console.log('getBikes: Fetching all bikes');
    const bikes = await Bike.find().sort({ name: 1 });
    console.log('getBikes: Found', bikes.length, 'bikes');
    res.status(200).json(bikes);
  } catch (error) {
    console.error('getBikes: Error', error.message);
    res.status(500).json({ message: 'Failed to fetch bikes', error: error.message });
  }
};

export const updateBikeRemaining = async (bikeName, decrement = 1) => {
  try {
    console.log('updateBikeRemaining: Updating bike', { bikeName, decrement });
    const bike = await Bike.findOne({ name: bikeName });
    if (!bike) {
      throw new Error(`Bike ${bikeName} not found`);
    }
    if (bike.remaining < decrement) {
      throw new Error(`Not enough ${bikeName} bikes remaining`);
    }
    bike.remaining -= decrement;
    await bike.save();
    console.log('updateBikeRemaining: Updated', { bikeName, remaining: bike.remaining });
    return bike;
  } catch (error) {
    console.error('updateBikeRemaining: Error', error.message);
    throw error;
  }
};