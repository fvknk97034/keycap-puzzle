import { SlotView } from '../slot/slotView'
import { Slot } from '../../models/slot/slot'
import styles from './keyboard.module.css'

interface Props {
  slots: Slot[][]
  selectedSlot: Slot | null
  onClick: (slot: Slot) => void
}

export function KeyboardView({ slots, selectedSlot, onClick }: Props) {
  return (
    <div className={styles.keyboard}>
      {slots.flat().map((slot, i) => (
        <SlotView key={i} slot={slot} selectedSlot={selectedSlot} onClick={() => onClick(slot)} />
      ))}
    </div>
  )
}
