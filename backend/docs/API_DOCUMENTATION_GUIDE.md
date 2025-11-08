# ASIO CONSULT API Documentation Guide

## Overview
This document describes how the API documentation is organized and maintained using OpenAPI/Swagger specifications.

## Documentation Structure

```
backend/docs/
├── index.js                 # Main loader that combines paths and schemas
├── paths/                   # All endpoint path definitions
│   ├── health.js           # Health check endpoint
│   ├── products.js         # Products CRUD endpoints
│   ├── services.js         # Services CRUD endpoints
│   ├── contact.js          # Contact message endpoints
│   └── admin.js            # Admin authentication & management
└── schemas/                 # All data model definitions
    ├── product.js          # Product schema
    ├── service.js          # Service schema
    ├── contact.js          # Contact message schema
    └── admin.js            # Admin, Login, Dashboard schemas
```

## Documented Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Products
- **GET** `/api/products` - List all products (with filtering)
- **GET** `/api/products/category/{category}` - Get products by category
- **GET** `/api/products/{id}` - Get product details
- **POST** `/api/products` - Create product (Admin only)
- **PUT** `/api/products/{id}` - Update product (Admin only)
- **DELETE** `/api/products/{id}` - Delete product (Admin only)

### Services
- **GET** `/api/services` - List all services
- **GET** `/api/services/{id}` - Get service details
- **POST** `/api/services` - Create service (Admin only)
- **PUT** `/api/services/{id}` - Update service (Admin only)
- **DELETE** `/api/services/{id}` - Delete service (Admin only)

### Contact
- **POST** `/api/contact` - Submit contact message (Public)
- **GET** `/api/contact` - Get all messages (Admin only)
- **PATCH** `/api/contact/{id}/read` - Mark message as read (Admin only)
- **DELETE** `/api/contact/{id}` - Delete message (Admin only)

### Admin
- **POST** `/api/admin/login` - Login (Public)
- **GET** `/api/admin/dashboard` - Get dashboard stats (Admin only)
- **POST** `/api/admin/create` - Create new admin account (Admin only)

## Documentation URLs

After starting the server, access the documentation at:

### Swagger UI (Interactive API Explorer)
```
http://localhost:3001/api/docs
```
Features:
- Interactive request/response testing
- Try-it-out functionality
- Parameter validation
- Response examples

### ReDoc (Beautiful Documentation)
```
http://localhost:3001/api/redoc
```
Features:
- Clean, readable layout
- Search functionality
- Organized by tags
- Perfect for sharing with clients

### OpenAPI JSON Spec
```
http://localhost:3001/api/docs-json
```
Raw OpenAPI 3.0.1 specification in JSON format

## How to Add New Endpoints

### Step 1: Create a Schema (if needed)
Create a new file in `backend/docs/schemas/`:

```javascript
// backend/docs/schemas/mymodel.js
module.exports = {
  MyModel: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Unique identifier' },
      name: { type: 'string', description: 'Model name' },
      createdAt: { type: 'string', format: 'date-time' }
    },
    required: ['id', 'name']
  }
};
```

### Step 2: Create Path Documentation
Create a new file in `backend/docs/paths/`:

```javascript
// backend/docs/paths/myendpoint.js
module.exports = {
  '/myendpoint': {
    get: {
      tags: ['MyEndpoint'],
      summary: 'Get all items',
      description: 'Retrieve all items',
      responses: {
        '200': {
          description: 'List retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/MyModel' }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['MyEndpoint'],
      summary: 'Create item',
      description: 'Create a new item',
      security: [{ bearerAuth: [] }],  // Add this if endpoint requires auth
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' }
              },
              required: ['name']
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Item created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MyModel' }
            }
          }
        },
        '400': { description: 'Bad request' },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/myendpoint/{id}': {
    get: {
      tags: ['MyEndpoint'],
      summary: 'Get item by ID',
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
          description: 'Item found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MyModel' }
            }
          }
        },
        '404': { description: 'Not found' }
      }
    }
  }
};
```

