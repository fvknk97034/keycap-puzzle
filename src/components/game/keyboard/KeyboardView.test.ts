import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { KeyboardView } from "./KeyboardView";
import { SlotEntity } from "../../../domain/game/slot/SlotEntity";
import { CapEntity } from "../../../domain/game/cap/CapEntity";
import type { IKeyboardEntity } from "../../../domain/game/keyboard/IKeyboardEntity";

const keyboard: IKeyboardEntity = {
  slots: [
    [new SlotEntity({ cap: new CapEntity({ legend: ["Q", "た", "", ""] }) })],
  ],
  equals: () => true,
  shuffleCaps: () => [],
};

describe("KeyboardView", () => {
  it("slot の cap が表示されること", () => {
    render(
      React.createElement(KeyboardView, {
        keyboard,
        selectedSlot: null,
        onClick: () => {},
      }),
    );

    expect(screen.getByText("Q")).not.toBeNull();
  });

  it("クリック時に onClick が呼ばれること", async () => {
    const slot = new SlotEntity({ cap: new CapEntity({ legend: ["Q"] }) });
    const kb: IKeyboardEntity = {
      slots: [[slot]],
      equals: () => true,
      shuffleCaps: () => [],
    };
    const onClick = vi.fn();
    render(
      React.createElement(KeyboardView, {
        keyboard: kb,
        selectedSlot: null,
        onClick,
      }),
    );

    await userEvent.click(screen.getByText("Q"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
