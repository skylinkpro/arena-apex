const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

// Import routes
const gamingRoutes = require("./routes/gameplay.js");
const defiRoutes = require("./routes/defi.js");
const nftRoutes = require("./routes/nfts.js");
const launchpadRoutes = require("./routes/launch.js");
const governanceRoutes = require("./routes/marketplace.js");
const userRoutes = require("./routes/user.js");
const analyticsRoutes = require("./routes/ecosystem.js");

// Import WebSocket handlers
const { setupWebSocketHandlers } = require("./websocket/handlers.js");

const { initializeMockData } = require("./data/mockData.js");

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3001;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan("combined"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/gaming", gamingRoutes);
app.use("/api/defi", defiRoutes);
app.use("/api/nft", nftRoutes);
app.use("/api/launchpad", launchpadRoutes);
app.use("/api/governance", governanceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/analytics", analyticsRoutes);

// WebSocket connection handling
wss.on("connection", (ws, req) => {
  console.log("New WebSocket connection established");
  setupWebSocketHandlers(ws);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

initializeMockData();

// Start server
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = app;
