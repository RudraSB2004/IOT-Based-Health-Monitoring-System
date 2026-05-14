const PatientProfile = require("../models/PatientProfile");

const RealtimeHealthData = require("../models/RealtimeHealthData");

const HourlyHealthSummary = require("../models/HourlyHealthSummary");

// ======================================
// CREATE / UPDATE PROFILE
// ======================================

const createPatientProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOneAndUpdate(
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

      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// GET MY PROFILE
// ======================================

const getMyProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({
      user: req.user._id,
    })

      .populate("assignedHospital")

      .lean();

    res.json({
      success: true,

      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// GET MY REALTIME DATA
// ======================================

const getMyRealtimeData = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({
      user: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,

        message: "Patient profile not found",
      });
    }

    const realtime = await RealtimeHealthData.find({
      patient: patient._id,
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
// GET MY REPORTS
// ======================================

const getMyReports = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({
      user: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,

        message: "Patient profile not found",
      });
    }

    const reports = await HourlyHealthSummary.find({
      patient: patient._id,
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
  createPatientProfile,

  getMyProfile,

  getMyRealtimeData,

  getMyReports,
};
