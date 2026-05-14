const express = require("express");

const {
  createHospitalProfile,

  assignPatient,

  getHospitalPatients,

  getPatientReports,

  getPatientRealtimeData,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ======================================
// CREATE / UPDATE HOSPITAL PROFILE
// ======================================

router.post(
  "/profile",

  protect,

  authorizeRoles("hospital"),

  createHospitalProfile,
);

// ======================================
// ASSIGN PATIENT
// ======================================

router.post(
  "/assign-patient",

  protect,

  authorizeRoles("hospital"),

  assignPatient,
);

// ======================================
// GET HOSPITAL PATIENTS
// ======================================

router.get(
  "/patients",

  protect,

  authorizeRoles("hospital"),

  getHospitalPatients,
);

// ======================================
// GET REALTIME PATIENT DATA
// ======================================

router.get(
  "/realtime/:patientId",

  protect,

  authorizeRoles("hospital"),

  getPatientRealtimeData,
);

// ======================================
// GET HISTORICAL REPORTS
// ======================================

router.get(
  "/reports/:patientId",

  protect,

  authorizeRoles("hospital"),

  getPatientReports,
);

module.exports = router;
