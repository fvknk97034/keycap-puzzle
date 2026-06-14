import { describe, it, expect } from 'vitest'
import { Cap } from '../../../models/cap/cap'
import { Slot } from '../../../models/slot/slot'

describe('Slot', () => {
  describe('constructor / getters', () => {
    it('指定した値が設定される', () => {
      const cap = new Cap({ labels: ['Q'] })
      const slot = new Slot({ width: 6, height: 2, colStart: -7, cap: cap, fixed: true })

      expect(slot.width).toBe(6)
      expect(slot.height).toBe(2)
      expect(slot.colStart).toBe(-7)
      expect(slot.cap).toBe(cap)
      expect(slot.fixed).toBe(true)
    })
  })

  describe('grid', () => {
    it('colStart が null の場合、gridColumnStart を含めず返す', () => {
      const slot = new Slot({ width: 4, height: 1 })

      expect(slot.grid).toEqual({
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 1',
      })
    })

    it('colStart が指定されている場合、gridColumnStart を含めて返す', () => {
      const slot = new Slot({ width: 4, height: 1, colStart: 1 })

      expect(slot.grid).toEqual({
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 1',
        gridColumnStart: '1',
      })
    })

    it('colStart が負数の場合も gridColumnStart に反映される', () => {
      const slot = new Slot({ width: 6, height: 2, colStart: -7 })

      expect(slot.grid).toEqual({
        gridColumnEnd: 'span 6',
        gridRowEnd: 'span 2',
        gridColumnStart: '-7',
      })
    })
  })

  describe('bounds', () => {
    it('width/height/colStart を返す', () => {
      const slot = new Slot({ width: 5, height: 1, colStart: 1 })

      expect(slot.bounds).toEqual({
        width: 5,
        height: 1,
        colStart: 1,
      })
    })
  })

  describe('canSet', () => {
    it('width と height が同じなら true を返す', () => {
      const bounds = { width: 1, height: 2 }
      const slot = new Slot({ ...bounds, colStart: 5 })
      const cap = new Cap({ labels: ['Q'], ...bounds })

      expect(slot.canSet(cap)).toBe(true)
    })

    it('width が異なれば false を返す', () => {
      const bounds = { width: 1, height: 2 }
      const slot = new Slot(bounds)
      const cap = new Cap({ labels: ['Q'], ...bounds, width: bounds.width + 1 })

      expect(slot.canSet(cap)).toBe(false)
    })

    it('height が異なれば false を返す', () => {
      const bounds = { width: 1, height: 2 }
      const slot = new Slot(bounds)
      const cap = new Cap({ labels: ['Q'], ...bounds, height: bounds.height + 1 })

      expect(slot.canSet(cap)).toBe(false)
    })
  })
})
