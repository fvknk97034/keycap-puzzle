import styles from './cap.module.css'
import type { Cap } from '../../models/cap/cap'

interface Props {
  cap: Cap
}

export function CapView({ cap }: Props) {
  const classes = [styles['cap']]
  if (cap.isSingleFunction()) classes.push(styles['single'])

  return (
    <div
      className={classes.join(' ')}
      style={{ ...cap.grid }}
    >
      {
        cap.labels.map((v, index) => (
          <div
            className={styles.char}
            key={index}
          >
            {v}
          </div>
        ))
      }
    </div>
  )
}
