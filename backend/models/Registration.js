const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    ticketType: String,
    age: String,
    gender: String,
    address: String,
    emergencyContact: String,
    notes: String,

    // Payment Proof Image Filename
    paymentImage: String,

    // Status: pending / confirmed / rejected
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);
