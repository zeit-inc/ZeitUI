import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2022",
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  treeshake: true,
  external: ["react", "react-dom"],
  injectStyle: true,
});
