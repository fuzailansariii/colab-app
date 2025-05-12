import { WebSocketServer } from "ws";
import express from "express";

const app = express();
const PORT = 8080;
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.send("Hello World!");
});
