const express = require("express");

const {
  createPatientProfile,
  getMyProfile,
  getMyReports,
} = require("../controllers/patientController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorizeRoles("patient"),
  createPatientProfile,
);

router.get("/me", protect, authorizeRoles("patient"), getMyProfile);

router.get("/reports", protect, authorizeRoles("patient"), getMyReports);

module.exports = router;
