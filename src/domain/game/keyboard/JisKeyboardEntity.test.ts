import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { JisKeyboardEntity } from "./JisKeyboardEntity";
import type { IKeyboardEntity } from "./IKeyboardEntity";

import { CapEntity } from "../cap/CapEntity";
import { SlotEntity } from "../slot/SlotEntity";
import type { CapEntityProps } from "../cap/CapEntityProps.types";
import type { SlotEntityProps } from "../slot/SlotEntityProps.types";

interface ParamProps extends CapEntityProps, SlotEntityProps {}

const STUB_DATA: ParamProps[][] = [
  [
    {
      legend: ["Q", "た", "", ""],
      height: 2,
      width: 3,
      colStart: 4,
      rowStart: 5,
      fixed: false,
    },
    { legend: ["esc"] },
  ],
  [
    {
      legend: ["win"],
      height: 2,
      width: 1,
      colStart: 3,
      rowStart: 4,
      fixed: true,
    },
    { legend: ["ctrl"], fixed: true },
    { legend: ["space"], fixed: false },
  ],
];

beforeEach(() => {
  vi.spyOn(JisKeyboardEntity.prototype as any, "data", "get").mockReturnValue(
    STUB_DATA,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("JisKeyboardEntity", () => {
  describe("constructor / getters", () => {
    describe("値を指定しない場合", () => {
      it("_DATA と同じ構造の SlotEntity[][] が生成されること", () => {
        const keyboard = new JisKeyboardEntity({});

        expect(keyboard.slots.length).toBe(STUB_DATA.length);
        expect(keyboard.slots[0][0].cap).toBeNull();
        expect(keyboard.slots[0][1].cap).toBeNull();
        expect(keyboard.slots[1][0].cap).toEqual(
          new CapEntity({ legend: ["win"], height: 2, width: 1 }),
        );
        expect(keyboard.slots[1][1].cap).toEqual(
          new CapEntity({ legend: ["ctrl"] }),
        );
        expect(keyboard.slots[1][2].cap).toBeNull();
      });
    });

    describe("isCorrect を true に指定する場合", () => {
      it("slot に cap が入った SlotEntity[][] が生成されること", () => {
        const keyboard = new JisKeyboardEntity({ isCorrect: true });

        expect(keyboard.slots.length).toBe(STUB_DATA.length);
        expect(keyboard.slots[0][0].cap).toEqual(
          new CapEntity({ legend: ["Q", "た", "", ""], height: 2, width: 3 }),
        );
        expect(keyboard.slots[0][1].cap).toEqual(
          new CapEntity({ legend: ["esc"] }),
        );
        expect(keyboard.slots[1][0].cap).toEqual(
          new CapEntity({ legend: ["win"], height: 2, width: 1 }),
        );
        expect(keyboard.slots[1][1].cap).toEqual(
          new CapEntity({ legend: ["ctrl"] }),
        );
        expect(keyboard.slots[1][2].cap).toEqual(
          new CapEntity({ legend: ["space"] }),
        );
      });
    });
  });

  describe("equals", () => {
    const keyboard: IKeyboardEntity = new JisKeyboardEntity({});
    const other: IKeyboardEntity = new JisKeyboardEntity({});

    describe("同じデータ・構造になっている場合", () => {
      it("true を返すこと", () => {
        expect(keyboard.equals(other)).toBe(true);
      });
    });

    describe("異なるデータ・構造になっている場合", () => {
      it("false を返すこと", () => {
        other.slots[0][0] = new SlotEntity({
          cap: new CapEntity({ legend: ["invalid_key"] }),
        });

        expect(keyboard.equals(other)).toBe(false);
      });
    });
  });

  describe("shuffleCaps", () => {
    const keyboard = new JisKeyboardEntity({});

    it("fixed なキーを除いた全キャップを返すこと", () => {
      const caps = keyboard.shuffleCaps();
      const nonFixedCaps = [
        new CapEntity({ legend: ["Q", "た", "", ""], height: 2, width: 3 }),
        new CapEntity({ legend: ["esc"] }),
        new CapEntity({ legend: ["space"] }),
      ];

      expect(caps.length).toBe(nonFixedCaps.length);
      expect(new Set(caps)).toEqual(new Set(nonFixedCaps));
    });
  });
});
