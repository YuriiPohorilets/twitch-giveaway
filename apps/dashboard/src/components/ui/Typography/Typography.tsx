import { cx } from "@/utils";
import styles from "./Typography.module.css";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button";
  color?: "primary" | "secondary" | "accent" | "success" | "error";
  align?: "start" | "center" | "end";
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function Typography({
  variant = "body1",
  color = "primary",
  align = "start",
  component,
  className,
  children,
}: TypographyProps) {
  const classNames = cx(
    styles.typography,
    styles[variant],
    styles[color],
    styles[align],
    className
  );
  const Component = component || "p";

  return <Component className={classNames}>{children}</Component>;
}
