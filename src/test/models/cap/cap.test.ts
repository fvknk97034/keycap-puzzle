import { describe, it, expect } from 'vitest'
import { Cap } from '../../../models/cap/cap'

describe('Cap', () => {
  describe('constructor / getters', () => {
    it('デフォルト値が設定される', () => {
      const cap = new Cap({ labels: ['Q'] })

      expect(cap.labels).toEqual(['Q'])
      expect(cap.width).toBe(4)
      expect(cap.height).toBe(1)
      expect(cap.colStart).toBeNull()
      expect(cap.fixed).toBe(false)
    })

    it('指定した値が設定される', () => {
      const cap = new Cap({ labels: ['Enter'], width: 6, height: 2, colStart: -7, fixed: true })

      expect(cap.labels).toEqual(['Enter'])
      expect(cap.width).toBe(6)
      expect(cap.height).toBe(2)
      expect(cap.colStart).toBe(-7)
      expect(cap.fixed).toBe(true)
    })
  })

  describe('trayGrid', () => {
    it('width/height から gridColumnEnd/gridRowEnd を生成する', () => {
      const cap = new Cap({ labels: ['space'], width: 16, height: 1 })

      expect(cap.trayGrid).toEqual({
        gridColumnEnd: 'span 16',
        gridRowEnd: 'span 1',
      })
    })
  })

  describe('grid', () => {
    it('colStart が null の場合、trayGrid のみを返す', () => {
      const cap = new Cap({ labels: ['Q'] })

      expect(cap.grid).toEqual({
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 1',
      })
    })

    it('colStart が指定されている場合、gridColumnStart を含む', () => {
      const cap = new Cap({ labels: ['esc'], colStart: 1 })

      expect(cap.grid).toEqual({
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 1',
        gridColumnStart: '1',
      })
    })

    it('colStart が負数の場合も gridColumnStart に反映される', () => {
      const cap = new Cap({ labels: ['Enter'], width: 6, height: 2, colStart: -7 })

      expect(cap.grid).toEqual({
        gridColumnEnd: 'span 6',
        gridRowEnd: 'span 2',
        gridColumnStart: '-7',
      })
    })

    it('colStart が0の場合、gridColumnStart は含まれない', () => {
      const cap = new Cap({ labels: ['Q'], colStart: 0 })

      expect(cap.grid).toEqual({
        gridColumnEnd: 'span 4',
        gridRowEnd: 'span 1',
      })
    })
  })

  describe('bounds', () => {
    it('width/height/colStart を返す', () => {
      const cap = new Cap({ labels: ['tab'], width: 5, height: 1, colStart: 1 })

      expect(cap.bounds).toEqual({
        width: 5,
        height: 1,
        colStart: 1,
      })
    })
  })

  describe('equals', () => {
    it('labels が同じなら true を返す', () => {
      const a = new Cap({ labels: ['', '', 'Q', 'た'] })
      const b = new Cap({ labels: ['', '', 'Q', 'た'], width: 1, colStart: 5 })

      expect(a.equals(b)).toBe(true)
    })

    it('labels が異なれば false を返す', () => {
      const a = new Cap({ labels: ['Q'] })
      const b = new Cap({ labels: ['W'] })

      expect(a.equals(b)).toBe(false)
    })

    it('labels の順序が異なれば false を返す', () => {
      const a = new Cap({ labels: ['1', '2'] })
      const b = new Cap({ labels: ['2', '1'] })

      expect(a.equals(b)).toBe(false)
    })
  })

  describe('isSingleFunction', () => {
    it('labels が1要素の場合 true', () => {
      const cap = new Cap({ labels: ['esc'] })
      expect(cap.isSingleFunction()).toBe(true)
    })

    it('labels が複数要素の場合 false', () => {
      const cap = new Cap({ labels: ['!', '', '1', 'ぬ'] })
      expect(cap.isSingleFunction()).toBe(false)
    })
  })
})
