import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/keycap-puzzle/",
  plugins: [react()],
  test: { environment: "node", restoreMocks: true },
});
