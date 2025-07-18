import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const publicAPI = axios.create({
  baseURL: `${API_BASE_URL}/ecommerce`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authenticatedAPI = axios.create({
  baseURL: `${API_BASE_URL}/ecommerce`,
  headers: {
    'Content-Type': 'application/json',
  },
});

authenticatedAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authenticatedAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Optional centralized error handler
const handleError = (error) => {
  throw error.response?.data || error.message;
};

export const productAPI = {
  getProducts: async (params = {}) => {
    try {
      const response = await publicAPI.get('/products', { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getProduct: async (id) => {
    try {
      const response = await publicAPI.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await publicAPI.post('/login', credentials);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await publicAPI.post('/signup', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

// Export if needed for protected endpoints
export { publicAPI, authenticatedAPI };

export default publicAPI;
