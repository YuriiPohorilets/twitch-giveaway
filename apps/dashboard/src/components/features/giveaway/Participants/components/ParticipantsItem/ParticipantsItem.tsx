import type { Participant } from "@/lib/api";
import { Typography } from "@/components/ui";
import styles from "./ParticipantsItem.module.css";

interface ParticipantsItemProps {
  participant: Participant;
}

export function ParticipantsItem({ participant }: ParticipantsItemProps) {
  return (
    <div className={styles.item}>
      <Typography component="span" variant="body2">
        @{participant.displayName}
      </Typography>
    </div>
  );
}
