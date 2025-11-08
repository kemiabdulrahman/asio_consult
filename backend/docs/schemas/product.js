module.exports = {
  Product: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique product identifier' },
      name: { type: 'string', description: 'Product name' },
      description: { type: 'string', description: 'Product description' },
      price: { type: 'number', description: 'Product price' },
      category: { type: 'string', description: 'Product category' },
      inStock: { type: 'boolean', description: 'Whether product is in stock' },
      quantity: { type: 'integer', description: 'Available quantity' },
      image: { type: 'string', description: 'Product image URL' },
      createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
    },
    required: ['id', 'name']
  }
};
