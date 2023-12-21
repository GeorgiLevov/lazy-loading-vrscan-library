// vite.config.js
import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as esbuild from "esbuild";


const rollupPlugin = (matchers) => ({
    name: "js-in-jsx",
    load(id) {
        if (matchers.some(matcher => matcher.test(id))) {
            const file = fs.readFileSync(id, { encoding: "utf-8" });
            return esbuild.transformSync(file, { loader: "jsx" });
        }
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() ],
  build: {
    rollupOptions: {
      plugins: [
        rollupPlugin([/\/src\/.*\.js$/,/\/api\/.*\.js$/])],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: [/\/src\/.*\.js$/,/\/api\/.*\.js$/],
    exclude: [],
  },
});
