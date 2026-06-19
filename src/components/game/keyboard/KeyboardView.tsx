import { SlotView } from "./slot/SlotView";
import { SlotEntity } from "../../../domain/game/slot/SlotEntity";

import type { IKeyboardEntity } from "../../../domain/game/keyboard/IKeyboardEntity";

import styles from "./keyboard.module.css";

interface Props {
  keyboard: IKeyboardEntity;
  selectedSlot: SlotEntity | null;
  onClick: (slot: SlotEntity) => void;
}

export function KeyboardView({ keyboard, selectedSlot, onClick }: Props) {
  const classes = [styles["keyboard"], styles["keyboard--standard"]];

  return (
    <div className={classes.join(" ")}>
      {keyboard.slots.flat().map((slot, i) => (
        <SlotView
          key={i}
          slot={slot}
          selectedSlot={selectedSlot}
          onClick={() => onClick(slot)}
        />
      ))}
    </div>
  );
}
