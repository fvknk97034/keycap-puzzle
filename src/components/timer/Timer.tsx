import styles from "./Timer.module.css";

interface Props {
  elapsedMs: number;
}

export function Timer({ elapsedMs }: Props) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const display = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return <div className={styles["timer"]}>{display}</div>;
}
