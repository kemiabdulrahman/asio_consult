module.exports = {
  Service: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique service identifier' },
      name: { type: 'string', description: 'Service name' },
      description: { type: 'string', description: 'Service description' },
      price: { type: 'number', description: 'Service price' },
      duration: { type: 'string', description: 'Service duration (e.g., 1 day, 2 weeks)' },
      createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
    },
    required: ['id', 'name']
  }
};
