const swaggerUi = require('swagger-ui-express');
const combine = require('../docs/index');

// Combine the definition and paths into a single OpenAPI spec
const swaggerSpec = Object.assign({}, combine.swaggerDefinition, {
  paths: combine.paths || {}
});

function setupSwagger(app) {
  // Serve swagger ui at /api/docs
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve OpenAPI spec as JSON
  app.get('/api/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Serve ReDoc at /api/redoc using HTML
  app.get('/api/redoc', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ReDoc - ASIO CONSULT API Documentation</title>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <redoc spec-url='/api/docs-json'></redoc>
          <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
        </body>
      </html>
    `);
  });
}

module.exports = setupSwagger;
