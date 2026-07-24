import { Container } from "@/components/ui";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <span className={styles.label}>Слава Україні 🇺🇦</span>
        </div>
      </Container>
    </footer>
  );
}
