import type { Cap } from './cap/cap'
import type { IKeyboard } from './keyboard/interface/ikeyboard'
import { JisKeyboard } from './keyboard/jisKeyboard'
import { Slot } from './slot/slot'

export class Game {
  _keyboardType: string
  _keyboard: IKeyboard = new JisKeyboard()
  _slots: Slot[][]
  _tray: Cap[]

  get keyboardType() {
    return this._keyboardType
  }

  get keyboard() {
    return this._keyboard
  }

  get slots() {
    return this._slots
  }

  get tray() {
    return this._tray
  }

  constructor(tray?: Cap[], slots?: Slot[][], keyboardType = 'JIS') {
    this._keyboardType = keyboardType

    if (tray && slots) {
      this._tray = tray
      this._slots = slots
      return
    }

    this._slots = this._keyboard.buildSlots()
    this._tray = this._keyboard.shuffleCaps()
  }

  isCompleted(): boolean {
    if (this.tray.length != 0) return false

    const userAnswer = this.slots.map((row) => row.map((s) => s.cap!))
    return this.keyboard.equals(userAnswer)
  }

  updateSlot(slot: Slot, cap: Cap | null): Game {
    if (cap) {
      const newTray: Cap[] = this.tray.filter((c: Cap) => c != cap)
      const newSlots: Slot[][] = this.slots.map(
        (row: Slot[]) => row.map(
          (s: Slot) => (s == slot ? new Slot({ ...s.bounds, cap: cap }) : s)
        )
      )
      return new Game(newTray, newSlots)
    }

    const newTray: Cap[] = [...this.tray, slot.cap!]
    const newSlots: Slot[][] = this.slots.map(
      (row: Slot[]) => row.map(
        (s: Slot) => (s == slot ? new Slot({ ...s.bounds, cap: null }) : s)
      )
    )
    return new Game(newTray, newSlots)
  }
}
