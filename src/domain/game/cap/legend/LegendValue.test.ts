import { describe, it, expect } from "vitest";

import { LegendValue } from "./LegendValue";

describe("LegendValue", () => {
  describe("constructor / getters", () => {
    describe("ラベルが1つの場合", () => {
      it("設定できること", () => {
        const val: string[] = ["Q"];
        const cap = new LegendValue(val);

        expect(cap.val).toEqual(val);
      });
    });

    describe("ラベルが4つの場合", () => {
      it("設定できること", () => {
        const val: string[] = ["", "", "Q", "た"];
        const cap = new LegendValue(val);

        expect(cap.val).toEqual(val);
      });
    });

    describe("ラベル数がそれ以外の場合", () => {
      it("エラーを返すこと", () => {
        expect(() => new LegendValue(["", "Q", "た"])).toThrow();
      });
    });
  });

  describe("equals", () => {
    const val = ["", "", "Q", "た"];

    describe("val が同じ場合", () => {
      it("true を返すこと", () => {
        expect(new LegendValue(val).equals(new LegendValue(val))).toBe(true);
      });
    });

    describe("val が異なる場合", () => {
      it("false を返すこと", () => {
        const other_val = ["W"];
        expect(new LegendValue(val).equals(new LegendValue(other_val))).toBe(
          false,
        );
      });
    });

    describe("val の順序が異なる場合", () => {
      it("false を返すこと", () => {
        expect(
          new LegendValue(val).equals(new LegendValue(val.toReversed())),
        ).toBe(false);
      });
    });
  });
});
