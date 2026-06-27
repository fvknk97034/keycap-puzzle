import styles from "./RuleModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function RuleModal({ open, onClose }: Props) {
  if (!open) return null;

  function handleClose() {
    onClose();
  }

  return (
    <div className={styles["modal"]} onClick={handleClose}>
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles["modal__title"]}>ゲームのルール</h2>
        <div className={styles["modal__rules"]}>
          <p>
            シャッフルされたキーキャップを、キーボード上の正しい位置に配置してください。
          </p>
          <h3>操作方法</h3>
          <img
            src={`${import.meta.env.BASE_URL}description.svg`}
            className={styles["modal__image"]}
          />
          <ol>
            <li>スタートボタンを押してゲームを開始します。</li>
            <li>手持ちのキーキャップを選択します。</li>
            <li>キーボード上のマスを選択してキーキャップを配置します。</li>
            <li>
              キーボード上の同じマスを2回連続で選択すると、そのマスに配置したキーキャップを取り外せます。
            </li>
            <li>
              手持ちのキーキャップをすべて配置できたら終了ボタンを押します。
            </li>
          </ol>
        </div>
        <div className={styles["modal__footer"]}>
          <button
            className={styles["modal__close-button"]}
            onClick={handleClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
