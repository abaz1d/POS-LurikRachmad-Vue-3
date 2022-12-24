import { fileURLToPath, URL } from "node:url";
import basicSsl from '@vitejs/plugin-basic-ssl'
const tailwindcss = require('tailwindcss');

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ /*basicSsl()*/, tailwindcss,
    vue({
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   port: 8000,
  // },
  build: {
    chunkSizeWarningLimit: 5600,
  },
});
