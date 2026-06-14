import { CapView } from '../cap/capView'
import { Cap } from '../../models/cap/cap'
import styles from './tray.module.css'

interface Props {
  caps: Cap[]
  selectedCap: Cap | null
  inGaming: boolean
  onClick: (cap: Cap) => void
}

export function TrayView({ caps, selectedCap, inGaming, onClick }: Props) {
  return (
    <div className={styles.tray} style={!inGaming ? { display: 'none' } : {}}>
      {
        caps?.map((cap, i) => {
          return (
            <div
              className={cap === selectedCap ? `${styles.cap} ${styles.selected}` : styles.cap}
              style={cap.trayGrid}
              onClick={() => onClick?.(cap)}
              key={i}
            >
              <CapView cap={cap} />
            </div>
          )
        })
      }
    </div>
  )
}
