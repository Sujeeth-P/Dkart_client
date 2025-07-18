import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
adminAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Admin Authentication API
export const adminAuth = {
  login: async (credentials) => {
    const response = await adminAPI.post('/login', credentials);
    return response.data;
  },
  
  verifyToken: async () => {
    const response = await adminAPI.get('/verify-token');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await adminAPI.get('/profile');
    return response.data;
  }
};

// Product Management API
export const productAPI = {
  getProducts: async (params = {}) => {
    const response = await adminAPI.get('/products', { params });
    return response.data;
  },
  
  getProduct: async (id) => {
    const response = await adminAPI.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await adminAPI.post('/products', productData);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await adminAPI.put(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await adminAPI.delete(`/products/${id}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await adminAPI.get('/products/stats');
    return response.data;
  }
};

export default adminAPI;
