module.exports = {
  '/contact': {
    post: {
      tags: ['Contact'],
      summary: 'Submit contact message',
      description: 'Submit a new contact message (Public)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Sender name' },
                email: { type: 'string', format: 'email', description: 'Sender email' },
                phone: { type: 'string', description: 'Sender phone (optional)' },
                subject: { type: 'string', description: 'Message subject' },
                message: { type: 'string', description: 'Message content' }
              },
              required: ['name', 'email', 'subject', 'message']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Message sent successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/ContactMessage' },
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
      tags: ['Contact'],
      summary: 'Get all contact messages',
      description: 'Retrieve all contact messages (Admin only)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Messages retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ContactMessage' }
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
  '/contact/{id}/read': {
    patch: {
      tags: ['Contact'],
      summary: 'Mark message as read',
      description: 'Mark a contact message as read (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Message ID'
        }
      ],
      responses: {
        '200': {
          description: 'Message marked as read',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { $ref: '#/components/schemas/ContactMessage' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        '401': { description: 'Unauthorized' },
        '404': { description: 'Message not found' }
      }
    }
  },
  '/contact/{id}': {
    delete: {
      tags: ['Contact'],
      summary: 'Delete contact message',
      description: 'Delete a contact message (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'Message ID'
        }
      ],
      responses: {
        '200': {
          description: 'Message deleted successfully',
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
        '404': { description: 'Message not found' }
      }
    }
  }
};
