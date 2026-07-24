import { TwitchLogoIcon } from "@/components/icons";
import styles from "./Logo.module.css";

export function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.icon}>
        <TwitchLogoIcon />
      </span>
      <span className={styles.label}>Leb1ga Giveaway</span>
    </div>
  );
}
