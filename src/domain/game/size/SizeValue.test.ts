import { describe, it, expect } from "vitest";

import { SizeValue } from "./SizeValue";

describe("SizeValue", () => {
  describe("constructor / getters", () => {
    describe("値を指定する場合", () => {
      it("指定した値を設定すること", () => {
        const params = { height: 3, width: 2 };
        const size = new SizeValue(params);

        expect(size.height).toBe(params.height);
        expect(size.width).toBe(params.width);
      });
    });

    describe("値を指定しない場合", () => {
      it("デフォルト値を設定すること", () => {
        const size = new SizeValue({});

        expect(size.width).toBe(SizeValue.BASE_WIDTH);
        expect(size.height).toBe(SizeValue.BASE_HEIGHT);
      });
    });

    describe("height に0以下の数字を指定する場合", () => {
      it("エラーを返すこと", () => {
        expect(() => new SizeValue({ height: 0 })).toThrow();
      });
    });

    describe("width に0以下の数字を指定する場合", () => {
      it("エラーを返すこと", () => {
        expect(() => new SizeValue({ width: 0 })).toThrow();
      });
    });
  });

  describe("equals", () => {
    const params = { height: 3, width: 2 };

    it("legend/height/width が同じなら true を返す", () => {
      expect(new SizeValue(params).equals(new SizeValue(params))).toBe(true);
    });

    it("height が異なれば false を返す", () => {
      const other_params = { ...params, height: params.height + 1 };
      expect(new SizeValue(params).equals(new SizeValue(other_params))).toBe(
        false,
      );
    });

    it("width が異なれば false を返す", () => {
      const other_params = { ...params, width: params.width + 1 };
      expect(new SizeValue(params).equals(new SizeValue(other_params))).toBe(
        false,
      );
    });
  });
});
