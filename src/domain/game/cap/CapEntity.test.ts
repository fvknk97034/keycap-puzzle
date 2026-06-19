import { describe, it, expect } from "vitest";

import { CapEntity } from "./CapEntity";

import { LegendValue } from "./legend/LegendValue";
import { SizeValue } from "../size/SizeValue";

describe("CapEntity", () => {
  const legend = ["Q", "た", "", ""];

  describe("constructor / getters", () => {
    describe("値を指定する場合", () => {
      it("指定した値を設定する", () => {
        const size = { height: 2, width: 6 };
        const cap = new CapEntity({ legend: legend, ...size });

        expect(cap.legend).toEqual(new LegendValue(legend));
        expect(cap.size).toEqual(new SizeValue(size));
      });
    });

    describe("値を指定しない場合", () => {
      it("デフォルト値を設定する", () => {
        const cap = new CapEntity({ legend: legend });

        expect(cap.legend).toEqual(new LegendValue(legend));
        expect(cap.size).toEqual(new SizeValue({}));
      });
    });
  });

  describe("equals", () => {
    const bounds = { height: 1, width: 2 };

    it("legend/height/width が同じなら true を返す", () => {
      expect(
        new CapEntity({ legend: legend, ...bounds }).equals(
          new CapEntity({ legend: legend, ...bounds }),
        ),
      ).toBe(true);
    });

    it("legend が異なれば false を返す", () => {
      const other_legend = ["W"];
      expect(
        new CapEntity({ legend: legend }).equals(
          new CapEntity({ legend: other_legend }),
        ),
      ).toBe(false);
    });

    it("legend の順序が異なれば false を返す", () => {
      const other_legend = legend.toReversed();
      expect(
        new CapEntity({ legend: legend }).equals(
          new CapEntity({ legend: other_legend }),
        ),
      ).toBe(false);
    });

    it("height が異なれば false を返す", () => {
      const other_bounds = { ...bounds, height: bounds.height + 1 };
      expect(
        new CapEntity({ legend: legend }).equals(
          new CapEntity({ legend: legend, ...other_bounds }),
        ),
      ).toBe(false);
    });

    it("width が異なれば false を返す", () => {
      const other_bounds = { ...bounds, width: bounds.width + 1 };
      expect(
        new CapEntity({ legend: legend }).equals(
          new CapEntity({ legend: legend, ...other_bounds }),
        ),
      ).toBe(false);
    });
  });

  describe("isSingleFunction", () => {
    it("legend が1要素の場合 true を返す", () => {
      const legend = ["esc"];
      const cap = new CapEntity({ legend: legend });
      expect(cap.isSingleFunction()).toBe(true);
    });

    it("legend が複数要素の場合 false を返す", () => {
      const cap = new CapEntity({ legend: legend });
      expect(cap.isSingleFunction()).toBe(false);
    });
  });
});
