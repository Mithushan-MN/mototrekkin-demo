import MDPPhase2Bike from '../models/MDPPhase2Bike.js';

// GET: Fetch available bikes
export const getBikes = async (req, res) => {
  try {
    const bikes = await MDPPhase2Bike.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, bikes });
  } catch (error) {
    console.error('Error fetching MDP Phase 2 bikes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bikes' });
  }
};

// POST: Create new bike
export const createBike = async (req, res) => {
  try {
    const { name, dailyRate, remaining, isActive, description } = req.body;

    const bike = new MDPPhase2Bike({
      name,
      dailyRate,
      remaining: remaining ?? 1,
      isActive: isActive ?? true,
      description,
    });

    await bike.save();
    res.status(201).json({ success: true, bike });
  } catch (error) {
    console.error('Error creating bike:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Bike name must be unique' });
    }
    res.status(500).json({ success: false, message: 'Failed to create bike' });
  }
};

// PUT: Update bike
export const updateBike = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const bike = await MDPPhase2Bike.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!bike) {
      return res.status(404).json({ success: false, message: 'Bike not found' });
    }

    res.json({ success: true, bike });
  } catch (error) {
    console.error('Error updating bike:', error);
    res.status(500).json({ success: false, message: 'Failed to update bike' });
  }
};

// DELETE: Soft-delete (set isActive = false)
export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await MDPPhase2Bike.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!bike) {
      return res.status(404).json({ success: false, message: 'Bike not found' });
    }

    res.json({ success: true, message: 'Bike deactivated' });
  } catch (error) {
    console.error('Error deleting bike:', error);
    res.status(500).json({ success: false, message: 'Failed to delete bike' });
  }
};