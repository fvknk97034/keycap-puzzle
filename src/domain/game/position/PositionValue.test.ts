import { describe, it, expect } from "vitest";

import { PositionValue } from "./PositionValue";

describe("PositionValue", () => {
  describe("constructor / getters", () => {
    describe("値を指定する場合", () => {
      it("指定した値を設定する", () => {
        const params = { colStart: 3, rowStart: 2 };
        const position = new PositionValue(params);

        expect(position.rowStart).toBe(params.rowStart);
        expect(position.colStart).toBe(params.colStart);
      });
    });

    describe("値を指定しない場合", () => {
      it("デフォルト値を設定する", () => {
        const position = new PositionValue({});

        expect(position.colStart).toBeNull();
        expect(position.rowStart).toBeNull();
      });
    });
  });

  describe("equals", () => {
    const params = { colStart: 3, rowStart: 2 };

    it("colStart/rowStart が同じなら true を返す", () => {
      expect(new PositionValue(params).equals(new PositionValue(params))).toBe(
        true,
      );
    });

    it("colStart が異なれば false を返す", () => {
      const other_params = { ...params, colStart: params.colStart + 1 };
      expect(
        new PositionValue(params).equals(new PositionValue(other_params)),
      ).toBe(false);
    });

    it("rowStart が異なれば false を返す", () => {
      const other_params = { ...params, rowStart: params.rowStart + 1 };
      expect(
        new PositionValue(params).equals(new PositionValue(other_params)),
      ).toBe(false);
    });
  });
});
