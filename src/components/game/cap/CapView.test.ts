import { describe, expect, it } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";

import { CapEntity } from "../../../domain/game/cap/CapEntity";
import { CapView } from "./CapView";

describe("CapView", () => {
  it("legend の文字が表示されること", () => {
    const sizeParams = { height: 1, width: 2 };
    const cap = new CapEntity({ legend: ["Q", "た", "", ""], ...sizeParams });
    render(React.createElement(CapView, { cap }));

    expect(screen.getByText("Q")).not.toBeNull();
    expect(screen.getByText("た")).not.toBeNull();
  });
});
