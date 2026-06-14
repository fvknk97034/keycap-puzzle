import { Cap } from '../cap/cap'
import { Slot } from '../slot/slot'
import type { IKeyboard } from './interface/ikeyboard'
import type { CapProps } from '../cap/interface/capProps'

export class JisKeyboard implements IKeyboard {
  _data: CapProps[][] = [
    [
      { labels: ['esc'], colStart: 1 },
      { labels: ['F1'], colStart: 4 * 1 + 4 + 1 },
      { labels: ['F2'] },
      { labels: ['F3'] },
      { labels: ['F4'] },
      { labels: ['F5'], colStart: 4 * 5 + 4 + 2 * 1 + 1 },
      { labels: ['F6'] },
      { labels: ['F7'] },
      { labels: ['F8'] },
      { labels: ['F9'], colStart: 4 * 9 + 4 + 2 * 2 + 1 },
      { labels: ['F10'] },
      { labels: ['F11'] },
      { labels: ['F12'] }
    ],
    [
      { labels: ['半角\n全角'], colStart: 1 },
      { labels: ['!', '', '1', 'ぬ'] },
      { labels: ['"', '', '2', 'ふ'] },
      { labels: ['#', 'ぁ', '3', 'あ'] },
      { labels: ['$', 'ぃ', '4', 'う'] },
      { labels: ['%', 'ぇ', '5', 'え'] },
      { labels: ['&', 'ぉ', '6', 'お'] },
      { labels: ['\'', 'ゃ', '7', 'や'] },
      { labels: ['(', 'ゅ', '8', 'ゆ'] },
      { labels: [')', 'ょ', '9', 'よ'] },
      { labels: ['', 'を', '0', 'わ'] },
      { labels: ['=', '', '-', 'ほ'] },
      { labels: ['~', '', '^', 'へ'] },
      { labels: ['|', '', '¥', 'ー'] },
      { labels: ['back\nspace'] },
    ],
    [
      { labels: ['tab'], width: 5, colStart: 1 },
      { labels: ['', '', 'Q', 'た'] },
      { labels: ['', '', 'W', 'て'] },
      { labels: ['', 'ぃ', 'E', 'い'] },
      { labels: ['', '', 'R', 'す'] },
      { labels: ['', '', 'T', 'か'] },
      { labels: ['', '', 'Y', 'ん'] },
      { labels: ['', '', 'U', 'な'] },
      { labels: ['', '', 'I', 'に'] },
      { labels: ['', '', 'O', 'ら'] },
      { labels: ['', '', 'P', 'せ'] },
      { labels: ['`', '', '@', '゛'] },
      { labels: ['{', '「', '[', '゜'] },
      { labels: ['Enter'], width: 6, height: 2, colStart: -7 },
    ],
    [
      { labels: ['caps lock'], width: 6, colStart: 1 },
      { labels: ['', '', 'A', 'ち'] },
      { labels: ['', '', 'S', 'と'] },
      { labels: ['', '', 'D', 'し'] },
      { labels: ['', '', 'F', 'は'] },
      { labels: ['', '', 'G', 'き'] },
      { labels: ['', '', 'H', 'く'] },
      { labels: ['', '', 'J', 'ま'] },
      { labels: ['', '', 'K', 'の'] },
      { labels: ['', '', 'L', 'り'] },
      { labels: ['+', '', ';', 'れ'] },
      { labels: ['*', '', ':', 'け'] },
      { labels: ['}', '」', ']', 'む'] },
    ],
    [
      { labels: ['shift'], width: 8, colStart: 1 },
      { labels: ['', 'っ', 'Z', 'つ'] },
      { labels: ['', '', 'X', 'さ'] },
      { labels: ['', '', 'C', 'そ'] },
      { labels: ['', '', 'V', 'ひ'] },
      { labels: ['', '', 'B', 'こ'] },
      { labels: ['', '', 'N', 'み'] },
      { labels: ['', '', 'M', 'も'] },
      { labels: ['<', '、', ',', 'ね'] },
      { labels: ['>', '。', '.', 'る'] },
      { labels: ['?', '・', '/', 'め'] },
      { labels: ['_', '', '', 'ろ'] },
      { labels: ['shift'], width: 8 },
    ],
    [
      { labels: ['ctrl'], width: 5, colStart: 1, fixed: true },
      { labels: ['Win'], width: 4, fixed: true },
      { labels: ['alt'], width: 5, fixed: true },
      { labels: ['無変換'], width: 5, fixed: true },
      { labels: ['space'], width: 16 },
      { labels: ['変換'], width: 5, fixed: true },
      { labels: ['カタカナ\nひらがな\nローマ字'], width: 5, fixed: true },
      { labels: ['fn'], width: 5, fixed: true },
      { labels: ['≣'], width: 5, fixed: true },
      { labels: ['ctrl'], width: 5, fixed: true }
    ]
  ]
  _layout: Cap[][]

  constructor() {
    this._layout = this._data.map(
      (row) => row.map(
        (params) => new Cap(params)
      )
    )
  }

  equals(other: Cap[][]): boolean {
    return this._layout.every(
      (row: Cap[], i: number) => row.every(
        (answer: Cap, j: number) => answer.equals(other[i][j])
      )
    )
  }

  buildSlots(): Slot[][] {
    return this._layout.map(
      (row: Cap[]): Slot[] => row.map(
        (cap: Cap): Slot => new Slot({ ...cap.bounds, ...(cap.fixed ? { cap: cap } : {}) })
      )
    )
  }

  shuffleCaps(): Cap[] {
    const results = this._layout.flat().filter((c: Cap) => !c.fixed)
    for (let i = 0; i < results.length; i++) {
      const rand = Math.floor(Math.random() * (i + 1));

      [results[i], results[rand]] = [results[rand], results[i]]
    }
    return results
  }
}
