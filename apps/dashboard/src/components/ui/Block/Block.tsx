import { cx } from "@/utils";
import styles from "./Block.module.css";

interface BlockProps {
  children: React.ReactNode;
  variant: "inner" | "outer";
  border: "sm" | "md" | "lg";
  className?: string;
}

export function Block({ children, variant, border, className }: BlockProps) {
  const classNames = cx(styles.block, styles[variant], styles[`border-${border}`], className);

  return <div className={classNames}>{children}</div>;
}
