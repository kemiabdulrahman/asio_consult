module.exports = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      description: 'Check if the API is running and accessible',
      responses: {
        '200': {
          description: 'API is running',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  timestamp: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        }
      }
    }
  }
};
