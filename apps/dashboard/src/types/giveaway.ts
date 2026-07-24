export interface Participant {
  userId: string;
  username: string;
  displayName: string;
}

export interface GiveawaySnapshot {
  state: "idle" | "running" | "finished";
  keyword: string;
  participants: number;
  winners: Participant[];
}

export type GiveawayMessage =
  | {
      type: "giveaway_state";
      data: GiveawaySnapshot;
    }
  | {
      type: "giveaway_started";
      data: {
        keyword: string;
      };
    }
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
