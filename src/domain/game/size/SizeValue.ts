import type { SizeValueProps } from "./SizeValueProps.types";

export class SizeValue {
  _height: number;
  _width: number;

  static BASE_HEIGHT: number = 1;
  static BASE_WIDTH: number = 4;

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  constructor({
    height = SizeValue.BASE_HEIGHT,
    width = SizeValue.BASE_WIDTH,
  }: SizeValueProps) {
    if (height <= 0 || width <= 0) throw new Error();

    this._height = height;
    this._width = width;
  }

  equals(other: SizeValue) {
    return this.height == other.height && this.width == other.width;
  }
}
