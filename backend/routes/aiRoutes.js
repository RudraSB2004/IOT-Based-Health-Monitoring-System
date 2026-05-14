const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  chatWithAI,

  getChatHistory,
} = require("../controllers/aiController");

// ======================================
// CHAT
// ======================================

router.post(
  "/chat",

  protect,

  authorizeRoles("patient"),

  chatWithAI,
);

// ======================================
// HISTORY
// ======================================

router.get(
  "/history",

  protect,

  authorizeRoles("patient"),

  getChatHistory,
);

module.exports = router;
