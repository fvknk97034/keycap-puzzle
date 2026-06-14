import { CapView } from '../cap/capView'
import type { Slot } from '../../models/slot/slot'
import styles from './slot.module.css'

interface Props {
  slot: Slot
  selectedSlot: Slot | null
  onClick: () => void
}

export function SlotView({ slot, selectedSlot, onClick }: Props) {
  const classes = [styles['slot']]
  if (slot.fixed) classes.push(styles['fixed'])
  if (slot == selectedSlot) classes.push(styles['selected'])

  return (
    <div
      className={classes.join(' ')}
      style={slot.grid}
      onClick={onClick}
    >
      {slot.cap ? <CapView cap={slot.cap} /> : ''}
    </div >
  )
}
