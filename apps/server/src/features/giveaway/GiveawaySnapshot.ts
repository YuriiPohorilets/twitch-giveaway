import { GiveawayState } from "./GiveawayState.js";
import { Participant } from "./Participant.js";

export interface GiveawaySnapshot {
  state: GiveawayState;
  keyword: string;
  participants: number;
  winners: Participant[];
}
