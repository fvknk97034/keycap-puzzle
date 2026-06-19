import type { IKeyboardEntity } from "./IKeyboardEntity";

import { CapEntity } from "../cap/CapEntity";
import type { CapEntityProps } from "../cap/CapEntityProps.types";

import { SlotEntity } from "../slot/SlotEntity";
import type { SlotEntityProps } from "../slot/SlotEntityProps.types";

interface Props {
  isCorrect?: boolean;
}
interface ParamProps extends CapEntityProps, SlotEntityProps {}

export class JisKeyboardEntity implements IKeyboardEntity {
  static KEYBOARD_TYPE = "JIS";

  private readonly _DATA: ParamProps[][] = [
    [
      { legend: ["esc"], colStart: 1 },
      { legend: ["F1"], colStart: 4 * 1 + 4 + 1 },
      { legend: ["F2"] },
      { legend: ["F3"] },
      { legend: ["F4"] },
      { legend: ["F5"], colStart: 4 * 5 + 4 + 2 * 1 + 1 },
      { legend: ["F6"] },
      { legend: ["F7"] },
      { legend: ["F8"] },
      { legend: ["F9"], colStart: 4 * 9 + 4 + 2 * 2 + 1 },
      { legend: ["F10"] },
      { legend: ["F11"] },
      { legend: ["F12"] },
    ],
    [
      { legend: ["半角\n全角"], colStart: 1 },
      { legend: ["!", "", "1", "ぬ"] },
      { legend: ['"', "", "2", "ふ"] },
      { legend: ["#", "ぁ", "3", "あ"] },
      { legend: ["$", "ぃ", "4", "う"] },
      { legend: ["%", "ぇ", "5", "え"] },
      { legend: ["&", "ぉ", "6", "お"] },
      { legend: ["'", "ゃ", "7", "や"] },
      { legend: ["(", "ゅ", "8", "ゆ"] },
      { legend: [")", "ょ", "9", "よ"] },
      { legend: ["", "を", "0", "わ"] },
      { legend: ["=", "", "-", "ほ"] },
      { legend: ["~", "", "^", "へ"] },
      { legend: ["|", "", "¥", "ー"] },
      { legend: ["back\nspace"] },
    ],
    [
      { legend: ["tab"], width: 5, colStart: 1 },
      { legend: ["", "", "Q", "た"] },
      { legend: ["", "", "W", "て"] },
      { legend: ["", "ぃ", "E", "い"] },
      { legend: ["", "", "R", "す"] },
      { legend: ["", "", "T", "か"] },
      { legend: ["", "", "Y", "ん"] },
      { legend: ["", "", "U", "な"] },
      { legend: ["", "", "I", "に"] },
      { legend: ["", "", "O", "ら"] },
      { legend: ["", "", "P", "せ"] },
      { legend: ["`", "", "@", "゛"] },
      { legend: ["{", "「", "[", "゜"] },
      { legend: ["Enter"], width: 6, height: 2, colStart: -7 },
    ],
    [
      { legend: ["caps lock"], width: 6, colStart: 1 },
      { legend: ["", "", "A", "ち"] },
      { legend: ["", "", "S", "と"] },
      { legend: ["", "", "D", "し"] },
      { legend: ["", "", "F", "は"] },
      { legend: ["", "", "G", "き"] },
      { legend: ["", "", "H", "く"] },
      { legend: ["", "", "J", "ま"] },
      { legend: ["", "", "K", "の"] },
      { legend: ["", "", "L", "り"] },
      { legend: ["+", "", ";", "れ"] },
      { legend: ["*", "", ":", "け"] },
      { legend: ["}", "」", "]", "む"] },
    ],
    [
      { legend: ["shift"], width: 8, colStart: 1 },
      { legend: ["", "っ", "Z", "つ"] },
      { legend: ["", "", "X", "さ"] },
      { legend: ["", "", "C", "そ"] },
      { legend: ["", "", "V", "ひ"] },
      { legend: ["", "", "B", "こ"] },
      { legend: ["", "", "N", "み"] },
      { legend: ["", "", "M", "も"] },
      { legend: ["<", "、", ",", "ね"] },
      { legend: [">", "。", ".", "る"] },
      { legend: ["?", "・", "/", "め"] },
      { legend: ["_", "", "", "ろ"] },
      { legend: ["shift"], width: 8 },
    ],
    [
      { legend: ["ctrl"], width: 5, colStart: 1, fixed: true },
      { legend: ["Win"], width: 4, fixed: true },
      { legend: ["alt"], width: 5, fixed: true },
      { legend: ["無変換"], width: 5, fixed: true },
      { legend: ["space"], width: 16 },
      { legend: ["変換"], width: 5, fixed: true },
      { legend: ["カタカナ\nひらがな\nローマ字"], width: 5, fixed: true },
      { legend: ["fn"], width: 5, fixed: true },
      { legend: ["≣"], width: 5, fixed: true },
      { legend: ["ctrl"], width: 5, fixed: true },
    ],
  ];
  _slots: SlotEntity[][];

  get slots() {
    return this._slots;
  }

  private get data() {
    return this._DATA;
  }

  constructor({ isCorrect = false }: Props) {
    this._slots = this.data.map((row) =>
      row.map((params) =>
        params.fixed
          ? new SlotEntity({ ...params, cap: new CapEntity(params) })
          : new SlotEntity(params),
      ),
    );

    if (isCorrect) this._slots = this.filledCorrect();
  }

  equals(other: IKeyboardEntity): boolean {
    return this.slots.every((row: SlotEntity[], i: number) =>
      row.every((slot: SlotEntity, j: number) =>
        slot.equals(other.slots[i][j]),
      ),
    );
  }

  shuffleCaps(): CapEntity[] {
    const results = this.data
      .flat()
      .filter((params) => !params.fixed)
      .map((params) => new CapEntity(params));

    for (let i = 0; i < results.length; i++) {
      const rand = Math.floor(Math.random() * (i + 1));
      [results[i], results[rand]] = [results[rand], results[i]];
    }

    return results;
  }

  private filledCorrect(): SlotEntity[][] {
    return this.data.map((row) =>
      row.map(
        (params) => new SlotEntity({ ...params, cap: new CapEntity(params) }),
      ),
    );
  }
}
