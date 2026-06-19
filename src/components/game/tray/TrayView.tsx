import { CapView } from "../cap/CapView";
import { CapEntity } from "../../../domain/game/cap/CapEntity";

import { toGridStyle } from "../../utils/gridStyle";

import styles from "./Tray.module.css";

interface Props {
  caps: CapEntity[];
  selectedCap: CapEntity | null;
  inGaming: boolean;
  onClick: (cap: CapEntity) => void;
}

export function TrayView({ caps, selectedCap, inGaming, onClick }: Props) {
  return (
    <div
      className={styles["tray"]}
      style={!inGaming ? { display: "none" } : {}}
    >
      {caps?.map((cap, i) => {
        const classes = [styles["tray__item"]];
        if (cap === selectedCap) classes.push(styles["tray__item--selected"]);

        return (
          <div
            className={classes.join(" ")}
            style={toGridStyle(cap.size)}
            onClick={() => onClick?.(cap)}
            key={i}
          >
            <CapView cap={cap} />
          </div>
        );
      })}
    </div>
  );
}
