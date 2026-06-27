import { describe, expect, it } from "vitest";

import { SizeValue } from "../../domain/game/size/SizeValue";
import { PositionValue } from "../../domain/game/position/PositionValue";
import { toGridStyle } from "./gridStyle";

describe("toGridStyle", () => {
  describe("position を渡さないとき", () => {
    it("gridColumnEnd と gridRowEnd のみ返すこと", () => {
      expect(toGridStyle(new SizeValue({ width: 2, height: 3 }))).toEqual({
        gridColumnEnd: "span 2",
        gridRowEnd: "span 3",
      });
    });
  });

  describe("position を渡すとき", () => {
    it("colStart があるとき、gridColumnStart が含まれること", () => {
      expect(
        toGridStyle(
          new SizeValue({ width: 1, height: 1 }),
          new PositionValue({ colStart: 3 }),
        ),
      ).toEqual({
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        gridColumnStart: 3,
      });
    });

    it("rowStart があるとき、gridRowStart が含まれること", () => {
      expect(
        toGridStyle(
          new SizeValue({ width: 1, height: 1 }),
          new PositionValue({ rowStart: 2 }),
        ),
      ).toEqual({
        gridColumnEnd: "span 1",
        gridRowEnd: "span 1",
        gridRowStart: 2,
      });
    });

    it("colStart と rowStart の両方があるとき、両方が含まれること", () => {
      expect(
        toGridStyle(
          new SizeValue({ width: 2, height: 3 }),
          new PositionValue({ colStart: 4, rowStart: 5 }),
        ),
      ).toEqual({
        gridColumnEnd: "span 2",
        gridRowEnd: "span 3",
        gridColumnStart: 4,
        gridRowStart: 5,
      });
    });
  });
});
