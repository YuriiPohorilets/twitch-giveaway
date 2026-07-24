"use client";

import { useEffect, useState } from "react";
import { getGiveaway } from "@/lib/api";
import { connectWebSocket } from "@/lib/websocket";
import { GiveawaySnapshot } from "@/types/giveaway";

export function useGiveaway() {
  const [snapshot, setSnapshot] = useState<GiveawaySnapshot | null>(null);

  useEffect(() => {
    async function load() {
      setSnapshot(await getGiveaway());
    }

    load();

    const socket = connectWebSocket(message => {
      switch (message.type) {
        case "giveaway_state":
          setSnapshot(message.data);
          break;

        case "giveaway_started":
          setSnapshot(current =>
            current
              ? {
                  ...current,
                  state: "running",
                  keyword: message.data.keyword,
                  participants: 0,
                  winners: [],
                }
              : current
          );
          break;

        case "participant_joined":
          setSnapshot(current =>
            current
              ? {
                  ...current,
                  participants: message.data.participants,
                }
              : current
          );
          break;

        case "giveaway_stopped":
          setSnapshot(current =>
            current
              ? {
                  ...current,
                  state: "finished",
                }
              : current
          );
          break;

        case "giveaway_reset":
          setSnapshot(current =>
            current
              ? {
                  state: "idle",
                  keyword: "",
                  participants: 0,
                  winners: [],
                }
              : current
          );
          break;

        case "winners_selected":
          setSnapshot(current =>
            current
              ? {
                  ...current,
                  winners: message.data,
                }
              : current
          );
          break;

        case "winner_rerolled":
          setSnapshot(current => {
            if (!current) {
              return current;
            }

            return {
              ...current,
              winners: current.winners.map(winner =>
                winner.userId === message.data.oldWinner.userId ? message.data.newWinner : winner
              ),
            };
          });

          break;
      }
    });

    return () => socket.close();
  }, []);

  return snapshot;
}
