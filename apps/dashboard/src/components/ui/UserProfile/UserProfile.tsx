import { useAuth } from "@/hooks/useAuth";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const { user, loading } = useAuth();

  if (!user || loading) {
    return <></>;
  }

  return <span className={styles.name}>{user.displayName}</span>;
}
