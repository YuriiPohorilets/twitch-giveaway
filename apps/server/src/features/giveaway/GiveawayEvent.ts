import { Participant } from "./Participant.js";

export type GiveawayEvent =
  | {
      type: "participant_joined";
      data: {
        userId: string;
        username: string;
        displayName: string;
        participants: number;
      };
    }
  | {
      type: "giveaway_started";
      data: {
        keyword: string;
      };
    }
  | {
      type: "giveaway_stopped";
    }
  | {
      type: "giveaway_reset";
    }
  | {
      type: "winners_selected";
      data: Participant[];
    }
  | {
      type: "winner_rerolled";
      data: {
        oldWinner: Participant;
        newWinner: Participant;
      };
    };
