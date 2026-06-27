import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RuleModal } from "./RuleModal";

describe("RuleModal", () => {
  describe("open が false のとき", () => {
    it("何も表示されないこと", () => {
      render(
        React.createElement(RuleModal, {
          open: false,
          onClose: () => {},
        }),
      );
      expect(screen.queryByText("ゲームのルール")).toBeNull();
    });
  });

  describe("open が true のとき", () => {
    it("タイトルが表示されること", () => {
      render(
        React.createElement(RuleModal, {
          open: true,
          onClose: () => {},
        }),
      );
      expect(screen.getByText("ゲームのルール")).not.toBeNull();
    });

    it("閉じるボタンをクリックしたとき、onClose が呼ばれること", async () => {
      const onClose = vi.fn();
      render(
        React.createElement(RuleModal, {
          open: true,
          onClose,
        }),
      );
      await userEvent.click(screen.getByRole("button", { name: "閉じる" }));
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
