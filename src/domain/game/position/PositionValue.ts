import type { PositionValueProps } from "./PositionValueProps.types";

export class PositionValue {
  _colStart: number | null;
  _rowStart: number | null;

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
