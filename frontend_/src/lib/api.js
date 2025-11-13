import axios from 'axios';
import { browser } from '$app/environment';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    if (browser) {
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (browser) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== PRODUCTS ====================
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  getByBrand: (brand) => api.get(`/products/brand/${brand}`),
  getLowStock: (threshold) => api.get('/products/admin/low-stock', { params: { threshold } }),
  create: (data) => api.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateQuantity: (id, quantity) => api.patch(`/products/${id}/quantity`, { quantity }),
  delete: (id) => api.delete(`/products/${id}`)
};

// ==================== SERVICES ====================
export const serviceAPI = {
  getAll: (includeInactive = false) => api.get('/services', { 
    params: { includeInactive } 
  }),
  getById: (id) => api.get(`/services/${id}`),
  getByCategory: (category) => api.get(`/services/category/${category}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  activate: (id) => api.patch(`/services/${id}/activate`),
  deactivate: (id) => api.patch(`/services/${id}/deactivate`),
  delete: (id) => api.delete(`/services/${id}`)
};

// ==================== CONTACT MESSAGES ====================
export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  getUnreadCount: () => api.get('/contact/unread/count'),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  markAsUnread: (id) => api.patch(`/contact/${id}/unread`),
  markMultipleAsRead: (ids) => api.patch('/contact/read/bulk', { ids }),
  delete: (id) => api.delete(`/contact/${id}`),
  deleteMultiple: (ids) => api.delete('/contact/bulk/delete', { data: { ids } })
};

// ==================== ORDERS ====================
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: (params) => api.get('/orders', { params }),
  getUserOrders: () => {
    const userToken = browser ? localStorage.getItem('user_token') : null;
    if (userToken) {
      return api.get('/orders/user/orders', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
    }
    return Promise.reject('No user token');
  },
  getById: (id) => api.get(`/orders/${id}/admin`),
  getByNumber: (orderNumber) => api.get(`/orders/${orderNumber}`),
  updateStatus: (id, orderStatus) => api.patch(`/orders/${id}/status`, { orderStatus }),
  updatePaymentStatus: (id, paymentStatus) => api.patch(`/orders/${id}/payment-status`, { paymentStatus }),
  addTracking: (id, trackingData) => api.patch(`/orders/${id}/tracking`, trackingData),
  markAsDelivered: (id) => api.patch(`/orders/${id}/deliver`),
  updateAdminNotes: (id, notes) => api.patch(`/orders/${id}/notes`, { notes }),
  cancel: (id) => api.patch(`/orders/${id}/cancel`)
};

// ==================== ADMIN ====================
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  create: (data) => api.post('/admin/create', data),
  getDashboardStats: () => api.get('/admin/dashboard')
};

// ==================== USER AUTHENTICATION ====================
export const userAPI = {
  login: (data) => fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  register: (data) => fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  logout: () => {
    if (browser) {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_data');
    }
  },
  getProfile: () => {
    if (browser) {
      const token = localStorage.getItem('user_token');
      if (token) {
        return api.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }
    return Promise.reject('No auth token');
  },
  updateProfile: (data) => {
    if (browser) {
      const token = localStorage.getItem('user_token');
      if (token) {
        return api.put('/users/profile', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }
    return Promise.reject('No auth token');
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Handle API errors with consistent error messages
 */
export const handleAPIError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      errors: error.response.data?.errors || null
    };
  } else if (error.request) {
    return {
      status: null,
      message: 'No response from server. Please check your connection.',
      errors: null
    };
  } else {
    return {
      status: null,
      message: error.message || 'An unexpected error occurred',
      errors: null
    };
  }
};

/**
 * Get auth token from localStorage
 */
export const getAuthToken = () => {
  if (browser) {
    return localStorage.getItem('admin_token');
  }
  return null;
};

/**
 * Set auth token in localStorage
 */
export const setAuthToken = (token) => {
  if (browser) {
    localStorage.setItem('admin_token', token);
  }
};

/**
 * Clear auth token from localStorage
 */
export const clearAuthToken = () => {
  if (browser) {
    localStorage.removeItem('admin_token');
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  if (browser) {
    return !!localStorage.getItem('admin_token');
  }
  return false;
};

export default api;