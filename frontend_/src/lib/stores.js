import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ==================== CART STORE ====================
function createCartStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addItem: (product) => update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
        return items;
      }
      return [...items, { ...product, quantity: 1 }];
    }),
    removeItem: (productId) => update(items => 
      items.filter(item => item.id !== productId)
    ),
    updateQuantity: (productId, quantity) => update(items => {
      if (quantity <= 0) {
        return items.filter(item => item.id !== productId);
      }
      return items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    }),
    clear: () => set([]),
    getTotal: (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
  };
}

// ==================== AUTH STORE ====================
function createAuthStore() {
  const initialState = {
    isAuthenticated: false,
    admin: null,
    token: null
  };

  const { subscribe, set } = writable(initialState);

  // Check for existing token on init
  if (browser) {
    const token = localStorage.getItem('admin_token');
    if (token) {
      set({
        isAuthenticated: true,
        admin: null,
        token
      });
    }
  }

  return {
    subscribe,
    login: (admin, token) => {
      if (browser) {
        localStorage.setItem('admin_token', token);
      }
      set({
        isAuthenticated: true,
        admin,
        token
      });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('admin_token');
      }
      set(initialState);
    },
    checkAuth: () => {
      if (browser) {
        const token = localStorage.getItem('admin_token');
        if (token) {
          set({
            isAuthenticated: true,
            admin: null,
            token
          });
          return true;
        }
      }
      return false;
    },
    updateAdmin: (admin) => {
      set(state => ({
        ...state,
        admin
      }));
    }
  };
}

// ==================== LOADING STORE ====================
export const loading = writable(false);

// ==================== TOAST NOTIFICATIONS STORE ====================
function createToastStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: (message, type = 'info', duration = 3000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast = { id, message, type };
      
      update(toasts => [...toasts, toast]);
      
      if (duration > 0) {
        setTimeout(() => {
          update(toasts => toasts.filter(t => t.id !== id));
        }, duration);
      }
      
      return id;
    },
    remove: (id) => {
      update(toasts => toasts.filter(t => t.id !== id));
    },
    clear: () => {
      update(() => []);
    }
  };
}

// ==================== DASHBOARD DATA STORE ====================
function createDashboardStore() {
  const initialState = {
    stats: null,
    products: [],
    services: [],
    messages: [],
    orders: []
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    setStats: (stats) => update(state => ({ ...state, stats })),
    setProducts: (products) => update(state => ({ ...state, products })),
    setServices: (services) => update(state => ({ ...state, services })),
    setMessages: (messages) => update(state => ({ ...state, messages })),
    setOrders: (orders) => update(state => ({ ...state, orders })),
    setAll: (data) => set(data),
    reset: () => set(initialState)
  };
}

// ==================== EXPORT STORES ====================
export const cart = createCartStore();
export const auth = createAuthStore();
export const toast = createToastStore();
export const dashboard = createDashboardStore();