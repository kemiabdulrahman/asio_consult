module.exports = {
  '/admin/login': {
    post: {
      tags: ['Admin'],
      summary: 'Admin login',
      description: 'Authenticate admin and receive JWT token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginRequest' }
          }
        }
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/LoginResponse' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '400': { description: 'Bad request - missing email or password' },
        '401': { description: 'Invalid credentials' }
      }
    }
  },
  '/admin/dashboard': {
    get: {
      tags: ['Admin'],
      summary: 'Get dashboard statistics',
      description: 'Retrieve dashboard statistics (Admin only)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Dashboard stats retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/DashboardStats' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized - no token or invalid token' }
      }
    }
  },
  '/admin/create': {
    post: {
      tags: ['Admin'],
      summary: 'Create new admin',
      description: 'Create a new admin account (Admin only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Admin name' },
                email: { type: 'string', format: 'email', description: 'Admin email' },
                password: { type: 'string', format: 'password', description: 'Admin password' }
              },
              required: ['name', 'email', 'password']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Admin created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/Admin' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '400': { description: 'Bad request - missing required fields' },
        '401': { description: 'Unauthorized' }
      }
    }
  }
};
