import type { IKeyboardEntity } from "./IKeyboardEntity";

import { CapEntity } from "../cap/CapEntity";

import { SlotEntity } from "../slot/SlotEntity";

interface Props {
  isCorrect?: boolean;
}

interface SizeParams {
  width: number;
  height: number;
}

interface KeyParams {
  legend: string[];
  height?: number;
  width?: number;
  colStart?: number;
  fixed?: boolean;
}

export class JisKeyboardEntity implements IKeyboardEntity {
  static KEYBOARD_TYPE = "JIS";
  private static readonly DEFAULT_SIZE: SizeParams = { width: 4, height: 1 };

  private readonly _DATA: KeyParams[][] = [
    [
      { legend: ["esc"], colStart: 1 },
      {
        legend: ["F1"],
        colStart:
          JisKeyboardEntity.DEFAULT_SIZE.width * 1 +
          JisKeyboardEntity.DEFAULT_SIZE.width +
          1,
      },
      { legend: ["F2"] },
      { legend: ["F3"] },
      { legend: ["F4"] },
      {
        legend: ["F5"],
        colStart:
          JisKeyboardEntity.DEFAULT_SIZE.width * 5 +
          JisKeyboardEntity.DEFAULT_SIZE.width +
          (JisKeyboardEntity.DEFAULT_SIZE.width / 2) * 1 +
          1,
      },
      { legend: ["F6"] },
      { legend: ["F7"] },
      { legend: ["F8"] },
      {
        legend: ["F9"],
        colStart:
          JisKeyboardEntity.DEFAULT_SIZE.width * 9 +
          JisKeyboardEntity.DEFAULT_SIZE.width +
          (JisKeyboardEntity.DEFAULT_SIZE.width / 2) * 2 +
          1,
      },
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
      {
        legend: ["tab"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        colStart: 1,
      },
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
      {
        legend: ["Enter"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.5,
        height: 2,
        colStart: -7,
      },
    ],
    [
      {
        legend: ["caps lock"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.5,
        colStart: 1,
      },
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
      {
        legend: ["shift"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 2,
        colStart: 1,
      },
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
      { legend: ["_", "", "\\", "ろ"] },
      { legend: ["shift"], width: JisKeyboardEntity.DEFAULT_SIZE.width * 2 },
    ],
    [
      {
        legend: ["ctrl"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        colStart: 1,
        fixed: true,
      },
      {
        legend: ["Win"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width,
        fixed: true,
      },
      {
        legend: ["alt"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      {
        legend: ["無変換"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      { legend: ["space"], width: JisKeyboardEntity.DEFAULT_SIZE.width * 4 },
      {
        legend: ["変換"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      {
        legend: ["カタカナ\nひらがな\nローマ字"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      {
        legend: ["fn"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      {
        legend: ["≣"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
      {
        legend: ["ctrl"],
        width: JisKeyboardEntity.DEFAULT_SIZE.width * 1.25,
        fixed: true,
      },
    ],
  ];
  private readonly _slots: SlotEntity[][];

  get slots() {
    return this._slots;
  }

  private get data() {
    return this._DATA;
  }

  constructor({ isCorrect = false }: Props) {
    this._slots = this.data.map((row) =>
      row.map((params) => {
        const mergedParams = { ...JisKeyboardEntity.DEFAULT_SIZE, ...params };

        return mergedParams?.fixed
          ? new SlotEntity({
              ...mergedParams,
              cap: new CapEntity(mergedParams),
            })
          : new SlotEntity(mergedParams);
      }),
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
      .map((params) => {
        const mergedParams = { ...JisKeyboardEntity.DEFAULT_SIZE, ...params };

        return new CapEntity(mergedParams);
      });

    for (let i = 0; i < results.length; i++) {
      const rand = Math.floor(Math.random() * (i + 1));
      [results[i], results[rand]] = [results[rand], results[i]];
    }

    return results;
  }

  private filledCorrect(): SlotEntity[][] {
    return this.data.map((row) =>
      row.map((params) => {
        const mergedParams = { ...JisKeyboardEntity.DEFAULT_SIZE, ...params };

        return new SlotEntity({
          ...mergedParams,
          cap: new CapEntity(mergedParams),
        });
      }),
    );
  }
}
