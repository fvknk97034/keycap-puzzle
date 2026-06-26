import { describe, expect, it } from "vitest";

import React from "react";
import { render, screen } from "@testing-library/react";

import { CapEntity } from "../../../domain/game/cap/CapEntity";
import { CapView } from "./CapView";

describe("CapView", () => {
  it("legend の文字が表示されること", () => {
    const cap = new CapEntity({ legend: ["Q", "た", "", ""] });
    render(React.createElement(CapView, { cap }));

    expect(screen.getByText("Q")).not.toBeNull();
    expect(screen.getByText("た")).not.toBeNull();
  });
});
