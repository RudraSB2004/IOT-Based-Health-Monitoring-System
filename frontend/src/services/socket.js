import { io } from "socket.io-client";

// Use Vite env variable, fallback to CRA env variable, then fallback to localhost
const socketURL =
  //   import.meta.env?.VITE_SOCKET_URL ||
  process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

const socket = io(socketURL);

export default socket;
