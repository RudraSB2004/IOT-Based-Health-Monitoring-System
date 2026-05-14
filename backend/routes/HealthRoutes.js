const express = require("express");

const router = express.Router();

const { createHealthData } = require("../controllers/HealthController");

router.post("/", createHealthData);

module.exports = router;
