const axios = require("axios").default;

const ChatHistory = require("../models/ChatHistory");

const PatientProfile = require("../models/PatientProfile");

const RealtimeHealthData = require("../models/RealtimeHealthData");

// ========================================
// AI SERVER URL
// ========================================

const FLASK_AI_URL =
  process.env.FLASK_AI_URL ||
  "https://iot-based-health-monitoring-system-2.onrender.com/api/agent";

console.log("🌍 FLASK_AI_URL =", FLASK_AI_URL);

// ========================================
// CHAT WITH AI
// ========================================

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const userId = req.user._id;

    // ====================================
    // VALIDATION
    // ====================================

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,

        message: "Message is required",
      });
    }

    // ====================================
    // GET PATIENT PROFILE
    // ====================================

    const patient = await PatientProfile.findOne({
      user: userId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,

        message: "Patient profile not found",
      });
    }

    // ====================================
    // GET LATEST VITALS
    // ====================================

    const latestVitals = await RealtimeHealthData.findOne({
      patient: patient._id,
    }).sort({
      createdAt: -1,
    });

    // ====================================
    // GET CHAT HISTORY
    // ====================================

    let chat = await ChatHistory.findOne({
      patient: patient._id,
    });

    if (!chat) {
      chat = await ChatHistory.create({
        patient: patient._id,

        messages: [],
      });
    }

    // ====================================
    // SAVE USER MESSAGE
    // ====================================

    chat.messages.push({
      role: "user",

      content: message,
    });

    await chat.save();

    // ====================================
    // PREPARE PAYLOAD
    // ====================================

    const payload = {
      query: message,

      patient_profile: {
        age: patient.age || null,

        gender: patient.gender || null,

        diseaseHistory: patient.diseaseHistory || [],

        weight: patient.weight || null,

        height: patient.height || null,
      },

      current_vitals: latestVitals
        ? {
            temperature: latestVitals.temperature || 0,

            heart_rate: latestVitals.heartRate || 0,

            spo2: latestVitals.spo2 || 0,

            ecg: latestVitals.ecg || [],

            status: latestVitals.status || "normal",
          }
        : {
            temperature: 0,

            heart_rate: 0,

            spo2: 0,

            ecg: [],

            status: "normal",
          },

      chat_history: chat.messages.slice(-10).map((m) => ({
        role: m.role,

        content: m.content,
      })),
    };

    // ====================================
    // DEBUG LOGS
    // ====================================

    console.log("📡 Sending request to Flask AI...");

    console.log("🌍 URL:", FLASK_AI_URL);

    // ====================================
    // CALL FLASK AI
    // ====================================

    let flaskResponse;

    try {
      flaskResponse = await axios({
        method: "POST",

        url: FLASK_AI_URL,

        data: payload,

        headers: {
          "Content-Type": "application/json",
        },

        timeout: 180000,
      });
    } catch (flaskError) {
      // ==================================
      // TIMEOUT
      // ==================================

      if (flaskError.code === "ECONNABORTED") {
        console.error("⏳ Flask timeout");

        return res.status(504).json({
          success: false,

          message: "AI response timeout. Please try again.",
        });
      }

      // ==================================
      // FLASK SERVER DOWN
      // ==================================

      if (
        flaskError.code === "ECONNREFUSED" ||
        flaskError.code === "ERR_NETWORK"
      ) {
        console.error("❌ Flask server offline");

        return res.status(503).json({
          success: false,

          message: "AI server is currently offline.",
        });
      }

      // ==================================
      // FLASK RETURNED ERROR
      // ==================================

      if (flaskError.response) {
        console.error("❌ Flask Response Error:", flaskError.response.data);

        return res.status(500).json({
          success: false,

          message: flaskError.response.data?.message || "AI processing failed",
        });
      }

      // ==================================
      // UNKNOWN ERROR
      // ==================================

      console.error("❌ Unknown Flask Error:", flaskError.message);

      return res.status(500).json({
        success: false,

        message: "Unexpected AI server error",
      });
    }

    // ====================================
    // AI RESPONSE
    // ====================================

    const aiReply = flaskResponse?.data?.reply || "No AI response generated.";

    // ====================================
    // SAVE AI MESSAGE
    // ====================================

    chat.messages.push({
      role: "ai",

      content: aiReply,
    });

    await chat.save();

    // ====================================
    // RETURN RESPONSE
    // ====================================

    return res.status(200).json({
      success: true,

      reply: aiReply,

      model_used: flaskResponse?.data?.model_used || "Groq",

      chat,
    });
  } catch (error) {
    console.error("❌ AI Controller Error:", error);

    return res.status(500).json({
      success: false,

      message: "Internal AI controller error",
    });
  }
};

// ========================================
// GET CHAT HISTORY
// ========================================

const getChatHistory = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({
      user: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,

        message: "Patient not found",
      });
    }

    const chat = await ChatHistory.findOne({
      patient: patient._id,
    });

    return res.status(200).json({
      success: true,

      messages: chat?.messages || [],
    });
  } catch (error) {
    console.error("❌ History Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to load chat history",
    });
  }
};

module.exports = {
  chatWithAI,

  getChatHistory,
};
