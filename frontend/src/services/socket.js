import { io } from "socket.io-client";

// ======================================
// SOCKET URL
// ======================================

const socketURL =
  process.env.REACT_APP_SOCKET_URL ||
  "https://iot-based-health-monitoring-system.onrender.com";

// ======================================
// SOCKET INSTANCE
// ======================================

const socket = io(socketURL, {
  transports: ["websocket", "polling"],

  reconnection: true,

  reconnectionAttempts: Infinity,

  reconnectionDelay: 1000,
});

export default socket;
