require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const dataRoutes = require("./routes/data");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/data", dataRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Nešto je pošlo po zlu!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server pokrenut na portu ${PORT}`);
  console.log(`📊 Data Analysis API spreman`);
});
