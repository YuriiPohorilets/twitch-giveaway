"use client";

import { useGiveaway } from "@/hooks/useGiveaway";
import { Container, Loader, Block, Typography, Divider } from "@/components/ui";
import {
  Controls,
  Instructions,
  Notes,
  Participants,
  Winners,
} from "@/components/features/giveaway";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const giveaway = useGiveaway();

  if (!giveaway) {
    return <Loader />;
  }

  return (
    <Container fullHeight>
      <div className={styles.dashboard}>
        <div className={styles.blockStart}>
          <Block variant="outer" border="lg" className={styles.settings}>
            <Typography variant="h6" component="h2" color="accent" align="center">
              Налаштування
            </Typography>

            <Controls giveaway={giveaway} />
          </Block>

          <Block variant="outer" border="lg" className={styles.participants}>
            <Typography variant="h6" component="h2" color="accent" align="center">
              Учасники
            </Typography>

            <Participants />
          </Block>
        </div>

        <div className={styles.blockCenter}>
          <Block variant="outer" border="lg" className={styles.winners}>
            <Typography variant="h6" component="h2" color="accent" align="center">
              Переможці
            </Typography>

            <Winners winners={giveaway.winners} />
          </Block>
        </div>

        <div className={styles.blockEnd}>
          <Block variant="outer" border="lg" className={styles.instructions}>
            <Typography variant="h6" component="h2" color="accent" align="center">
              Як провести розіграш
            </Typography>

            <Instructions />

            <Divider />

            <Typography variant="h6" component="h2" color="accent" align="center">
              Важливо
            </Typography>

            <Notes />
          </Block>
        </div>
      </div>
    </Container>
  );
}
