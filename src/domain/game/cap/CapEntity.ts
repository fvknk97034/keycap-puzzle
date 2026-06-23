import { LegendValue } from "./legend/LegendValue";
import { SizeValue } from "../size/SizeValue";

import type { CapEntityProps } from "./CapEntityProps.types";

export class CapEntity {
  private readonly _legend: LegendValue;
  private readonly _size: SizeValue;

  get legend() {
    return this._legend;
  }

  get size() {
    return this._size;
  }

  constructor({ legend, height, width }: CapEntityProps) {
    this._legend = new LegendValue(legend);
    this._size = new SizeValue({ height: height, width: width });
  }

  equals(other: CapEntity) {
    return this.legend.equals(other.legend) && this.size.equals(other.size);
  }

  isSingleFunction() {
    return this.legend.val.length == 1;
  }
}
