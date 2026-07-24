import { cx } from "@/utils";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "text";
  label: string;
  color?: "primary" | "secondary" | "accent" | "success" | "error";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  type = "button",
  children,
  className,
  label,
  color = "primary",
  fullWidth,
  size = "md",
  ...props
}: ButtonProps) {
  const classNames = cx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth ? styles.fullWidth : "",
    className
  );
  const labelClassNames = cx(styles.label, styles[`color-${color}`]);

  return (
    <button className={classNames} type={type} {...props}>
      <span className={labelClassNames} data-label={label}>
        {label}
      </span>
      {children}
    </button>
  );
}
