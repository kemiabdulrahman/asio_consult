const fs = require('fs');
const path = require('path');

function loadFolder(folderName) {
  const dir = path.join(__dirname, folderName);
  if (!fs.existsSync(dir)) return {};
  const files = fs.readdirSync(dir).filter(f => /\.(js|json|yaml|yml)$/.test(f));
  return files.reduce((acc, file) => {
    const full = path.join(dir, file);
    // require so users can export either an object or a function returning an object
    const mod = require(full);
    if (typeof mod === 'function') {
      Object.assign(acc, mod());
    } else {
      Object.assign(acc, mod);
    }
    return acc;
  }, {});
}

const paths = loadFolder('paths');
const schemas = loadFolder('schemas');

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'ASIO CONSULT API',
    version: '1.0.0',
    description: 'API documentation for ASIO CONSULT'
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:3001/api'
    }
  ],
  components: {
    schemas: schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

module.exports = {
  swaggerDefinition,
  paths
};
