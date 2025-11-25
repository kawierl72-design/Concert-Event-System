const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// LOGIN + auto-create admin if not existing
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    let user = await User.findOne({ username });

    // AUTO-CREATE ADMIN IF NOT EXISTING
    if (!user) {
      const defaultUser = process.env.ADMIN_USERNAME || "admin";
      const defaultPass = process.env.ADMIN_PASSWORD || "123456";

      // Only create if user typed the default admin creds
      if (username === defaultUser && password === defaultPass) {
        user = new User({
          username: defaultUser,
          password: defaultPass,
          role: "admin",
        });
        await user.save();
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // Ensure matchPassword exists
    if (!user.matchPassword) {
      console.error("ERROR: matchPassword is missing on User model");
      return res.status(500).json({ message: "Server password method error" });
    }

    // Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "12h" }
    );

    return res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
