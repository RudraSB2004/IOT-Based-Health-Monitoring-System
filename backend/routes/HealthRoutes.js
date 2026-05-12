const express = require("express");

const {
  createHealthData,
  getHealthData,
} = require("../controllers/HealthController");

const router = express.Router();

router.post("/", createHealthData);

module.exports = router;
