const app = require('./app');
const config = require('./config/env');
const prisma = require('./config/db');

const PORT = config.PORT || 3001;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`
🚀 ASIO CONSULT Backend Server Running!
📍 URL: http://localhost:${PORT}
🌍 Environment: ${config.NODE_ENV}
📊 API Documentation: http://localhost:${PORT}/api
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();