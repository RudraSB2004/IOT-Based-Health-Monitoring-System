const mongoose = require("mongoose");

const RealtimeHealthData = require("../models/RealtimeHealthData");

let ioInstance;

// =====================================
// STORE SOCKET INSTANCE
// =====================================

const setSocketIO = (io) => {
  ioInstance = io;
};

// =====================================
// CREATE HEALTH DATA
// =====================================

const createHealthData = async (req, res) => {
  try {
    let { patientId, temperature, humidity, heartRate, spo2, ecg } = req.body;

    // =================================
    // VALIDATE PATIENT ID
    // =================================

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    // =================================
    // CONVERT VALUES TO NUMBER
    // =================================

    temperature = Number(temperature);

    humidity = Number(humidity);

    heartRate = Number(heartRate);

    spo2 = Number(spo2);

    // =================================
    // INVALID SENSOR CHECK
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
    // ECG VALIDATION
    // =================================

    if (!Array.isArray(ecg)) {
      ecg = [];
    }

    ecg = ecg
      .map((v) => Number(v))
      .filter((v) => !isNaN(v))
      .slice(-100);

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
    // CLEAN SOCKET PAYLOAD
    // =================================

    const socketPayload = {
      _id: report._id,

      patient: report.patient,

      temperature: report.temperature,

      humidity: report.humidity,

      heartRate: report.heartRate,

      spo2: report.spo2,

      ecg: report.ecg,

      status: report.status,

      createdAt: report.createdAt,
    };

    // =================================
    // SOCKET EMIT
    // =================================

    console.log("Emitting new health data");

    if (ioInstance) {
      ioInstance.emit("newHealthData", socketPayload);
    }

    // =================================
    // RESPONSE
    // =================================

    return res.status(201).json({
      success: true,

      message: "Realtime health data stored",

      data: socketPayload,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================

module.exports = {
  createHealthData,
  setSocketIO,
};
