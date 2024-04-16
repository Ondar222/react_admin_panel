import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { createRequire } from 'node:module';
import { loadEnv } from "vite";
const require = createRequire(import.meta.url);

export default ({ mode }) => {
  console.log(mode)
  const envDir = path.resolve(process.cwd(), "src/app/config/")
  process.env = { ...process.env, ...loadEnv(mode, envDir) };

  return defineConfig({

    envDir,
    server: {
      port: Number(process.env.VITE_PORT)
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },

    plugins: [
      react(),
    ],
    ssr: {
      noExternal: ["styled-components", "@emotion/*"]
    },
  })
}