const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');
const combine = require('../docs/index');

// Combine the definition and paths into a single OpenAPI spec
const swaggerSpec = Object.assign({}, combine.swaggerDefinition, {
  paths: combine.paths || {}
});

function setupSwagger(app) {
  // Serve swagger ui at /api/docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve ReDoc at /api/redoc
  app.use('/api/redoc', redoc({
    title: 'ASIO CONSULT API Documentation',
    specUrl: '/api/docs-json'
  }));

  // Serve OpenAPI spec as JSON for ReDoc
  app.get('/api/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = setupSwagger;
