"use client";

import { usePathname } from "next/navigation";
import { Button, Container, Logo, UserProfile } from "@/components/ui";
import { logout } from "@/lib/api";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("keyword");
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Logo />
          </div>

          <div className={styles.profile}>
            {!isLoginPage && (
              <>
                <UserProfile />

                <Button
                  label="Вихід"
                  size="sm"
                  color="error"
                  className={styles.logout}
                  onClick={handleLogout}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
