import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ResultModal } from "./ResultModal";

describe("ResultModal", () => {
  describe("open が false のとき", () => {
    it("何も表示されないこと", () => {
      render(
        React.createElement(ResultModal, {
          open: false,
          elapsedMs: 0,
          onClose: () => {},
        }),
      );
      expect(screen.queryByText("正解です")).toBeNull();
    });
  });

  describe("open が true のとき", () => {
    it("正解メッセージが表示されること", () => {
      render(
        React.createElement(ResultModal, {
          open: true,
          elapsedMs: 0,
          onClose: () => {},
        }),
      );
      expect(screen.getByText("正解です")).not.toBeNull();
    });

    it("経過時間が mm:ss 形式で表示されること", () => {
      render(
        React.createElement(ResultModal, {
          open: true,
          elapsedMs: 75000,
          onClose: () => {},
        }),
      );
      expect(screen.getByText("01:15")).not.toBeNull();
    });

    it("閉じるボタンをクリックしたとき、onClose が呼ばれること", async () => {
      const onClose = vi.fn();
      render(
        React.createElement(ResultModal, {
          open: true,
          elapsedMs: 0,
          onClose,
        }),
      );
      await userEvent.click(screen.getByRole("button", { name: "閉じる" }));
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
