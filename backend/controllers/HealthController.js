const mongoose = require("mongoose");

const RealtimeHealthData = require("../models/RealtimeHealthData");
let ioInstance;

const setSocketIO = (io) => {
  ioInstance = io;
};

const createHealthData = async (req, res) => {
  try {
    let { patientId, temperature, humidity, heartRate, spo2, ecg } = req.body;

    // =================================
    // VALIDATION
    // =================================

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    // =================================
    // CONVERT TO NUMBERS
    // =================================

    temperature = Number(temperature);

    humidity = Number(humidity);

    heartRate = Number(heartRate);

    spo2 = Number(spo2);

    // =================================
    // INVALID DATA CHECK
    // =================================

    if (
      isNaN(temperature) ||
      isNaN(humidity) ||
      isNaN(heartRate) ||
      isNaN(spo2)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid sensor values",
      });
    }

    // =================================
    // ECG LIMIT
    // =================================

    if (!Array.isArray(ecg)) {
      ecg = [];
    }

    ecg = ecg.slice(-100);

    // =================================
    // STATUS LOGIC
    // =================================

    let status = "normal";

    if (heartRate > 120 || spo2 < 90 || temperature > 39) {
      status = "critical";
    } else if (heartRate > 100 || spo2 < 95 || temperature > 37.8) {
      status = "warning";
    }

    // =================================
    // STORE DATA
    // =================================

    const report = await RealtimeHealthData.create({
      patient: patientId,

      temperature,

      humidity,

      heartRate,

      spo2,

      ecg,

      status,
    });

    // =================================
    // SOCKET EMIT
    // =================================

    if (ioInstance) {
      ioInstance.emit("newHealthData", report);
    }

    // =================================
    // RESPONSE
    // =================================

    return res.status(201).json({
      success: true,

      message: "Realtime health data stored",

      data: report,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
module.exports = {
  createHealthData,

  setSocketIO,
};
