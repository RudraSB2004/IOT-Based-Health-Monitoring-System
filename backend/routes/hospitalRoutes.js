const express = require("express");

const {
  createHospitalProfile,
  assignPatient,
  getHospitalPatients,
  getPatientReports,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorizeRoles("hospital"),
  createHospitalProfile,
);

router.post(
  "/assign-patient",
  protect,
  authorizeRoles("hospital"),
  assignPatient,
);

router.get(
  "/patients",
  protect,
  authorizeRoles("hospital"),
  getHospitalPatients,
);

router.get(
  "/reports/:patientId",
  protect,
  authorizeRoles("hospital"),
  getPatientReports,
);

module.exports = router;
