import { describe, it, expect } from 'vitest'
import { Game } from '../../models/game'

describe('Game', () => {
  describe('constructor', () => {
    it('初期状態では tray と slots が JisKeyboard から生成される', () => {
      const game = new Game()

      expect(game.tray.length).toBeGreaterThan(0)
      expect(game.slots.length).toBeGreaterThan(0)
    })

    it('tray/slots を渡した場合はそれを使う', () => {
      const game1 = new Game()
      const game2 = new Game(game1.tray, game1.slots)

      expect(game2.tray).toBe(game1.tray)
      expect(game2.slots).toBe(game1.slots)
    })
  })

  describe('updateSlot', () => {
    it('cap を渡すと tray から取り除かれ、slot に設定される', () => {
      const game = new Game()
      const cap = game.tray[0]
      const slot = game.slots.flat().find((s) => s.canSet(cap) && !s.cap)!

      const newGame = game.updateSlot(slot, cap)

      expect(newGame.tray).not.toContain(cap)
      const updatedSlot = newGame.slots.flat()[game.slots.flat().indexOf(slot)]
      expect(updatedSlot.cap).toBe(cap)
    })

    it('null を渡すと slot の cap が tray に戻る', () => {
      const game = new Game()
      const cap = game.tray[0]
      const slot = game.slots.flat().find((s) => s.canSet(cap) && !s.cap)!
      const index = game.slots.flat().indexOf(slot)

      const filledGame = game.updateSlot(slot, cap)
      const filledSlot = filledGame.slots.flat()[index]

      const restoredGame = filledGame.updateSlot(filledSlot, null)
      const restoredSlot = restoredGame.slots.flat()[index]

      expect(restoredGame.tray).toContain(cap)
      expect(restoredSlot.cap).toBeNull()
    })

    it('元の Game インスタンスは変更されない(イミュータブル)', () => {
      const game = new Game()
      const trayLengthBefore = game.tray.length
      const cap = game.tray[0]
      const slot = game.slots.flat().find((s) => s.canSet(cap) && !s.cap)!

      game.updateSlot(slot, cap)

      expect(game.tray.length).toBe(trayLengthBefore)
    })
  })

  describe('isCompleted', () => {
    it('tray が空でない場合は false', () => {
      const game = new Game()

      expect(game.tray.length).not.toBe(0)
      expect(game.isCompleted()).toBe(false)
    })

    it('tray が空かつ全スロットが正解と一致する場合は true', () => {
      let game = new Game()

      // 正解通りに全キャップを配置する
      const answer = game.keyboard._layout.flat()
      for (const cap of answer) {
        if (cap.fixed) continue
        const slot = game.slots.flat().find((s) => !s.cap && s.canSet(cap))!
        game = game.updateSlot(slot, cap)
      }

      expect(game.tray.length).toBe(0)
      expect(game.isCompleted()).toBe(true)
    })

    it('tray が空でも、正解と異なる配置なら false', () => {
      let game = new Game()

      const fixedAnswers = game.keyboard._layout.flat().filter((c) => !c.fixed)
      for (const cap of fixedAnswers) {
        const slot = game.slots.flat().find((s) => !s.cap && s.canSet(cap))!
        game = game.updateSlot(slot, cap)
      }
      // この時点でisCompleted()はtrueのはず
      expect(game.isCompleted()).toBe(true)

      const filledSlots = game.slots.flat().filter((s) => !s.fixed && s.cap)
      const a = filledSlots[0]
      const b = filledSlots.find((s) => s !== a && s.canSet(a.cap!))!
      const indexA = game.slots.flat().indexOf(a)
      const indexB = game.slots.flat().indexOf(b)
      const capA = a.cap!
      const capB = b.cap!

      game = game.updateSlot(a, null)
      game = game.updateSlot(game.slots.flat()[indexB], null)
      game = game.updateSlot(game.slots.flat()[indexA], capB)
      game = game.updateSlot(game.slots.flat()[indexB], capA)

      expect(game.tray.length).toBe(0)
      expect(game.isCompleted()).toBe(false)
    })
  })
})
