import type { CapEntity } from "../cap/CapEntity";
import type { SlotEntity } from "../slot/SlotEntity";

export interface IKeyboardEntity {
  slots: SlotEntity[][];
  equals(other: IKeyboardEntity): boolean;
  shuffleCaps(): CapEntity[];
}
