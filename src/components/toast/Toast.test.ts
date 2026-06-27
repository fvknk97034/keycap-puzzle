import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toast } from "./Toast";

describe("Toast", () => {
  describe("open が false のとき", () => {
    it("何も表示されないこと", () => {
      render(
        React.createElement(Toast, {
          open: false,
          onClose: () => {},
        }),
      );
      expect(screen.queryByText("不正解です")).toBeNull();
    });
  });

  describe("open が true のとき", () => {
    it("不正解メッセージが表示されること", () => {
      render(
        React.createElement(Toast, {
          open: true,
          onClose: () => {},
        }),
      );
      expect(screen.getByText("不正解です")).not.toBeNull();
    });

    it("クリックしたとき、onClose が呼ばれること", async () => {
      const onClose = vi.fn();
      render(
        React.createElement(Toast, {
          open: true,
          onClose,
        }),
      );
      await userEvent.click(screen.getByText("不正解です"));
      expect(onClose).toHaveBeenCalledOnce();
    });

    it("3000ms 経過したとき、onClose が呼ばれること", () => {
      vi.useFakeTimers();
      const onClose = vi.fn();
      render(
        React.createElement(Toast, {
          open: true,
          onClose,
        }),
      );
      vi.advanceTimersByTime(3000);
      expect(onClose).toHaveBeenCalledOnce();
      vi.useRealTimers();
    });
  });
});
