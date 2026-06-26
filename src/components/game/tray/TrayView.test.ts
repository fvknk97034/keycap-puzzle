import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TrayView } from "./TrayView";
import { CapEntity } from "../../../domain/game/cap/CapEntity";

describe("TrayView", () => {
  describe("inPlaying が false の場合", () => {
    it("表示されないこと", () => {
      const { container } = render(
        React.createElement(TrayView, {
          caps: [],
          selectedCap: null,
          inPlaying: false,
          onClick: () => {},
        }),
      );

      expect((container.firstChild as HTMLElement).style.display).toBe("none");
    });
  });

  describe("cap がある場合", () => {
    it("legend の文字が表示されること", () => {
      const cap = new CapEntity({ legend: ["Q", "た", "", ""] });
      render(
        React.createElement(TrayView, {
          caps: [cap],
          selectedCap: null,
          inPlaying: true,
          onClick: () => {},
        }),
      );

      expect(screen.getByText("Q")).not.toBeNull();
    });

    it("クリック時に onClick が呼ばれること", async () => {
      const cap = new CapEntity({ legend: ["Q"] });
      const onClick = vi.fn();
      render(
        React.createElement(TrayView, {
          caps: [cap],
          selectedCap: null,
          inPlaying: true,
          onClick,
        }),
      );

      await userEvent.click(screen.getByText("Q"));
      expect(onClick).toHaveBeenCalledWith(cap);
    });
  });
});
