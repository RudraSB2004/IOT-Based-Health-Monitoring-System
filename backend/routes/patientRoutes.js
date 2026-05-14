const express = require("express");

const {
  createPatientProfile,

  getMyProfile,

  getMyReports,

  getMyRealtimeData,
} = require("../controllers/patientController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// ======================================
// CREATE / UPDATE PROFILE
// ======================================

router.post(
  "/profile",

  protect,

  authorizeRoles("patient"),

  createPatientProfile,
);

// ======================================
// GET PROFILE
// ======================================

router.get(
  "/me",

  protect,

  authorizeRoles("patient"),

  getMyProfile,
);

// ======================================
// REALTIME DATA
// ======================================

router.get(
  "/realtime",

  protect,

  authorizeRoles("patient"),

  getMyRealtimeData,
);

// ======================================
// HISTORICAL REPORTS
// ======================================

router.get(
  "/reports",

  protect,

  authorizeRoles("patient"),

  getMyReports,
);

module.exports = router;
