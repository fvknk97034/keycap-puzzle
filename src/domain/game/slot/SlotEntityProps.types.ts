import type { CapEntity } from "../cap/CapEntity";

export interface SlotEntityProps {
  width?: number;
  height?: number;
  colStart?: number | null;
  rowStart?: number | null;
  cap?: CapEntity | null;
  fixed?: boolean;
}
