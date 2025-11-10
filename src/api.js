// api.js
// This is where we should make our API requests to the backend
// We will create a single Axios instance and reuse it across the application
import axios from 'axios' // Import Axios for making HTTP requests to the backend

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Get the API URL from the environment variable if it exists or use the default URL 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adding an interceptor to the Axios instance to add the token to the request headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }
    return config;
});

export default api; // Export the Axios instance

// End of api.js
