import { GiveawayEvent } from "./GiveawayEvent.js";

export interface GiveawayEventListener {
  onGiveawayEvent(event: GiveawayEvent): void;
}
