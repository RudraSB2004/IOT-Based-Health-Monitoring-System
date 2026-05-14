const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const patientRoutes = require("./routes/patientRoutes");

const hospitalRoutes = require("./routes/hospitalRoutes");

const healthRoutes = require("./routes/HealthRoutes");
const aiRoutes = require("./routes/aiRoutes");
const { initSocket } = require("./socket/socket");

// ======================================

dotenv.config();

// ======================================

connectDB();

// ======================================
// START CRON JOBS
// ======================================

require("./cron/hourlyHealthAggregation");

// ======================================

const app = express();

// ======================================

app.use(cors());

app.use(express.json());

// ======================================
// ROUTES
// ======================================

app.use("/api/auth", authRoutes);

app.use("/api/patient", patientRoutes);

app.use("/api/hospital", hospitalRoutes);

app.use("/api/health", healthRoutes);
app.use("/api/ai", aiRoutes);

// ======================================
// HTTP SERVER
// ======================================

const server = http.createServer(app);

// ======================================
// SOCKET.IO
// ======================================

initSocket(server);

// ======================================

const PORT = process.env.PORT || 5000;

// ======================================

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
