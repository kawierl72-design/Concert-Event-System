const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Registration = require("../models/Registration");
const dotenv = require("dotenv");

dotenv.config();

// -----------------------------
// Ensure uploads/ folder exists
// -----------------------------
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Created uploads/ folder");
}

// -----------------------------
// Multer Storage Config
// -----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

// Only accept image files
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

// -----------------------------
// POST /api/registrations
// Save Registration
// -----------------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed. Please attach a JPG/PNG file.",
      });
    }

    const reg = new Registration({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      ticketType: req.body.ticketType,
      age: req.body.age,
      gender: req.body.gender,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact,
      notes: req.body.notes,
      paymentImage: req.file.filename,
      status: "pending"
    });

    await reg.save();

    res.status(201).json({
      success: true,
      message: "Registration saved successfully!",
      registration: reg,
    });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error occurred.",
      error: err.message,
    });
  }
});

// -----------------------------
// GET /api/registrations/all
// Admin: Fetch ALL registrations
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    const result = registrations.map((r) => ({
      ...r.toObject(),
      paymentImageURL: `${req.protocol}://${req.get("host")}/uploads/${r.paymentImage}`,
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: "Failed to load registrations" });
  }
});

// -----------------------------
// PUT /api/registrations/confirm/:id
// CONFIRM REGISTRATION
// -----------------------------
router.put("/confirm/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, { status: "confirmed" });
    res.json({ success: true, message: "Registration confirmed" });
  } catch (err) {
    console.error("❌ Confirm Error:", err);
    res.status(500).json({ message: "Confirm failed" });
  }
});

// -----------------------------
// PUT /api/registrations/reject/:id
// REJECT REGISTRATION
// -----------------------------
router.put("/reject/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, { status: "rejected" });
    res.json({ success: true, message: "Registration rejected" });
  } catch (err) {
    console.error("❌ Reject Error:", err);
    res.status(500).json({ message: "Reject failed" });
  }
});

// -----------------------------
// DELETE /api/registrations/:id
// Admin: Delete Registration + Image
// -----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Delete image file
    if (reg.paymentImage) {
      const imgPath = path.join(__dirname, "..", "uploads", reg.paymentImage);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await reg.deleteOne();

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
});

// -----------------------------
// GET /api/registrations/export/csv
// Admin: Export All Records to CSV
// -----------------------------
router.get("/export/csv", async (req, res) => {
  try {
    const regs = await Registration.find();

    let csv =
      "Full Name,Email,Phone,Ticket Type,Gender,Age,Address,Emergency Contact,Notes,Status\n";

    regs.forEach((r) => {
      csv += `"${r.fullName}","${r.email}","${r.phone}","${r.ticketType}","${r.gender}","${r.age}","${r.address}","${r.emergencyContact}","${r.notes}","${r.status}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=registrations.csv");
    res.send(csv);
  } catch (err) {
    console.error("❌ CSV export error:", err);
    res.status(500).json({ message: "CSV export failed" });
  }
});

module.exports = router;
