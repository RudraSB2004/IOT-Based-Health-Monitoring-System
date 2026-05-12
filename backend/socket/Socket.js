const socketIO = require("socket.io");

const { setSocketIO } = require("../controllers/healthController");

const initSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  setSocketIO(io);
};

module.exports = { initSocket };
