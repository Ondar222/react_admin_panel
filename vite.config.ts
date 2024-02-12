import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/partners",
  envDir: "./src/app/config/environment",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },

  plugins: [
    react(),
    // ckeditor5({ theme: path.resolve("@ckeditor/ckeditor-theme-lark") }),
  ],
  ssr: {
    noExternal: ["styled-components", "@emotion/*"]
  },
});
// {
//   // include: /\.(jsx |tsx)$$/,
//   // babel: {
//   //   plugins: ["styled-components"],
//   //   babelrc: false,
//   //   configFile: false,
//   // },
// }