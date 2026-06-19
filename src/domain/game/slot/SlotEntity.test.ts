import { describe, it, expect } from "vitest";

import { SlotEntity } from "./SlotEntity";

import { SizeValue } from "../size/SizeValue";
import { PositionValue } from "../position/PositionValue";
import { CapEntity } from "../cap/CapEntity";

describe("SlotEntity", () => {
  describe("constructor / getters", () => {
    const cap = new CapEntity({ legend: ["Q", "た", "", ""] });

    describe("値を指定する場合", () => {
      it("指定した値を設定すること", () => {
        const size = { height: 6, width: 2 };
        const position = { colStart: 3 };
        const slot = new SlotEntity({
          cap: cap,
          fixed: true,
          ...size,
          ...position,
        });

        expect(slot.size).toEqual(new SizeValue(size));
        expect(slot.position).toEqual(new PositionValue(position));
        expect(slot.cap).toBe(cap);
        expect(slot.fixed).toBe(true);
      });
    });

    describe("値を指定しない場合", () => {
      it("デフォルト値を設定すること", () => {
        const slot = new SlotEntity({});

        expect(slot.size).toEqual(
          new SizeValue({
            height: SizeValue.BASE_HEIGHT,
            width: SizeValue.BASE_WIDTH,
          }),
        );
        expect(slot.position).toEqual(new PositionValue({}));
        expect(slot.cap).toBeNull();
        expect(slot.fixed).toBe(false);
      });
    });
  });

  describe("equals", () => {
    const bounds = { height: 1, width: 2 };
    const cap = new CapEntity({ legend: ["Q", "た", "", ""] });

    it("cap/height/width が同じなら true を返す", () => {
      expect(
        new SlotEntity({ cap: cap, ...bounds }).equals(
          new SlotEntity({ cap: cap, ...bounds }),
        ),
      ).toBe(true);
    });

    it("cap が null 同士であれば true を返す", () => {
      expect(new SlotEntity({}).equals(new SlotEntity({}))).toBe(true);
    });

    it("比較対象の cap だけ null であれば false を返す", () => {
      expect(new SlotEntity({ cap: cap }).equals(new SlotEntity({}))).toBe(
        false,
      );
    });

    it("自身の cap だけ null であれば false を返す", () => {
      expect(new SlotEntity({}).equals(new SlotEntity({ cap: cap }))).toBe(
        false,
      );
    });

    it("cap が異なれば false を返す", () => {
      const other_cap = new CapEntity({ legend: ["changed", "た", "", ""] });
      expect(
        new SlotEntity({ cap: cap }).equals(new SlotEntity({ cap: other_cap })),
      ).toBe(false);
    });

    it("cap の順序が異なれば false を返す", () => {
      const other_cap = new CapEntity({ legend: cap.legend.val.toReversed() });
      expect(
        new SlotEntity({ cap: cap }).equals(new SlotEntity({ cap: other_cap })),
      ).toBe(false);
    });

    it("height が異なれば false を返す", () => {
      const other_bounds = { ...bounds, height: bounds.height + 1 };
      expect(
        new SlotEntity({ cap: cap }).equals(
          new SlotEntity({ cap: cap, ...other_bounds }),
        ),
      ).toBe(false);
    });

    it("width が異なれば false を返す", () => {
      const other_bounds = { ...bounds, width: bounds.width + 1 };
      expect(
        new SlotEntity({ cap: cap }).equals(
          new SlotEntity({ cap: cap, ...other_bounds }),
        ),
      ).toBe(false);
    });
  });

  describe("canSet", () => {
    const size = { width: 1, height: 2 };
    const cap = new CapEntity({ legend: ["Q"], ...size });

    describe("height と width が同じ場合", () => {
      it("true を返すこと", () => {
        const slot = new SlotEntity({ ...size, colStart: 5 });

        expect(slot.canSet(cap)).toBe(true);
      });
    });

    describe("height が異なる場合", () => {
      it("false を返すこと", () => {
        const slot = new SlotEntity({ ...size, height: size.height + 1 });

        expect(slot.canSet(cap)).toBe(false);
      });
    });

    describe("width が異なる場合", () => {
      it("false を返すこと", () => {
        const slot = new SlotEntity({ ...size, width: size.width + 1 });

        expect(slot.canSet(cap)).toBe(false);
      });
    });
  });
});
