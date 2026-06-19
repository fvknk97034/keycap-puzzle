import { useEffect } from "react";
import styles from "./Toast.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Toast({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => onClose(), 3000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles["toast"]} onClick={onClose}>
      <div className={styles["modal__content"]}>
        <p className={styles["modal__message"]}>不正解です</p>
      </div>
    </div>
  );
}
