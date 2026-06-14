import { describe, it, expect } from 'vitest'
import { JisKeyboard } from '../../../models/keyboard/jisKeyboard'
import { Cap } from '../../../models/cap/cap'

describe('JisKeyboard', () => {
  describe('_layout', () => {
    it('_data と同じ行・列数の Cap[][] が生成される', () => {
      const keyboard = new JisKeyboard()

      expect(keyboard._layout.length).toBe(keyboard._data.length)
      keyboard._layout.forEach((row, i) => {
        expect(row.length).toBe(keyboard._data[i].length)
        row.forEach((cap) => expect(cap).toBeInstanceOf(Cap))
      })
    })

    it('各 Cap の labels が _data の labels と一致する', () => {
      const keyboard = new JisKeyboard()

      expect(keyboard._layout[0][0].labels).toEqual(['esc'])
      expect(keyboard._layout[2][13].labels).toEqual(['Enter'])
      expect(keyboard._layout[5][4].labels).toEqual(['space'])
    })
  })

  describe('buildSlots', () => {
    it('_layout と同じ行・列数の Slot[][] が生成される', () => {
      const keyboard = new JisKeyboard()
      const slots = keyboard.buildSlots()

      expect(slots.length).toBe(keyboard._layout.length)
      slots.forEach((row, i) => {
        expect(row.length).toBe(keyboard._layout[i].length)
      })
    })

    it('各 Slot の bounds は Cap の bounds と一致する', () => {
      const keyboard = new JisKeyboard()
      const slots = keyboard.buildSlots()

      const enterSlot = slots[2][13]
      expect(enterSlot.width).toBe(6)
      expect(enterSlot.height).toBe(2)
      expect(enterSlot.colStart).toBe(-7)

      const f2Slot = slots[0][2]
      expect(f2Slot.width).toBe(4)
      expect(f2Slot.height).toBe(1)
      expect(f2Slot.colStart).toBeNull()
    })

    it('fixed なキーは Slot に cap がセットされる', () => {
      const keyboard = new JisKeyboard()
      const slots = keyboard.buildSlots()

      const ctrlSlot = slots[5][0]
      expect(ctrlSlot.cap).toBeDefined()
      expect(ctrlSlot.cap?.labels).toEqual(['ctrl'])
    })

    it('fixed でないキーは Slot に cap がセットされない', () => {
      const keyboard = new JisKeyboard()
      const slots = keyboard.buildSlots()

      const escSlot = slots[0][0]
      expect(escSlot.cap).toBeNull()

      const spaceSlot = slots[5][4]
      expect(spaceSlot.cap).toBeNull()
    })
  })

  describe('shuffleCaps', () => {
    it('fixed なキーを除いた全キャップ数を返す', () => {
      const keyboard = new JisKeyboard()
      const totalCaps = keyboard._layout.flat().length
      const fixedCaps = keyboard._layout.flat().filter((c) => c.fixed).length

      const caps = keyboard.shuffleCaps()

      expect(caps.length).toBe(totalCaps - fixedCaps)
    })

    it('fixed なキーが含まれない', () => {
      const keyboard = new JisKeyboard()
      const caps = keyboard.shuffleCaps()

      expect(caps.every((c) => !c.fixed)).toBe(true)
    })

    it('元の _layout を変更しない', () => {
      const keyboard = new JisKeyboard()
      const before = keyboard._layout.flat().length

      keyboard.shuffleCaps()

      expect(keyboard._layout.flat().length).toBe(before)
    })
  })

  describe('equals', () => {
    it('同じ labels の構造であれば true', () => {
      const keyboard = new JisKeyboard()
      const other = new JisKeyboard()

      expect(keyboard.equals(other._layout)).toBe(true)
    })

    it('labels が異なれば false', () => {
      const keyboard = new JisKeyboard()
      const other = new JisKeyboard()
      other._layout[0][0] = new Cap({ labels: ['ESC_CHANGED'] })

      expect(keyboard.equals(other._layout)).toBe(false)
    })
  })
})
