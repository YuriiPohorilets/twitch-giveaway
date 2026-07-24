"use client";

import { useEffect, useRef, useState } from "react";
import { Participant } from "@/lib/api";
import { copyText } from "@/utils";
import { Button } from "@/components/ui";
import { NoWinners, WinnersList } from "./components";
import styles from "./Winners.module.css";

interface WinnersProps {
  winners: Participant[];
}

const DEFAULT_LABEL = "Скопіювати переможців";
const COPIED_LABEL = "Скопійовано!";
const ERROR_LABEL = "Помилка копіювання";

export function Winners({ winners }: WinnersProps) {
  const [copyLabel, setCopyLabel] = useState(DEFAULT_LABEL);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyClick = async () => {
    try {
      await copyText(text);
      setCopyLabel(COPIED_LABEL);
    } catch {
      setCopyLabel(ERROR_LABEL);
    } finally {
      resetLabelAfterDelay();
    }
  };

  const text = winners
    .map((winner, index) => `${index + 1}. ${winner.displayName} (@${winner.username})`)
    .join("\n");

  const resetLabelAfterDelay = (delay = 600) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCopyLabel(DEFAULT_LABEL);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={styles.winners}>
      {winners.length === 0 ? (
        <NoWinners />
      ) : (
        <>
          <div className={styles.controls}>
            <Button
              label={copyLabel}
              color="secondary"
              onClick={handleCopyClick}
              fullWidth
              className={styles.copy}
            />
          </div>

          <WinnersList winners={winners} />
        </>
      )}
    </div>
  );
}
