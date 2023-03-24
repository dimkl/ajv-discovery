import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  onSuccess: "tsc --project tsconfig.build.json",
  splitting: false,
  sourcemap: true,
  clean: true,
  legacyOutput: true
});
