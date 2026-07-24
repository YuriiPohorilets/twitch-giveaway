"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Participant } from "@/lib/api";
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
    estimateSize: () => 40, // 32px item height + 8px gap
    overscan: 10,
  });

  return (
    <div ref={parentRef} className={styles.wrapper}>
      <div style={{ blockSize: rowVirtualizer.getTotalSize() }} className={styles.list}>
        {rowVirtualizer.getVirtualItems().map(({ index, start }) => {
          const participant = participants[index];

          return (
            <div
              key={participant.userId}
              style={{ transform: `translateY(${start}px)` }}
              className={styles.item}
            >
              <ParticipantsItem participant={participant} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
