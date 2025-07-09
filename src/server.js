const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Express server!",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required",
    });
  }

  // Simulate user creation
  const user = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(user);
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  // Simulate user retrieval
  const user = {
    id: parseInt(id),
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
  };

  res.json(user);
});

// Calculator endpoints for testing
app.get("/api/calculator/add", (req, res) => {
  const { a, b } = req.query;

  if (!a || !b) {
    return res.status(400).json({
      error: "Both a and b parameters are required",
    });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({
      error: "Both a and b must be valid numbers",
    });
  }

  const result = numA + numB;

  res.json({
    operation: "addition",
    a: numA,
    b: numB,
    result,
  });
});

app.get("/api/calculator/multiply", (req, res) => {
  const { a, b } = req.query;

  if (!a || !b) {
    return res.status(400).json({
      error: "Both a and b parameters are required",
    });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({
      error: "Both a and b must be valid numbers",
    });
  }

  const result = numA * numB;

  res.json({
    operation: "multiplication",
    a: numA,
    b: numB,
    result,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
