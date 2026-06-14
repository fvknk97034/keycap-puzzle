import styles from './button.module.css'

interface Props {
  inGaming: boolean
  canFinish: boolean
  onClick: () => void
}

export function Button({ inGaming, canFinish, onClick }: Props) {
  return (
    <button className={styles['button']} disabled={inGaming && !canFinish} onClick={onClick}>
      {inGaming ? '回答終了' : '回答開始'}
    </button>
  )
}
