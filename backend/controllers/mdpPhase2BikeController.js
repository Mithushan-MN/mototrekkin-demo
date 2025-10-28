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