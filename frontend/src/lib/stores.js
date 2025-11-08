import { writable } from 'svelte/store';

// Cart store
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

// Auth store
function createAuthStore() {
  const { subscribe, set } = writable({
    isAuthenticated: false,
    admin: null,
    token: null
  });

  return {
    subscribe,
    login: (admin, token) => {
      localStorage.setItem('admin_token', token);
      set({
        isAuthenticated: true,
        admin,
        token
      });
    },
    logout: () => {
      localStorage.removeItem('admin_token');
      set({
        isAuthenticated: false,
        admin: null,
        token: null
      });
    },
    checkAuth: () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        set({
          isAuthenticated: true,
          admin: null, // Will be populated when needed
          token
        });
      }
    }
  };
}

// Loading store
export const loading = writable(false);

// Toast notifications store
function createToastStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: (message, type = 'info', duration = 3000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast = { id, message, type };
      
      update(toasts => [...toasts, toast]);
      
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== id));
      }, duration);
    },
    remove: (id) => {
      update(toasts => toasts.filter(t => t.id !== id));
    }
  };
}

export const cart = createCartStore();
export const auth = createAuthStore();
export const toast = createToastStore();