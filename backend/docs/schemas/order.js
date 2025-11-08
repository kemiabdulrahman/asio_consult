module.exports = {
  Order: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique order identifier' },
      customerName: { type: 'string', description: 'Customer full name' },
      customerEmail: { type: 'string', format: 'email', description: 'Customer email address' },
      customerPhone: { type: 'string', description: 'Customer phone number' },
      items: {
        type: 'array',
        description: 'Array of ordered items with details',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'string' },
            productName: { type: 'string' },
            quantity: { type: 'integer' },
            price: { type: 'number' }
          }
        }
      },
      total: { type: 'number', description: 'Total order amount' },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending',
        description: 'Order status'
      },
      createdAt: { type: 'string', format: 'date-time', description: 'Order creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
    },
    required: ['id', 'customerName', 'customerEmail', 'customerPhone', 'items', 'total', 'status']
  }
};
