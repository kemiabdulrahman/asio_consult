module.exports = {
  '/products': {
    get: {
      tags: ['Products'],
      summary: 'List products',
      responses: {
        '200': {
          description: 'A list of products',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          }
        }
      }
    }
  },
  '/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Get product by id',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        '200': {
          description: 'Product object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        '404': { description: 'Not found' }
      }
    }
  }
};
