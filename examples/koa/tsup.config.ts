import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  format: ["cjs", "esm"],
  clean: true,
  legacyOutput: true
});
