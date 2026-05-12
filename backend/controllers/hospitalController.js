const HospitalProfile = require("../models/HospitalProfile");
const PatientProfile = require("../models/PatientProfile");
const HealthData = require("../models/HealthData");

const createHospitalProfile = async (req, res) => {
  try {
    const hospital = await HospitalProfile.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(hospital);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const assignPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    const hospital = await HospitalProfile.findOne({
      user: req.user._id,
    });

    const patient = await PatientProfile.findById(patientId);

    patient.assignedHospital = hospital._id;

    await patient.save();

    hospital.patients.push(patient._id);

    await hospital.save();

    res.json({
      message: "Patient assigned",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getHospitalPatients = async (req, res) => {
  try {
    const hospital = await HospitalProfile.findOne({
      user: req.user._id,
    }).populate({
      path: "patients",
      populate: {
        path: "user",
      },
    });

    res.json(hospital.patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPatientReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    const reports = await HealthData.find({
      patient: patientId,
    }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHospitalProfile,
  assignPatient,
  getHospitalPatients,
  getPatientReports,
};
