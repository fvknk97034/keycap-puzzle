import styles from './modal.module.css'

interface Props {
  open: boolean
  elapsedMs: number
  onClose: () => void
}

function formatTime(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export function Modal({ open, elapsedMs, onClose }: Props) {
  if (!open) return null

  return (
    <div className={styles['overlay']} onClick={onClose}>
      <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
        <p className={styles['message']}>正解です</p>
        <p className={styles['time']}>{formatTime(elapsedMs)}</p>
        <button className={styles['close-button']} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}
