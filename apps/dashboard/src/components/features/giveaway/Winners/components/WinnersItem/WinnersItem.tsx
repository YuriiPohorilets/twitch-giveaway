"use client";

import { useState } from "react";
import { Participant, rerollWinner } from "@/lib/api";
import { Typography } from "@/components/ui";
import { Button } from "@/components/ui";
import styles from "./WinnersItem.module.css";

interface WinnersListProps {
  winner: Participant;
  place: number;
}

interface RerollError {
  userId: string;
  message: string;
}

const medal = ["🥇", "🥈", "🥉"];

export function WinnersItem({ winner, place }: WinnersListProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [rerollError, setRerollError] = useState<RerollError | null>(null);

  async function handleReroll(userId: string) {
    setLoading(userId);
    setRerollError(null);

    try {
      await rerollWinner(userId);
    } catch (error) {
      setRerollError({
        userId,
        message: error instanceof Error ? error.message : "Не вдалося переобрати",
      });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={styles.winner}>
      <div className={styles.place}>{medal[place - 1] ?? place}</div>

      <div className={styles.info}>
        <Typography component="div" variant="body1" className={styles.username}>
          @{winner.username}
        </Typography>

        {rerollError?.userId === winner.userId && (
          <p className={styles.error}>Не вдалося переобрати: {rerollError.message}</p>
        )}

        <Button
          color="accent"
          disabled={loading === winner.userId}
          label={loading === winner.userId ? "..." : "Переобрати"}
          onClick={() => handleReroll(winner.userId)}
        />
      </div>
    </div>
  );
}
