"use client";

import React, { useState } from "react";
import { pickWinners, resetGiveaway, startGiveaway, stopGiveaway } from "@/lib/api";
import { GiveawaySnapshot } from "@/types/giveaway";
import { Button, Divider, TextField } from "@/components/ui";

import styles from "./Controls.module.css";

interface ControlsProps {
  giveaway: GiveawaySnapshot;
}

export function Controls({ giveaway }: ControlsProps) {
  const storedKeyword = localStorage.getItem("keyword");
  const [keyword, setKeyword] = useState(storedKeyword ?? "");
  const [winnerCount, setWinnerCount] = useState<number | "">(1);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/ {2,}/g, " ");
    const formattedValue = value.trim() === "" ? "" : value;
    setKeyword(formattedValue);
    localStorage.setItem("keyword", formattedValue);
  };

  const handleWinnerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setWinnerCount("");
      return;
    }

    const value = Number(rawValue);

    if (Number.isNaN(value)) {
      return;
    }

    if (value === 0) {
      setWinnerCount("");
      return;
    }

    const clampedValue = Math.min(Math.max(value, 1), 12);

    setWinnerCount(clampedValue);
  };

  const handleResetClick = () => {
    setKeyword("");
    setWinnerCount("");
    resetGiveaway();
    localStorage.removeItem("keyword");
  };

  const isRunning = giveaway.state === "running";
  const isIdle = giveaway.state === "idle";
  const isFinished = giveaway.state === "finished";
  const isWinnersSelected = giveaway.winners.length > 0;

  return (
    <div className={styles.controls}>
      <div className={styles.block}>
        <TextField
          type="text"
          value={keyword}
          name="keyword"
          autoComplete="off"
          label="Ключове слово"
          fullWidth
          onChange={handleKeywordChange}
          disabled={isRunning}
          onBlur={e => setKeyword(e.target.value.trim())}
        />

        <TextField
          type="text"
          value={winnerCount}
          name="winnerCount"
          autoComplete="off"
          label="Кількість переможців"
          fullWidth
          disabled={isRunning}
          onChange={handleWinnerCountChange}
        />
      </div>

      <Divider />

      <div className={styles.block}>
        <div className={styles.row}>
          <Button
            label="Старт"
            disabled={isRunning || !keyword || !winnerCount}
            color="success"
            className={styles.button}
            onClick={() => startGiveaway(keyword)}
          />

          <Button
            label="Стоп"
            disabled={!isRunning}
            color="error"
            className={styles.button}
            onClick={() => stopGiveaway()}
          />
        </div>

        <Button
          label="Обрати переможців"
          disabled={giveaway.participants === 0 || !isFinished || isWinnersSelected}
          color="accent"
          fullWidth
          size="lg"
          onClick={() => pickWinners(Number(winnerCount))}
        />

        <Button
          label="Скинути"
          disabled={isIdle}
          variant="text"
          color="primary"
          onClick={handleResetClick}
        />
      </div>
    </div>
  );
}
