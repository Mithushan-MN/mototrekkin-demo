import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5000", // Proxy will route this to http://localhost:5000
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('axiosConfig: Checking token in localStorage', { token });
  if (token) {
    console.log('axiosConfig: Adding token to request', { url: config.url, token });
    config.headers.Authorization = `Bearer ${token}`;
    console.log('axiosConfig: Updated headers', config.headers);
  } else {
    console.log('axiosConfig: No token found for request', { url: config.url });
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log('axiosConfig: Response received', { url: response.config.url, status: response.status });
    return response;
  },
  (error) => {
    console.log('axiosConfig: Response error', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message,
    });
    if (error.response?.status === 401) {
      console.log('axiosConfig: 401 Unauthorized, clearing localStorage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/?openAuthModal=true';
    } else if (error.response?.status === 500) {
      console.log('axiosConfig: 500 Internal Server Error, not logging out');
      // Optionally alert the user
      alert('An error occurred. Please try again or contact support.');
    }
    return Promise.reject(error);
  }
);

export default instance; // Export the instance, not the global axios