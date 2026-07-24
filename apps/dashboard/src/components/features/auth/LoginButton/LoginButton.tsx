"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import styles from "./LoginButton.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    localStorage.removeItem("keyword");

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // fallback if redirect stalls

    window.location.href = `${API_URL}/auth/twitch/login?flow=streamer`;

    return () => clearTimeout(timeout);
  };

  return (
    <Button
      label={isLoading ? "Зачекайте..." : "Увійти через Twitch"}
      disabled={isLoading}
      size="lg"
      color="accent"
      fullWidth
      onClick={handleLogin}
      className={styles.button}
    />
  );
}
