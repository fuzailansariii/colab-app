import { WebSocketServer, WebSocket } from "ws";
import redis from "@repo/redis/index";

const roomSocketsMap = new Map<string, Set<WebSocket>>();
const socketToRoomMap = new Map<WebSocket, string>();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const parsedData = JSON.parse(message.toString());
      const { type, payload } = parsedData;

      // Handle joining room
      if (type === "join_room") {
        // Check for valid payload
        if (!payload?.joiningId || !payload?.userId) {
          ws.send(JSON.stringify({ error: "Invalid payload" }));
          return;
        }

        // Get joiningId and userId from the payload
        const { joiningId, userId } = payload;
        console.log(`joiningId: ${joiningId}, userId: ${userId}`);
        const roomId = await redis.get(`joiningId:${joiningId}`);
        if (!roomId) {
          ws.send(JSON.stringify({ error: "Room doesn't exist" }));
          return;
        }

        // add socket to room
        if (!roomSocketsMap.has(roomId)) {
          roomSocketsMap.set(roomId, new Set());
        }
        roomSocketsMap.get(roomId)!.add(ws);
        socketToRoomMap.set(ws, roomId);

        ws.send(
          JSON.stringify({ success: true, message: `Joined room ${roomId}` })
        );
      }
    } catch (error) {
      ws.send(JSON.stringify({ error: "something went wrong." }));
    }
  });

  // Clean up on disconnect
  ws.on("close", () => {
    const roomId = socketToRoomMap.get(ws);
    if (roomId) {
      const sockets = roomSocketsMap.get(roomId);
      if (sockets) {
        sockets.delete(ws);
        if (sockets.size === 0) {
          roomSocketsMap.delete(roomId);
        }
      }
    }
    socketToRoomMap.delete(ws);
  });
});
