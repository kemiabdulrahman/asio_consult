module.exports = {
  '/orders': {
    post: {
      tags: ['Orders'],
      summary: 'Create a new order',
      description: 'Submit a new order (Public)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                customerName: { type: 'string', description: 'Customer full name' },
                customerEmail: { type: 'string', format: 'email', description: 'Customer email' },
                customerPhone: { type: 'string', description: 'Customer phone number' },
                items: {
                  type: 'array',
                  description: 'Array of ordered items with quantities and prices',
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
                total: { type: 'number', description: 'Order total amount' }
              },
              required: ['customerName', 'customerEmail', 'customerPhone', 'items', 'total']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Order created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Order' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '400': { description: 'Bad request - missing required fields' }
      }
    },
    get: {
      tags: ['Orders'],
      summary: 'Get all orders',
      description: 'Retrieve all orders (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'status',
          in: 'query',
          required: false,
          schema: { type: 'string', enum: ['pending', 'confirmed', 'delivered', 'cancelled'] },
          description: 'Filter by order status'
        }
      ],
      responses: {
        '200': {
          description: 'Orders retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Order' }
                  },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/orders/{id}': {
    get: {
      tags: ['Orders'],
      summary: 'Get order by ID',
      description: 'Retrieve details of a specific order (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Order ID'
        }
      ],
      responses: {
        '200': {
          description: 'Order retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Order' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Order not found' }
      }
    }
  },
  '/orders/{id}/status': {
    patch: {
      tags: ['Orders'],
      summary: 'Update order status',
      description: 'Update the status of an order (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Order ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
                  description: 'New order status'
                }
              },
              required: ['status']
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Order status updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Order' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '400': { description: 'Bad request - invalid status' },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Order not found' }
      }
    }
  }
};
