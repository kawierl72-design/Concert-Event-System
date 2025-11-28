require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrations");
const adminRoutes = require("./routes/admin");

const app = express();

/* =============================
   ✅ CONNECT DATABASE
============================= */
connectDB();

/* =============================
   ✅ CORS (RENDER + LOCAL)
============================= */
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,      // ✅ Production frontend (Vercel)
      "http://localhost:3000"        // ✅ Local development
    ],
    credentials: true,
  })
);

/* =============================
   ✅ MIDDLEWARE
============================= */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =============================
   ✅ STATIC UPLOADS (REQUIRED)
============================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =============================
   ✅ API ROUTES
============================= */
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);

/* =============================
   ✅ ROOT TEST (RENDER HEALTH)
============================= */
app.get("/", (req, res) => {
  res.send("✅ Concert Event API running on Render");
});

/* =============================
   ✅ START SERVER
============================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
