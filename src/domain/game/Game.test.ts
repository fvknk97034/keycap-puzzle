import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";

import { Game } from "./Game";
import { JisKeyboardEntity } from "./keyboard/JisKeyboardEntity";

import { CapEntity } from "./cap/CapEntity";
import type { CapEntityProps } from "./cap/CapEntityProps.types";

import { SlotEntity } from "./slot/SlotEntity";
import type { SlotEntityProps } from "./slot/SlotEntityProps.types";

interface ParamProps extends CapEntityProps, SlotEntityProps {}

const STUB_DATA: ParamProps[][] = [
  [
    {
      legend: ["Q", "た", "", ""],
      height: 2,
      width: 3,
      colStart: 4,
      rowStart: 5,
      fixed: false,
    },
    { legend: ["esc"] },
  ],
  [
    {
      legend: ["win"],
      height: 2,
      width: 1,
      colStart: 3,
      rowStart: 4,
      fixed: true,
    },
    { legend: ["ctrl"], fixed: true },
    { legend: ["space"], fixed: false },
  ],
];

beforeEach(() => {
  vi.spyOn(JisKeyboardEntity.prototype as any, "data", "get").mockReturnValue(
    STUB_DATA,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Game", () => {
  describe("constructor", () => {
    it("keyboard が生成されること", () => {
      const game = new Game();
      expect(game.keyboard.slots).toEqual([
        [
          new SlotEntity({
            height: 2,
            width: 3,
            colStart: 4,
            rowStart: 5,
            fixed: false,
          }),
          new SlotEntity({}),
        ],
        [
          new SlotEntity({
            cap: new CapEntity({ legend: ["win"], height: 2, width: 1 }),
            height: 2,
            width: 1,
            colStart: 3,
            rowStart: 4,
            fixed: true,
          }),
          new SlotEntity({
            cap: new CapEntity({ legend: ["ctrl"] }),
            fixed: true,
          }),
          new SlotEntity({}),
        ],
      ]);
    });

    it("caps が空で生成されること", () => {
      const game = new Game();
      expect(game.caps).toEqual([]);
    });

    it("inPlaying が false であること", () => {
      const game = new Game();
      expect(game.inPlaying).toBe(false);
    });

    it("開始・終了時刻が null であること", () => {
      const game = new Game();
      expect(game.startMs).toBeNull();
      expect(game.endMs).toBeNull();
    });
  });

  describe("start", () => {
    it("caps が生成されること", () => {
      const game = new Game();
      game.start();

      expect(new Set(game.caps)).toEqual(
        new Set([
          new CapEntity({ legend: ["Q", "た", "", ""], height: 2, width: 3 }),
          new CapEntity({ legend: ["esc"] }),
          new CapEntity({ legend: ["space"] }),
        ]),
      );
    });

    it("inPlaying が true であること", () => {
      const game = new Game();
      game.start();

      expect(game.inPlaying).toBe(true);
    });

    it("開始時刻が null でないこと", () => {
      const game = new Game();
      game.start();

      expect(game.startMs).not.toBeNull();
    });

    it("終了時刻が null であること", () => {
      const game = new Game();
      game.start();

      expect(game.endMs).toBeNull();
    });
  });

  describe("finish", () => {
    describe("canFinish() が true の場合", () => {
      it("終了時刻が null でないこと", () => {
        const game = new Game();
        game.start();
        vi.spyOn(game, "canFinish").mockReturnValue(true);
        game.finish();

        expect(game.endMs).not.toBeNull();
      });

      it("inPlaying が false であること", () => {
        const game = new Game();
        game.start();
        vi.spyOn(game, "canFinish").mockReturnValue(true);
        game.finish();

        expect(game.inPlaying).toBe(false);
      });
    });

    describe("canFinish() が false の場合", () => {
      it("終了時刻が null であること", () => {
        const game = new Game();
        game.start();
        vi.spyOn(game, "canFinish").mockReturnValue(false);
        game.finish();

        expect(game.endMs).toBeNull();
      });

      it("inPlaying が true であること", () => {
        const game = new Game();
        game.start();
        vi.spyOn(game, "canFinish").mockReturnValue(false);
        game.finish();

        expect(game.inPlaying).toBe(true);
      });
    });
  });

  describe("finish", () => {
    describe("canFinish() が true の場合", () => {
      it("終了時刻が null でないこと", () => {
        const game = new Game();
        vi.spyOn(game, "canFinish").mockReturnValue(true);
        game.finish();

        expect(game.endMs).not.toBeNull();
      });
    });

    describe("canFinish() が false の場合", () => {
      it("終了時刻が null であること", () => {
        const game = new Game();
        vi.spyOn(game, "canFinish").mockReturnValue(false);
        game.finish();

        expect(game.endMs).toBeNull();
      });
    });
  });

  describe("elapsedMs", () => {
    describe("startMs が null の場合", () => {
      it("0 を返すこと", () => {
        const game = new Game();

        expect(game.elapsedMs()).toBe(0);
      });
    });

    describe("startMs が null でない場合", () => {
      it("経過時間を返すこと", () => {
        const game = new Game();

        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);
        game.start();
        vi.spyOn(Date, "now").mockReturnValue(now + 5000);

        expect(game.elapsedMs()).toBe(5000);
      });
    });

    describe("endMs が null でない場合", () => {
      it("ゲーム終了までの経過時間を返すこと", () => {
        const game = new Game();
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);
        game.start();
        vi.spyOn(Date, "now").mockReturnValue(now + 5000);
        vi.spyOn(game, "canFinish").mockReturnValue(true);
        game.finish();
        vi.spyOn(Date, "now").mockReturnValue(now + 10000);

        expect(game.elapsedMs()).toBe(5000);
      });
    });
  });

  describe("updateKeyboard", () => {
    const game = new Game();
    const cap = game.caps[0];
    const slot = game.keyboard.slots[0][0];

    it("cap を渡すと caps から取り除かれ、slot に設定すること", () => {
      game.updateKeyboard(slot, cap);

      expect(game.caps).not.toContain(cap);
      expect(slot.cap).toEqual(cap);
    });

    it("null を渡すと slot の cap を caps に戻すこと", () => {
      game.updateKeyboard(slot, cap);

      game.updateKeyboard(slot, null);

      expect(game.caps).toContain(cap);
      expect(slot.cap).toBeNull();
    });
  });

  describe("canFinish", () => {
    describe("caps が空の場合", () => {
      it("true を返すこと", () => {
        const game = new Game();
        const gameAny = game as any;
        gameAny._caps = [];

        expect(game.canFinish()).toBe(true);
      });
    });

    describe("caps が空でない場合", () => {
      it("false を返すこと", () => {
        const game = new Game();
        game.start();

        expect(game.canFinish()).toBe(false);
      });
    });
  });

  describe("isCompleted", () => {
    describe("caps が空の場合", () => {
      describe("全スロットが正解と一致する場合", () => {
        it("true を返すこと", () => {
          const game = new Game();
          const answer = new JisKeyboardEntity({ isCorrect: true });
          const gameAny = game as any;
          gameAny._keyboard = answer;
          gameAny._caps = [];

          expect(game.isCompleted()).toBe(true);
        });
      });

      describe("正解と一致しない場合", () => {
        it("false を返すこと", () => {
          const game = new Game();
          const gameAny = game as any;
          gameAny._keyboard = new JisKeyboardEntity({
            isCorrect: true,
          });
          gameAny._keyboard._slots = gameAny._keyboard.slots.toReversed();
          gameAny._caps = [];

          expect(game.isCompleted()).toBe(false);
        });
      });
    });

    describe("caps が空ではない場合", () => {
      it("false を返すこと", () => {
        const game = new Game();
        expect(game.isCompleted()).toBe(false);
      });
    });
  });
});
