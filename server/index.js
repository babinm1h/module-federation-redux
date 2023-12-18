import { WebSocketServer } from "ws";
import { v4 } from "uuid";

//======================
const clients = {};
//======================

const wss = new WebSocketServer({ port: 8000 }, () => console.log("ws server start"));

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    console.log("message-", message);

    switch (message.event) {
      case "message": {
        sendMessages(message);
        break;
      }

      case "connect": {
        sendMessages(message);
        break;
      }
    }
  });

  ws.on("close", (ws) => {
    console.log(`closed`, ws);
  });
});

function sendMessages(message) {
  wss.clients.forEach((wsClient) => {
    wsClient.send(JSON.stringify(message));
  });
}

