import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SlotView } from "./SlotView";
import { SlotEntity } from "../../../../domain/game/slot/SlotEntity";
import { CapEntity } from "../../../../domain/game/cap/CapEntity";

describe("SlotView", () => {
  const sizeParams = { height: 1, width: 2 };

  describe("cap がある場合", () => {
    it("legend の文字が表示されること", () => {
      const cap = new CapEntity({ legend: ["Q", "た", "", ""], ...sizeParams });
      const slot = new SlotEntity({ cap, ...sizeParams });
      render(
        React.createElement(SlotView, {
          slot,
          selectedSlot: null,
          onClick: () => {},
        }),
      );

      expect(screen.getByText("Q")).not.toBeNull();
    });
  });

  describe("cap がない場合", () => {
    it("何も表示されないこと", () => {
      const slot = new SlotEntity(sizeParams);
      const { container } = render(
        React.createElement(SlotView, {
          slot,
          selectedSlot: null,
          onClick: () => {},
        }),
      );

      expect(container.firstChild?.textContent).toBe("");
    });
  });

  it("クリック時に onClick が呼ばれること", async () => {
    const slot = new SlotEntity(sizeParams);
    const onClick = vi.fn();
    const { container } = render(
      React.createElement(SlotView, { slot, selectedSlot: null, onClick }),
    );

    await userEvent.click(container.firstChild as Element);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
