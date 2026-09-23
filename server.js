// ============================================
// Load Environment Variables (FIRST!)
// ============================================
import dotenv from 'dotenv';
dotenv.config();

// ============================================
// Imports
// ============================================
import app from './src/app.js';

// ============================================
// Configuration
// ============================================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// Start Server
// ============================================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/${process.env.API_VERSION}`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
});

// ============================================
// Graceful Shutdown
// ============================================
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (error) => {
  console.error('🔥 Unhandled Promise Rejection:', error);
  process.exit(1);
});