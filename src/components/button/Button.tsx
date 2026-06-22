import styles from "./Button.module.css";

interface Props {
  disable: boolean;
  label: string;
  onClick: () => void;
}

export function Button({ disable, label, onClick }: Props) {
  return (
    <button className={styles["button"]} disabled={disable} onClick={onClick}>
      {label}
    </button>
  );
}
