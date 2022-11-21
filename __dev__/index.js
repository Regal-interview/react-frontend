import esbuild from "esbuild";
import serve, { log, error } from "./src/index.js";

(async function () {
  try {
    await esbuild.build({
      bundle: true,
      entryPoints: ["src/init.ts"],
      outdir: "public/a",
      sourcemap: "external",
      target: "es2022",
      define: {
        "process.env.NODE_ENV": `"development"`,
      },
      watch: {
        onRebuild(err) {
          serve.update();
          err ? error("× Failed") : log("✓ Updated");
        },
      },
    });
  } catch (err) {
    process.exit(1);
  }
  serve.start();
})();
