import { useEffect, useRef, useState } from 'react'

import { Timer } from '../timer/timer'
import { Button } from '../button/button'
import { KeyboardView } from '../keyboard/keyboardView'
import { TrayView } from '../tray/trayView'
import { Modal } from '../modal/modal'


import type { Cap } from '../../models/cap/cap'
import { Slot } from '../../models/slot/slot'
import { Game } from '../../models/game'

import styles from './game.module.css'

export function GameView() {
  const [game, setGame] = useState(() => new Game())
  const [selectedTrayCap, setSelectedTrayCap] = useState<Cap | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const [elapsedMs, setElapsedMs] = useState(0)
  const startTimeRef = useRef<number | null>(null)

  const [inGaming, setInGaming] = useState<boolean>(false)
  const [showResult, setShowResult] = useState(false)

  const canFinish = game.tray.length === 0

  useEffect(() => {
    if (!inGaming) return

    const id = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(Date.now() - startTimeRef.current)
      }
    }, 1000)

    return () => clearInterval(id)
  }, [inGaming])


  function handleTrayClick(cap: Cap) {
    if (!inGaming) return
    setSelectedTrayCap((prev) => (prev === cap ? null : cap))
    setSelectedSlot(null)
  }

  function handleSlotClick(slot: Slot) {
    if (!inGaming) return

    if (selectedTrayCap && slot.cap) {
      setSelectedTrayCap(null)
      setSelectedSlot(slot)
      return
    }

    if (slot.cap && slot === selectedSlot) {
      setGame((g) => g.updateSlot(slot, null))
      setSelectedSlot(null)
      return
    }

    setSelectedSlot(slot.cap ? slot : null)
    if (!selectedTrayCap) return
    if (!slot.canSet(selectedTrayCap)) return

    setGame((g) => g.updateSlot(slot, selectedTrayCap))
    setSelectedTrayCap(null)
    setSelectedSlot(null)
  }

  function handleButton() {
    if (!inGaming) {
      setInGaming(true)
      setGame(new Game())
      startTimeRef.current = Date.now()
      setElapsedMs(0)
      return
    }

    if (game.isCompleted()) {
      setInGaming(false)
      setElapsedMs(Date.now() - (startTimeRef.current ?? Date.now()))
      setShowResult(true)
    }
  }

  return (
    <main className={styles['container']}>
      <Timer elapsedMs={elapsedMs} />
      <Button inGaming={inGaming} canFinish={canFinish} onClick={handleButton} />
      <KeyboardView slots={game.slots} selectedSlot={selectedSlot} onClick={handleSlotClick} />
      <TrayView caps={game.tray} selectedCap={selectedTrayCap} inGaming={inGaming} onClick={handleTrayClick} />
      <Modal open={showResult} elapsedMs={elapsedMs} onClose={() => setShowResult(false)} />
    </main>
  )
}
