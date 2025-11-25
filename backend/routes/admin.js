const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// ----------------------------------------
// POST /api/admin/login
// ----------------------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  try {
    const defaultUser = process.env.ADMIN_USERNAME || "admin";
    const defaultPass = process.env.ADMIN_PASSWORD || "123456";

    // ----------------------------------------
    // 1. Auto-create admin if no user exists at all
    // ----------------------------------------
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const newAdmin = new User({
        username: defaultUser,
        password: defaultPass,
        role: "admin",
      });

      await newAdmin.save();
      console.log("🛠 Default admin created:", defaultUser);
    }

    // ----------------------------------------
    // 2. Find user by username
    // ----------------------------------------
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    // Ensure model has matchPassword()
    if (typeof user.matchPassword !== "function") {
      console.error("❌ ERROR: matchPassword function missing in User model");
      return res.status(500).json({ success: false, message: "Server password method error" });
    }

    // ----------------------------------------
    // 3. Validate password
    // ----------------------------------------
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    // ----------------------------------------
    // 4. Generate JWT token
    // ----------------------------------------
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "12h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
