const HealthData = require("../models/HealthData");

const createHealthData = async (req, res) => {
  try {
    const { patientId, temperature, humidity, heartRate, spo2, ecg } = req.body;

    let status = "normal";

    if (heartRate > 120 || spo2 < 90) {
      status = "critical";
    } else if (heartRate > 100 || spo2 < 95) {
      status = "warning";
    }

    const report = await HealthData.create({
      patient: patientId,
      temperature,
      humidity,
      heartRate,
      spo2,
      ecg,
      status,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHealthData,
};
