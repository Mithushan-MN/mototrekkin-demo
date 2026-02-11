import RidgeRiderVIBike from '../models/RidgeRiderVIbike.js';  // ← updated import

export const getBikes = async (req, res) => {
  try {
    console.log('getBikes: Fetching all RidgeRider VI bikes');
    const bikes = await RidgeRiderVIBike.find().sort({ name: 1 });
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
    const bike = await RidgeRiderVIBike.findOne({ name: bikeName });
    if (!bike) {
      throw new Error(`Bike ${bikeName} not found`);
    }
    if (bike.remaining < decrement) {
      throw new Error(`Not enough ${bikeName} bikes remaining`);
    }
    bike.remaining -= decrement;
    bike.available = bike.remaining > 0;           // optional: keep in sync
    await bike.save();
    console.log('updateBikeRemaining: Updated', { bikeName, remaining: bike.remaining });
    return bike;
  } catch (error) {
    console.error('updateBikeRemaining: Error', error.message);
    throw error;
  }
};

// POST /api/bikes   (or /api/ridge-rider-vi-bikes — your choice)
export const createBike = async (req, res) => {
  try {
    const { name, price, remaining, available, image, specs } = req.body;

    const bike = new RidgeRiderVIBike({
      name,
      price,
      remaining: remaining ?? 0,
      available: available ?? false,          // model default is false
      image,                                  // string (path or URL)
      specs: typeof specs === 'string' ? JSON.parse(specs) : (specs || {}),
    });

    await bike.save();
    res.status(201).json({ bike });
  } catch (err) {
    console.error('createBike: Error', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Bike name already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bikes/:id
export const updateBike = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Handle specs if sent as string (common in form-data)
    if (updates.specs && typeof updates.specs === 'string') {
      updates.specs = JSON.parse(updates.specs);
    }

    const bike = await RidgeRiderVIBike.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    // Optional: sync available status
    if (bike.remaining !== undefined) {
      bike.available = bike.remaining > 0;
      await bike.save();
    }

    res.json({ bike });
  } catch (err) {
    console.error('updateBike: Error', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bikes/:id
export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await RidgeRiderVIBike.findByIdAndDelete(id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json({ message: 'Bike deleted successfully' });
  } catch (err) {
    console.error('deleteBike: Error', err);
    res.status(500).json({ message: err.message });
  }
};