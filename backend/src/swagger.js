const swaggerUi = require('swagger-ui-express');
const combine = require('../docs/index');

// Combine the definition and paths into a single OpenAPI spec
const swaggerSpec = Object.assign({}, combine.swaggerDefinition, {
  paths: combine.paths || {}
});

function setupSwagger(app) {
  // Serve swagger ui at /api/docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