### Step 3: Files are Auto-Loaded
The `docs/index.js` loader automatically discovers and loads:
- All `.js` files in `docs/paths/`
- All `.js` files in `docs/schemas/`

No configuration changes needed! Just create the files and restart the server.

## OpenAPI Schema Reference

### Common Properties

#### Operation Object
```javascript
{
  tags: ['TagName'],           // For grouping in UI
  summary: 'Short description', // Shown in endpoint list
  description: 'Full description', // Shown in details
  security: [{ bearerAuth: [] }], // For auth-required endpoints
  parameters: [...],           // Path, query, header params
  requestBody: {...},          // For POST/PUT/PATCH
  responses: {...}             // Response definitions
}
```

#### Parameter Object
```javascript
{
  name: 'paramName',
  in: 'path',        // or 'query', 'header', 'cookie'
  required: true,
  schema: { type: 'string' },
  description: 'Parameter description'
}
```

#### Response Object
```javascript
{
  '200': {
    description: 'Success message',
    content: {
      'application/json': {
        schema: { /* schema definition */ }
      }
    }
  },
  '404': { description: 'Not found' }
}
```

## Security (Bearer Token)

For endpoints requiring JWT authentication:

```javascript
security: [{ bearerAuth: [] }]
```

This automatically adds an "Authorize" button in Swagger UI where users can paste their JWT token.

The bearer token format is already defined in `docs/index.js`:
```javascript
bearerAuth: {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT'
}
```

## Schema References

Reference a schema definition using:
```javascript
{ $ref: '#/components/schemas/SchemaName' }
```

Example:
```javascript
{
  $ref: '#/components/schemas/Product'
}
```

## Tips for Good Documentation

1. **Be Descriptive**: Include `description` fields for parameters and properties
2. **Use Consistent Tags**: Group related endpoints with the same tag
3. **Document All Responses**: Include success (2xx) and error (4xx/5xx) responses
4. **Use Proper HTTP Status Codes**:
   - 200: OK (GET, PUT, PATCH)
   - 201: Created (POST)
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Server Error

5. **Include Examples**: In requestBody schema, use example property
6. **Format Emails/Dates**: Use `format: 'email'` or `format: 'date-time'`

## Current Documentation Status

### ✅ Fully Documented
- Health Check (1 endpoint)
- Products (6 endpoints: list, category filter, get by ID, create, update, delete)
- Services (5 endpoints: list, get by ID, create, update, delete)
- Contact Messages (4 endpoints: create, list, mark read, delete)
- Admin (3 endpoints: login, dashboard, create admin)

**Total: 19 endpoints documented**

## Server Setup

```bash
# Install dependencies
cd backend
npm install

# Start development server
npm run dev

# Access documentation
# Swagger UI: http://localhost:3001/api/docs
# ReDoc: http://localhost:3001/api/redoc
```

## Environment Configuration

The swagger spec uses `process.env.BASE_URL` if available:

```bash
# .env
BASE_URL=http://localhost:3001/api
```

If not set, defaults to `http://localhost:3001/api`

## Troubleshooting

### Documentation Not Appearing
1. Check files are in correct folders (docs/paths/ and docs/schemas/)
2. Ensure files export JavaScript objects
3. Restart the dev server

### Swagger UI Not Loading
1. Verify `swagger-ui-express` is installed: `npm list swagger-ui-express`
2. Check `/api/docs` URL
3. Check browser console for errors

### ReDoc Not Loading
1. Verify `redoc-express` is installed: `npm list redoc-express`
2. Check `/api/redoc` URL
3. Verify `/api/docs-json` endpoint is accessible

## Next Steps

- Test endpoints using Swagger UI at `/api/docs`
- Share ReDoc link at `/api/redoc` with frontend team
- Keep documentation updated as you add/modify endpoints
- Consider adding request/response examples to schemas
