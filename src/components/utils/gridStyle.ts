import type { CSSProperties } from "react";

import type { SizeValue } from "../../domain/game/size/SizeValue";
import type { PositionValue } from "../../domain/game/position/PositionValue";

export function toGridStyle(size: SizeValue, position?: PositionValue) {
  const result: CSSProperties = {
    gridColumnEnd: `span ${size.width}`,
    gridRowEnd: `span ${size.height}`,
  };

  if (position?.colStart) result.gridColumnStart = position.colStart;
  if (position?.rowStart) result.gridRowStart = position.rowStart;

  return result;
}
