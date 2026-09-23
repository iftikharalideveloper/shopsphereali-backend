// ============================================
// Imports
// ============================================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// ============================================
// Initialize Express
// ============================================
const app = express();

// ============================================
// Middlewares (Order Matters!)
// ============================================

// 1. Security Headers
app.use(helmet());

// 2. CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

// 4. Logging
app.use(morgan("dev"));

// 5. Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ============================================
// Health Check Route
// ============================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// ============================================
// Welcome Route
// ============================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ShopSphereAli API",
    version: process.env.API_VERSION || "v1",
    documentation: "/api/v1/docs",
  });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res, next) => {
  const error = new Error(`Route ${req.method} ${req.url} not found`);
  error.statusCode = 404;
  next(error);
});

// ============================================
// Global Error Handler
// ============================================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ Error:`, {
    message: err.message,
    url: req.url,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ============================================
// Export
// ============================================
export default app;
