

import axios from '../../../axiosConfig';

// Function to fetch motorcycles from the backend API
export const fetchMotorcycles = async () => {
  try {
    console.log('fetchMotorcycles: Fetching bikes from API');
    const response = await axios.get('/RidgeRiderVIRegistrations/bikes');
    const bikes = response.data.map(bike => ({
      ...bike,
      image: bike.image ? `${bike.image}` : null,
    }));
    console.log('fetchMotorcycles: Fetched', bikes.length, 'bikes');
    return bikes.filter(bike => bike.available && bike.remaining > 0);
  } catch (error) {
    console.error('fetchMotorcycles: Error fetching bikes', error.response?.data || error.message);
    throw new Error('Failed to fetch motorcycles');
  }
};