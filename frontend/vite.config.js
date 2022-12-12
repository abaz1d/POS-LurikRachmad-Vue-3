import { fileURLToPath, URL } from "node:url";
import basicSsl from '@vitejs/plugin-basic-ssl'

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ basicSsl(),
    vue({
    // template: {
    //   compilerOptions: {
    //     isCustomElement: (tag) => ["qrcode-scanner"].includes(tag),
    //   },
    // },
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5600,
  },
});
