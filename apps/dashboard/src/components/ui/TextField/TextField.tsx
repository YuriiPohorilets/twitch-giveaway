import { cx } from "@/utils";
import styles from "./TextField.module.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
}

export function TextField({ className, label, fullWidth, ...props }: TextFieldProps) {
  const classNames = cx(styles.wrapper, fullWidth ? styles.fullWidth : "", className);

  return (
    <label className={classNames}>
      <span className={styles.label}>{label}</span>
      <input type="text" className={styles.input} {...props} />
    </label>
  );
}
