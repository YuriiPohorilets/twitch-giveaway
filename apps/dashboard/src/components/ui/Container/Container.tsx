import styles from "./Container.module.css";

interface ContainerProps {
  children?: React.ReactNode;
  fullHeight?: boolean;
}

export function Container({ children, fullHeight }: ContainerProps) {
  const classNames = `${styles.container} ${fullHeight ? styles.fullHeight : ""}`;

  return <div className={classNames}>{children}</div>;
}
