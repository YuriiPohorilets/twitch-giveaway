import { Participant } from "@/lib/api";
import { WinnersItem } from "../WinnersItem/WinnersItem";
import styles from "./WinnersList.module.css";

interface WinnersListProps {
  winners: Participant[];
}

export function WinnersList({ winners }: WinnersListProps) {
  return (
    <div className={styles.list}>
      {winners.map((winner, index) => (
        <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
        // <>
        /* <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={1index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={1index + 1} />
          <WinnersItem key={winner.userId} winner={winner} place={1index + 1} /> */
        // </>
      ))}
    </div>
  );
}
