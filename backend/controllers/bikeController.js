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


// POST /api/bikes
export const createBike = async (req, res) => {
  try {
    const { name, price, remaining, available, image, specs } = req.body;

    const bike = new Bike({
      name,
      price,
      remaining,
      available: available ?? true,
      image,                     // <-- plain string path, e.g. "/assets/..."
      specs: typeof specs === 'string' ? JSON.parse(specs) : specs,
    });

    await bike.save();
    res.status(201).json({ bike });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).json({ message: 'Name already exists' });
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bikes/:id
export const updateBike = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.specs && typeof updates.specs === 'string')
      updates.specs = JSON.parse(updates.specs);

    const bike = await Bike.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json({ bike });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bikes/:id
export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await Bike.findByIdAndDelete(id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};