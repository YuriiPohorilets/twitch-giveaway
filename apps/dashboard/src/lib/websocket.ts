import { GiveawayMessage } from "@/types/giveaway";
import { getWebSocketUrl } from "@/utils/getWebSocketUrl";

export function connectWebSocket(onMessage: (message: GiveawayMessage) => void): WebSocket {
  const socket = new WebSocket(getWebSocketUrl());

  socket.onmessage = event => {
    onMessage(JSON.parse(event.data));
  };

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
}
