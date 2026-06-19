import { CapView } from "../../cap/CapView";

import type { SlotEntity } from "../../../../domain/game/slot/SlotEntity";
import styles from "./Slot.module.css";

import { toGridStyle } from "../../../utils/gridStyle";

interface Props {
  slot: SlotEntity;
  selectedSlot: SlotEntity | null;
  onClick: () => void;
}

export function SlotView({ slot, selectedSlot, onClick }: Props) {
  const classes = [styles["slot"]];
  if (slot.fixed) classes.push(styles["slot--fixed"]);
  if (slot == selectedSlot) classes.push(styles["slot--selected"]);

  return (
    <div
      className={classes.join(" ")}
      style={toGridStyle(slot.size, slot.position)}
      onClick={onClick}
    >
      {slot.cap ? <CapView cap={slot.cap} /> : ""}
    </div>
  );
}
