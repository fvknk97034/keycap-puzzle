import { describe, expect, it, vi } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("Button", () => {
  it("label が表示されること", () => {
    render(
      React.createElement(Button, {
        disable: false,
        label: "スタート",
        onClick: () => {},
      }),
    );
    expect(screen.getByText("スタート")).not.toBeNull();
  });

  it("disable が true のとき、ボタンが無効化されること", () => {
    render(
      React.createElement(Button, {
        disable: true,
        label: "スタート",
        onClick: () => {},
      }),
    );
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
  });

  it("クリック時に onClick が呼ばれること", async () => {
    const onClick = vi.fn();
    render(
      React.createElement(Button, {
        disable: false,
        label: "スタート",
        onClick,
      }),
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
