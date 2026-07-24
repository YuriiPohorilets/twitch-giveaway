import { useParticipants } from "@/hooks/useParticipants";
import { Typography } from "@/components/ui";
import { ParticipantsList } from "./components";
import styles from "./Participants.module.css";

export function Participants() {
  const participants = useParticipants();

  return (
    <div className={styles.participants}>
      <div className={styles.stats}>
        <Typography component="span" variant="body2">
          Кількість учасників:
        </Typography>

        <Typography component="span" variant="body1" className={styles.value}>
          {participants.length}
        </Typography>
      </div>

      <ParticipantsList participants={participants} />
    </div>
  );
}
