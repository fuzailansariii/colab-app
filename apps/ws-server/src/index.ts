import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3001;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected with socketId: ", socket.id);
  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
