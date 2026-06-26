import { describe, expect, it, vi, beforeEach } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GameView } from "./GameView";
import { JisKeyboardEntity } from "../../domain/game/keyboard/JisKeyboardEntity";
import { Game } from "../../domain/game/Game";

const STUB_DATA = [
  [
    {
      legend: ["Q", "た", "", ""],
      height: 1,
      width: 4,
      fixed: false,
    },
    { legend: ["esc"], fixed: false },
  ],
  [
    {
      legend: ["win"],
      height: 1,
      width: 4,
      fixed: true,
    },
    { legend: ["ctrl"], fixed: true },
    { legend: ["space"], fixed: false },
    { legend: ["tab"], height: 2, width: 4, fixed: false },
  ],
];

beforeEach(() => {
  vi.spyOn(JisKeyboardEntity.prototype as any, "data", "get").mockReturnValue(
    STUB_DATA,
  );
});

describe("GameView", () => {
  describe("初期状態", () => {
    it("スタートボタンが表示されること", () => {
      render(React.createElement(GameView));
      expect(screen.getByText("スタート")).not.toBeNull();
    });

    it("終了ボタンが表示されること", () => {
      render(React.createElement(GameView));
      expect(screen.getByText("終了")).not.toBeNull();
    });

    it("スタートボタンが有効であること", () => {
      render(React.createElement(GameView));
      expect(screen.getByText("スタート").closest("button")).not.toBeDisabled();
    });

    it("終了ボタンが無効であること", () => {
      render(React.createElement(GameView));
      expect(screen.getByText("終了").closest("button")).toBeDisabled();
    });
  });

  describe("ゲーム中", () => {
    it("スタートボタンが無効であること", async () => {
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      expect(screen.getByText("スタート").closest("button")).toBeDisabled();
    });

    it("終了ボタンが無効であること", async () => {
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      expect(screen.getByText("終了").closest("button")).toBeDisabled();
    });

    describe("全キャップ配置済みの場合", () => {
      it("終了ボタンが有効であること", async () => {
        vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        expect(screen.getByText("終了").closest("button")).not.toBeDisabled();
      });
    });
  });

  describe("ゲーム終了後", () => {
    it("スタートボタンが有効であること", async () => {
      vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
      vi.spyOn(Game.prototype, "isCompleted").mockReturnValue(true);
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      await userEvent.click(screen.getByText("終了"));
      expect(screen.getByText("スタート").closest("button")).not.toBeDisabled();
    });

    it("終了ボタンが無効であること", async () => {
      vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
      vi.spyOn(Game.prototype, "isCompleted").mockReturnValue(true);
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      await userEvent.click(screen.getByText("終了"));
      expect(screen.getByText("終了").closest("button")).toBeDisabled();
    });
  });

  describe("handleStartButton", () => {
    it("スタートボタンが無効になること", async () => {
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      expect(screen.getByText("スタート").closest("button")).toBeDisabled();
    });

    describe("ゲーム中の場合", () => {
      it("何も起きないこと", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("スタート"));
        expect(screen.getByText("スタート").closest("button")).toBeDisabled();
      });
    });
  });

  describe("handleFinishButton", () => {
    describe("ゲーム中かつ canFinish が false の場合", () => {
      it("終了ボタンが無効であること", async () => {
        vi.spyOn(Game.prototype, "canFinish").mockReturnValue(false);
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        expect(screen.getByText("終了").closest("button")).toBeDisabled();
      });
    });

    describe("isCompleted が true の場合", () => {
      it("結果モーダルが表示されること", async () => {
        vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
        vi.spyOn(Game.prototype, "isCompleted").mockReturnValue(true);
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("終了"));
        expect(screen.getByText("正解です")).not.toBeNull();
      });
    });

    describe("isCompleted が false の場合", () => {
      it("Toastが表示されること", async () => {
        vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
        vi.spyOn(Game.prototype, "isCompleted").mockReturnValue(false);
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("終了"));
        expect(screen.getByText("不正解です")).not.toBeNull();
      });
    });
  });

  describe("handleTrayCapClick", () => {
    describe("ゲーム中でない場合", () => {
      it("キャップをクリックしても何も起きないこと", async () => {
        render(React.createElement(GameView));
        expect(screen.queryByText("Q")).toBeNull();
      });
    });

    describe("ゲーム中の場合", () => {
      it("キャップをクリックすると選択状態になること", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("Q"));
        expect(
          screen.getByText("Q").closest("[class*='tray__item']"),
        ).toHaveClass("_tray__item--selected_865d22");
      });

      it("選択中のキャップを再クリックすると選択解除されること", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("Q"));
        await userEvent.click(screen.getByText("Q"));
        expect(
          screen.getByText("Q").closest("[class*='tray__item']"),
        ).not.toHaveClass("_tray__item--selected_865d22");
      });
    });
  });

  describe("handleSlotClick", () => {
    describe("ゲーム中でない場合", () => {
      it("スロットをクリックしても何も起きないこと", async () => {
        render(React.createElement(GameView));
        expect(screen.queryByText("Q")).toBeNull();
      });
    });

    describe("fixed スロットの場合", () => {
      it("クリックしても何も起きないこと", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("ctrl"));
        expect(
          screen.getByText("ctrl").closest("[class*='slot']"),
        ).not.toHaveClass("_slot--selected_4f3954");
      });
    });

    describe("トレイキャップ選択中かつスロットが空の場合", () => {
      it("キャップがスロットに配置されること", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("Q"));
        await userEvent.click(
          screen.getByText("esc").closest("[class*='slot']")!,
        );
        expect(screen.queryByText("Q")).not.toBeNull();
      });
    });

    describe("トレイキャップ選択中かつスロットにキャップがある場合", () => {
      it("トレイキャップの選択が解除されること", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));

        await userEvent.click(screen.getByText("Q"));
        const keyboard = document.querySelector("[class*='keyboard']");
        const emptySlot = Array.from(
          keyboard!.querySelectorAll("[class*='slot']"),
        ).find(
          (el) =>
            !el.querySelector("[class*='cap']") &&
            !el.className.includes("fixed"),
        );
        await userEvent.click(emptySlot!);
        await userEvent.click(screen.getByText("tab"));
        const slotWithCap = Array.from(
          keyboard!.querySelectorAll("[class*='slot']"),
        ).find(
          (el) =>
            el.querySelector("[class*='cap']") &&
            !el.className.includes("fixed"),
        );
        await userEvent.click(slotWithCap!);

        expect(
          screen.getByText("tab").closest("[class*='tray__item']"),
        ).not.toHaveAttribute("class", expect.stringContaining("selected"));
      });
    });

    describe("スロット選択中に同じスロットをクリックした場合", () => {
      it("キャップが外されること", async () => {
        render(React.createElement(GameView));
        await userEvent.click(screen.getByText("スタート"));
        await userEvent.click(screen.getByText("Q"));
        await userEvent.click(
          screen.getByText("esc").closest("[class*='slot']")!,
        );
        await userEvent.click(
          screen.getByText("esc").closest("[class*='slot']")!,
        );
        await userEvent.click(
          screen.getByText("esc").closest("[class*='slot']")!,
        );
        expect(screen.queryByText("Q")).not.toBeNull();
      });
    });
  });

  describe("handleToastClose", () => {
    it("Toastが閉じること", async () => {
      vi.spyOn(Game.prototype, "canFinish").mockReturnValue(true);
      vi.spyOn(Game.prototype, "isCompleted").mockReturnValue(false);
      render(React.createElement(GameView));
      await userEvent.click(screen.getByText("スタート"));
      await userEvent.click(screen.getByText("終了"));
      await userEvent.click(screen.getByText("不正解です"));
      expect(screen.queryByText("不正解です")).toBeNull();
    });
  });
});
