module.exports = {
  '/services': {
    get: {
      tags: ['Services'],
      summary: 'Get all services',
      description: 'Retrieve a list of all available services',
      responses: {
        '200': {
          description: 'List of services retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Service' }
                  },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '500': { description: 'Server error' }
      }
    },
    post: {
      tags: ['Services'],
      summary: 'Create a new service',
      description: 'Create a new service (Admin only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                duration: { type: 'string' }
              },
              required: ['name', 'price']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Service created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Service' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' },
        '400': { description: 'Bad request' }
      }
    }
  },
  '/services/{id}': {
    get: {
      tags: ['Services'],
      summary: 'Get service by ID',
      description: 'Retrieve details of a specific service',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Service ID'
        }
      ],
      responses: {
        '200': {
          description: 'Service retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Service' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '404': { description: 'Service not found' }
      }
    },
    put: {
      tags: ['Services'],
      summary: 'Update service',
      description: 'Update an existing service (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Service ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                duration: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Service updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Service' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Service not found' }
      }
    },
    delete: {
      tags: ['Services'],
      summary: 'Delete service',
      description: 'Delete a service (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Service ID'
        }
      ],
      responses: {
        '200': {
          description: 'Service deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Service not found' }
      }
    }
  }
};
