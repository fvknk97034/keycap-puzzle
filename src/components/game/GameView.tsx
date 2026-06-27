import { useCallback, useEffect, useReducer, useState } from "react";

import { Timer } from "../timer/Timer";
import { Button } from "../button/Button";
import { KeyboardView } from "./keyboard/KeyboardView";
import { TrayView } from "./tray/TrayView";
import { ResultModal } from "../modal/resultModal/ResultModal";

import type { CapEntity } from "../../domain/game/cap/CapEntity";
import { SlotEntity } from "../../domain/game/slot/SlotEntity";
import { Game } from "../../domain/game/Game";

import styles from "./Game.module.css";
import { Toast } from "../toast/Toast";
import { RuleModal } from "../modal/ruleModal/RuleModal";

export function GameView() {
  const [game, setGame] = useState(() => new Game());

  const [selectedTrayCap, setSelectedTrayCap] = useState<CapEntity | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<SlotEntity | null>(null);

  const [showResult, setShowResult] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showRule, setShowRule] = useState(false);

  const [, forceUpdate] = useReducer((n) => n + 1, 0);

  const handleToastClose = useCallback(() => setShowToast(false), []);

  useEffect(() => {
    if (!game.inPlaying) return;

    const timerId = setInterval(() => forceUpdate(), 1000);

    return () => clearInterval(timerId);
  }, [game.inPlaying]);

  function handleTrayCapClick(cap: CapEntity) {
    if (!game.inPlaying) return;

    setSelectedTrayCap((prev) => (prev === cap ? null : cap));
    setSelectedSlot(null);
  }

  function selectSlot(slot: SlotEntity) {
    setSelectedSlot(slot);
    setSelectedTrayCap(null);
  }

  function setCapToSlot(slot: SlotEntity, cap: CapEntity | null) {
    if (cap && !slot.canSet(cap)) return;

    game.updateKeyboard(slot, cap);
    setSelectedTrayCap(null);
    setSelectedSlot(null);
    forceUpdate();
  }

  function removeCapFromSlot(slot: SlotEntity) {
    game.updateKeyboard(slot, null);
    setSelectedSlot(null);
    forceUpdate();
  }

  function handleSlotClick(slot: SlotEntity) {
    if (!game.inPlaying) return;
    if (slot.fixed) return;

    if (slot.cap && slot === selectedSlot) {
      removeCapFromSlot(slot);
      return;
    }

    if (slot.cap && selectedTrayCap) {
      selectSlot(slot);
      return;
    }

    setCapToSlot(slot, selectedTrayCap);
  }

  function handleStartButton() {
    if (game.inPlaying) return;

    const newGame = new Game();
    newGame.start();
    setGame(newGame);
  }

  function handleFinishButton() {
    if (!game.canFinish()) return;

    if (game.isCompleted()) {
      game.finish();
      forceUpdate();

      setShowResult(true);
    } else {
      setShowToast(true);
    }
  }

  return (
    <main className={styles["container"]}>
      <button
        className={styles["rule-button"]}
        onClick={() => setShowRule(true)}
      >
        ?
      </button>
      <Timer elapsedMs={game.elapsedMs()} />
      <div className={styles["button__container"]}>
        <Button
          disable={game.inPlaying}
          label={"スタート"}
          onClick={handleStartButton}
        />
        <Button
          disable={!game.inPlaying || !game.canFinish()}
          label={"終了"}
          onClick={handleFinishButton}
        />
      </div>
      <ResultModal
        open={showResult}
        elapsedMs={game.elapsedMs()}
        onClose={() => setShowResult(false)}
      />
      <Toast open={showToast} onClose={handleToastClose} />
      <RuleModal open={showRule} onClose={() => setShowRule(false)} />

      <div className={styles["container__item"]}>
        <KeyboardView
          keyboard={game.keyboard}
          selectedSlot={selectedSlot}
          onClick={handleSlotClick}
        />
      </div>
      <div className={styles["container__item"]}>
        <TrayView
          caps={game.caps}
          selectedCap={selectedTrayCap}
          inPlaying={game.inPlaying}
          onClick={handleTrayCapClick}
        />
      </div>
    </main>
  );
}
