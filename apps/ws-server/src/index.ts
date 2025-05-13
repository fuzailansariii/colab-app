import { WebSocketServer } from "ws";
import redis from "@repo/redis/index";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const parsedData = JSON.parse(message as unknown as string);
      const { joiningId } = parsedData.payload;
      const roomId = await redis.get(`joiningID:${joiningId}`);
      if (!roomId) {
        ws.send(JSON.stringify({ error: "Room doesn't exist" }));
        return;
      }
      const isMember = await redis.sismember(`room:${roomId}`, joiningId);
      if (!isMember) {
        ws.send(JSON.stringify({ error: "You are not allowed in this room" }));
        return;
      }
      ws.send(JSON.stringify({ success: true, roomId }));
      // Further logic to add the user to the active WebSocket room
    } catch (error) {}
  });

  //   on disconnecting
  ws.on("disconnect", () => {
    console.log("User disconnected: ", ws);
  });
});
