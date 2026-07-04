import { describe, it, expect } from "vitest";

import { SizeValue } from "./SizeValue";

describe("SizeValue", () => {
  describe("constructor / getters", () => {
    const sizeParams = { height: 1, width: 2 };

    describe("値を指定する場合", () => {
      it("指定した値を設定すること", () => {
        const sizeParams = { height: 3, width: 2 };
        const size = new SizeValue(sizeParams);

        expect(size.height).toBe(sizeParams.height);
        expect(size.width).toBe(sizeParams.width);
      });
    });

    describe("height に0以下の数字を指定する場合", () => {
      it("エラーを返すこと", () => {
        expect(() => new SizeValue({ ...sizeParams, height: 0 })).toThrow();
      });
    });

    describe("width に0以下の数字を指定する場合", () => {
      it("エラーを返すこと", () => {
        expect(() => new SizeValue({ ...sizeParams, width: 0 })).toThrow();
      });
    });
  });

  describe("equals", () => {
    const sizeParams = { height: 3, width: 2 };

    it("legend/height/width が同じなら true を返す", () => {
      expect(new SizeValue(sizeParams).equals(new SizeValue(sizeParams))).toBe(
        true,
      );
    });

    it("height が異なれば false を返す", () => {
      const other_params = { ...sizeParams, height: sizeParams.height + 1 };
      expect(
        new SizeValue(sizeParams).equals(new SizeValue(other_params)),
      ).toBe(false);
    });

    it("width が異なれば false を返す", () => {
      const other_params = { ...sizeParams, width: sizeParams.width + 1 };
      expect(
        new SizeValue(sizeParams).equals(new SizeValue(other_params)),
      ).toBe(false);
    });
  });
});
