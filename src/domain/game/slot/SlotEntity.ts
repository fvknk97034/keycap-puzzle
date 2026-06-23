import type { SlotEntityProps } from "./SlotEntityProps.types";

import { CapEntity } from "../cap/CapEntity";
import { PositionValue } from "../position/PositionValue";
import { SizeValue } from "../size/SizeValue";

export class SlotEntity {
  private _cap: CapEntity | null;
  private readonly _size: SizeValue;
  private readonly _position: PositionValue;
  private readonly _fixed: boolean;

  get cap() {
    return this._cap;
  }

  get size() {
    return this._size;
  }

  get position() {
    return this._position;
  }

  get fixed() {
    return this._fixed;
  }

  set cap(cap) {
    this._cap = cap;
  }

  constructor({
    cap = null,
    height = SizeValue.BASE_HEIGHT,
    width = SizeValue.BASE_WIDTH,
    colStart = null,
    fixed = false,
  }: SlotEntityProps) {
    this._cap = cap;
    this._size = new SizeValue({ height: height, width: width });
    this._position = new PositionValue({ colStart: colStart });
    this._fixed = fixed;
  }

  equals(other: SlotEntity): boolean {
    if (this.cap == null) return other.cap == null;

    if (other.cap == null) return this.cap == null;

    return this.cap.equals(other.cap) && this.size.equals(other.size);
  }

  canSet(cap: CapEntity): boolean {
    return this.size.equals(cap.size);
  }
}
