import { describe, expect, it } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";

import { Timer } from "./Timer";

describe("Timer", () => {
  it("経過時間が mm:ss 形式で表示されること", () => {
    render(
      React.createElement(Timer, {
        elapsedMs: 75000,
      }),
    );
    expect(screen.getByText("01:15")).not.toBeNull();
  });

  it("0 ミリ秒のとき 00:00 が表示されること", () => {
    render(
      React.createElement(Timer, {
        elapsedMs: 0,
      }),
    );
    expect(screen.getByText("00:00")).not.toBeNull();
  });
});
