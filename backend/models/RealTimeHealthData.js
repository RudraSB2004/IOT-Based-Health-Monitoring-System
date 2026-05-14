const mongoose = require("mongoose");

const realtimeHealthSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: true,
    },

    temperature: Number,

    humidity: Number,

    heartRate: Number,

    spo2: Number,

    ecg: [Number],

    status: {
      type: String,
      enum: ["normal", "warning", "critical"],
      default: "normal",
    },
  },
  {
    timestamps: true,
  },
);

// =====================================
// AUTO DELETE AFTER 24 HOURS
// =====================================

realtimeHealthSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("RealtimeHealthData", realtimeHealthSchema);
