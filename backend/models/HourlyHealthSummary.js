const mongoose = require("mongoose");

const hourlySummarySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: true,
    },

    hourStart: {
      type: Date,
      required: true,
    },

    avgTemperature: Number,

    avgHumidity: Number,

    avgHeartRate: Number,

    minHeartRate: Number,

    maxHeartRate: Number,

    avgSpo2: Number,

    minSpo2: Number,

    warnings: Number,

    criticals: Number,

    totalRecords: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HourlyHealthSummary", hourlySummarySchema);
