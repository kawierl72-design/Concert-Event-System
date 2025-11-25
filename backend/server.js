require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");




const registrationRoutes = require("./routes/registrations");
const adminRoutes = require("./routes/admin");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",   // ✅ Allow frontend
  credentials: true
}));

app.use(morgan("dev"));
app.use(express.json()); // ✅ Parse JSON body

// Public uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);  // ✅ Admin login route

// Test route
app.get("/", (req, res) => {
  res.send({ message: "API running on port 5000" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
  

