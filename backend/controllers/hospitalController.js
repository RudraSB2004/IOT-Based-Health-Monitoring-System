const HospitalProfile = require("../models/HospitalProfile");

const PatientProfile = require("../models/PatientProfile");

const RealtimeHealthData = require("../models/RealtimeHealthData");

const HourlyHealthSummary = require("../models/HourlyHealthSummary");

// ======================================
// CREATE / UPDATE HOSPITAL PROFILE
// ======================================

const createHospitalProfile = async (req, res) => {
  try {
    const hospital = await HospitalProfile.findOneAndUpdate(
      {
        user: req.user._id,
      },

      {
        ...req.body,
      },

      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json({
      success: true,

      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// ASSIGN PATIENT
// ======================================

const assignPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    const hospital = await HospitalProfile.findOne({
      user: req.user._id,
    });

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }

    const patient = await PatientProfile.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    patient.assignedHospital = hospital._id;

    await patient.save();

    // ================================
    // PREVENT DUPLICATES
    // ================================

    if (!hospital.patients.includes(patient._id)) {
      hospital.patients.push(patient._id);

      await hospital.save();
    }

    res.json({
      success: true,

      message: "Patient assigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// GET HOSPITAL PATIENTS
// ======================================

const getHospitalPatients = async (req, res) => {
  try {
    const patients = await PatientProfile.find().populate("user").lean();

    res.json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET PATIENT REALTIME DATA
// ======================================

const getPatientRealtimeData = async (req, res) => {
  try {
    const { patientId } = req.params;

    const realtime = await RealtimeHealthData.find({
      patient: patientId,
    })

      .sort({
        createdAt: -1,
      })

      .limit(20)

      .lean();

    res.json({
      success: true,

      data: realtime,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// GET PATIENT HOURLY REPORTS
// ======================================

const getPatientReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    const reports = await HourlyHealthSummary.find({
      patient: patientId,
    })

      .sort({
        hourStart: -1,
      })

      .limit(100)

      .lean();

    res.json({
      success: true,

      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  createHospitalProfile,

  assignPatient,

  getHospitalPatients,

  getPatientRealtimeData,

  getPatientReports,
};
