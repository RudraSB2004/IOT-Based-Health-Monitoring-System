const mongoose = require("mongoose");

const hospitalProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospitalName: String,

    adminName: String,

    location: String,

    contactNumber: String,

    specialization: [String],

    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientProfile",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HospitalProfile", hospitalProfileSchema);
