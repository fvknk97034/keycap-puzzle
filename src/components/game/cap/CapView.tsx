import styles from "./cap.module.css";
import type { CapEntity } from "../../../domain/game/cap/CapEntity";

interface Props {
  cap: CapEntity;
}

export function CapView({ cap }: Props) {
  const classes = [styles["cap"]];
  classes.push(styles[cap.isSingleFunction() ? "cap--single" : "cap--quad"]);

  const charClasses = [styles["cap__char"]];
  if (cap.isSingleFunction()) charClasses.push(styles["cap__char--compact"]);

  return (
    <div className={classes.join(" ")}>
      {cap.legend.val.map((v, index) => (
        <div className={charClasses.join(" ")} key={index}>
          {v}
        </div>
      ))}
    </div>
  );
}
