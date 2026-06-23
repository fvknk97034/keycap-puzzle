import type { PositionValueProps } from "./PositionValueProps.types";

export class PositionValue {
  private readonly _colStart: number | null;
  private readonly _rowStart: number | null;

  get colStart() {
    return this._colStart;
  }

  get rowStart() {
    return this._rowStart;
  }

  constructor({ colStart = null, rowStart = null }: PositionValueProps) {
    this._colStart = colStart;
    this._rowStart = rowStart;
  }

  equals(other: PositionValue) {
    return this.colStart == other.colStart && this.rowStart == other.rowStart;
  }
}
