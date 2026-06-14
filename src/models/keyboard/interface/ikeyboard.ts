import type { Cap } from '../../cap/cap'
import type { Slot } from '../../slot/slot'

export interface IKeyboard {
  _layout: Cap[][]
  buildSlots(): Slot[][]
  shuffleCaps(): Cap[]
  equals(other: Cap[][]): boolean
}
