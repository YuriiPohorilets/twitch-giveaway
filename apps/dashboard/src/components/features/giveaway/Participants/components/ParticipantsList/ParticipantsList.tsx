"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Participant } from "@/lib/api";
import { ParticipantsItem } from "../ParticipantsItem/ParticipantsItem";

import styles from "./ParticipantsList.module.css";

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: participants.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  return (
    <div ref={parentRef} className={styles.wrapper}>
      <div
        className={styles.list}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const participant = participants[virtualRow.index];

          return (
            <div
              key={participant.userId}
              className={styles.item}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ParticipantsItem participant={participant} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
