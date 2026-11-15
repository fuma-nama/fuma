import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/api.ts", "src/client.tsx"],
  format: "esm",
  dts: true,
  target: "es2023",
  exports: {
    customExports: {
      "./style.css": "./dist/style.css",
    },
  },
  deps: {
    onlyBundle: [],
  },
});
