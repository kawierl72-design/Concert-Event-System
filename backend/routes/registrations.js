const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Registration = require("../models/Registration");
require("dotenv").config();

// -----------------------------
// Ensure uploads/ folder exists
// -----------------------------
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Created uploads/ folder");
}

// -----------------------------
// Multer Storage Config
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, unique + ext);
  },
});

// -----------------------------
// Multer Upload Config
// ✅ LIMIT SIZE
// ✅ IMAGE ONLY
// -----------------------------
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// -----------------------------
// POST /api/registrations
// -----------------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // ✅ DEBUG (keep while testing)
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed. Please attach a JPG/PNG image.",
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
      paymentImage: req.file.filename, // ✅ MATCH FRONTEND
      status: "pending",
    });

    await reg.save();

    res.status(201).json({
      success: true,
      message: "Registration saved successfully",
      registration: reg,
    });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
});

// -----------------------------
// GET /api/registrations/all
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
// -----------------------------
router.put("/confirm/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, {
      status: "confirmed",
    });
    res.json({ success: true, message: "Registration confirmed" });
  } catch (err) {
    console.error("❌ Confirm Error:", err);
    res.status(500).json({ message: "Confirm failed" });
  }
});

// -----------------------------
// PUT /api/registrations/reject/:id
// -----------------------------
router.put("/reject/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });
    res.json({ success: true, message: "Registration rejected" });
  } catch (err) {
    console.error("❌ Reject Error:", err);
    res.status(500).json({ message: "Reject failed" });
  }
});

// -----------------------------
// DELETE /api/registrations/:id
// -----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const imgPath = path.join(uploadDir, reg.paymentImage);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    await reg.deleteOne();

    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// -----------------------------
// GET /api/registrations/export/csv
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
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=registrations.csv"
    );
    res.send(csv);
  } catch (err) {
    console.error("❌ CSV export error:", err);
    res.status(500).json({ message: "CSV export failed" });
  }
});

module.exports = router;
