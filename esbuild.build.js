import { build } from "esbuild";
import { execSync } from "child_process";

await build({
  entryPoints: ["src/index.ts", "src/server.ts", "src/factory.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outdir: "dist",
  sourcemap: true,
  external: [],
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

// Generate .d.ts declaration files
execSync("tsc --emitDeclarationOnly", { stdio: "inherit" });

console.log("Build complete");
