const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema(
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

    ecg: Number,

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

module.exports = mongoose.model("HealthData", healthSchema);
