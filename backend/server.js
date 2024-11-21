const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const cors = require("cors");
const path = require('path');
const { log } = require("console");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS configuration to allow the frontend to access the backend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://fiitness-freak.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Include credentials (e.g., cookies) if used
  })
);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);

// Serve static files from the 'uploads' folder (for image or file uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Check if environment variables are loaded properly
const PORT = process.env.PORT || 5000; // Default to 5000 if not defined

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown in production
process.on('SIGINT', () => {
  console.log("Shutting down server gracefully...");
  process.exit(0); // Optionally close DB connection here
});
