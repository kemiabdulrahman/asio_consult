const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const setupSwagger = require('./swagger');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
// Mount API routes
app.use('/api', routes);

// Swagger documentation (served at /api/docs)
setupSwagger(app);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ASIO CONSULT API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      services: '/api/services',
      contact: '/api/contact',
      admin: '/api/admin'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;