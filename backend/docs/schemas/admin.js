module.exports = {
  Admin: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique admin identifier' },
      name: { type: 'string', description: 'Admin name' },
      email: { type: 'string', format: 'email', description: 'Admin email' },
      createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' }
    },
    required: ['id', 'name', 'email']
  },
  LoginRequest: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email', description: 'Admin email' },
      password: { type: 'string', format: 'password', description: 'Admin password' }
    },
    required: ['email', 'password']
  },
  LoginResponse: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      token: { type: 'string', description: 'JWT authentication token' }
    }
  },
  DashboardStats: {
    type: 'object',
    properties: {
      totalProducts: { type: 'integer', description: 'Total number of products' },
      totalServices: { type: 'integer', description: 'Total number of services' },
      totalMessages: { type: 'integer', description: 'Total contact messages' },
      unreadMessages: { type: 'integer', description: 'Unread contact messages' }
    }
  }
};
