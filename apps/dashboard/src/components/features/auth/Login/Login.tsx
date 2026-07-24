import { LoginButton } from "@/components/features/auth";
import { Container } from "@/components/ui";
import styles from "./Login.module.css";

export function Login() {
  return (
    <Container fullHeight>
      <div className={styles.wrapper}>
        <LoginButton />
      </div>
    </Container>
  );
}
