const express = require("express");

const router = express.Router();

const { createHealthData } = require("../controllers/healthController");

router.post("/", createHealthData);

module.exports = router;
