import { GiveawayEvent } from "../../features/giveaway/GiveawayEvent.js";
import { GiveawayEventListener } from "../../features/giveaway/GiveawayEventListener.js";
import { WebSocketManager } from "./WebSocketManager.js";

export class GiveawayWebSocketBridge implements GiveawayEventListener {
  constructor(private readonly websocketManager: WebSocketManager) {}

  public onGiveawayEvent(event: GiveawayEvent): void {
    this.websocketManager.broadcast(event);
  }
}
