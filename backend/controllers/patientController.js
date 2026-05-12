const PatientProfile = require("../models/PatientProfile");
const HealthData = require("../models/HealthData");

const createPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      user: req.user._id,
    }).populate("assignedHospital");

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyReports = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({
      user: req.user._id,
    });

    const reports = await HealthData.find({
      patient: patient._id,
    }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPatientProfile,
  getMyProfile,
  getMyReports,
};
