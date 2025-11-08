module.exports = {
  Product: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' }
    },
    required: ['id', 'name']
  }
};
