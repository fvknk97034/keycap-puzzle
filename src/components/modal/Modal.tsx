import styles from "./Modal.module.css";

interface Props {
  open: boolean;
  elapsedMs: number;
  onClose: () => void;
}

function formatTime(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function Modal({ open, elapsedMs, onClose }: Props) {
  if (!open) return null;

  return (
    <div className={styles["modal"]} onClick={onClose}>
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles["modal__message"]}>正解です</p>
        <p className={styles["modal__time"]}>{formatTime(elapsedMs)}</p>
        <button className={styles["modal__close-button"]} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
}
