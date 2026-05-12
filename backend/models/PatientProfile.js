const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: Number,

    gender: String,

    height: Number,

    weight: Number,

    bloodGroup: String,

    location: String,

    emergencyContact: String,

    diseaseHistory: [String],

    assignedHospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HospitalProfile",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PatientProfile", patientProfileSchema);
