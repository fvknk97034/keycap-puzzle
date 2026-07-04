import type { SizeValueProps } from "./SizeValueProps.types";

export class SizeValue {
  private readonly _height: number;
  private readonly _width: number;

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  constructor({ height, width }: SizeValueProps) {
    if (height <= 0 || width <= 0) throw new Error();

    this._height = height;
    this._width = width;
  }

  equals(other: SizeValue) {
    return this.height == other.height && this.width == other.width;
  }
}
