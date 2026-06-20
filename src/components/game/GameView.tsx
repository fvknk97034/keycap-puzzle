import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { Timer } from "../timer/Timer";
import { Button } from "../button/Button";
import { KeyboardView } from "./keyboard/KeyboardView";
import { TrayView } from "./tray/TrayView";
import { Modal } from "../modal/Modal";

import type { CapEntity } from "../../domain/game/cap/CapEntity";
import { SlotEntity } from "../../domain/game/slot/SlotEntity";
import { Game } from "../../domain/game/Game";

import styles from "./Game.module.css";
import { Toast } from "../toast/Toast";

export function GameView() {
  const [game, setGame] = useState(() => new Game());

  const [selectedTrayCap, setSelectedTrayCap] = useState<CapEntity | null>(
    null,
  );
  const [selectedSlot, setSelectedSlot] = useState<SlotEntity | null>(null);

  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  const [inGaming, setInGaming] = useState<boolean>(false);
  const [showResult, setShowResult] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [, forceUpdate] = useReducer((n) => n + 1, 0);

  const canFinish = game.canFinish();

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  useEffect(() => {
    if (!inGaming) return;

    const timerId = setInterval(() => {
      if (startTimeRef.current !== null)
        setElapsedMs(Date.now() - startTimeRef.current);
    }, 1000);

    return () => clearInterval(timerId);
  }, [inGaming]);

  function handleTrayCapClick(cap: CapEntity) {
    if (!inGaming) return;

    setSelectedTrayCap((prev) => (prev === cap ? null : cap));
    setSelectedSlot(null);
  }

  function handleSlotClick(slot: SlotEntity) {
    if (!inGaming) return;

    if (selectedTrayCap && slot.cap) {
      setSelectedTrayCap(null);
      setSelectedSlot(slot);
      return;
    }

    if (slot.cap && slot === selectedSlot) {
      game.updateKeyboard(slot, null);
      setSelectedSlot(null);
      forceUpdate();
      return;
    }

    setSelectedSlot(slot.cap ? slot : null);
    if (!selectedTrayCap) return;
    if (!slot.canSet(selectedTrayCap)) return;

    game.updateKeyboard(slot, selectedTrayCap);
    setSelectedTrayCap(null);
    setSelectedSlot(null);
    forceUpdate();
  }

  function handleButton() {
    if (!inGaming) {
      setInGaming(true);
      setGame(new Game());
      startTimeRef.current = Date.now();
      setElapsedMs(0);
      return;
    }

    if (game.canFinish()) {
      if (game.isCompleted()) {
        setInGaming(false);
        setElapsedMs(Date.now() - (startTimeRef.current ?? Date.now()));
        setShowResult(true);
      } else {
        setShowToast(true);
      }
    }
  }

  return (
    <main className={styles["container"]}>
      <Timer elapsedMs={elapsedMs} />
      <Button
        inGaming={inGaming}
        canFinish={canFinish}
        onClick={handleButton}
      />
      <Modal
        open={showResult}
        elapsedMs={elapsedMs}
        onClose={() => setShowResult(false)}
      />
      <Toast open={showToast} onClose={handleToastClose} />

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
          inGaming={inGaming}
          onClick={handleTrayCapClick}
        />
      </div>
    </main>
  );
}
