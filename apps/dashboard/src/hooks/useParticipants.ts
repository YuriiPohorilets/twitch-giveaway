"use client";

import { useEffect, useState } from "react";

import { getParticipants, Participant } from "@/lib/api";
import { connectWebSocket } from "@/lib/websocket";

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    async function load() {
      setParticipants(await getParticipants());
    }

    load();

    const socket = connectWebSocket(message => {
      if (message.type === "participant_joined") {
        setParticipants(current => [...current, message.data]);
      }

      if (message.type === "giveaway_reset") {
        setParticipants([]);
      }
    });

    return () => socket.close();
  }, []);

  return participants;
}
