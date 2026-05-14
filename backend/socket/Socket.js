const socketIO = require("socket.io");

const { setSocketIO } = require("../controllers/HealthController");

const initSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // ====================================
  // STORE SOCKET INSTANCE
  // ====================================

  setSocketIO(io);
};

module.exports = {
  initSocket,
};
