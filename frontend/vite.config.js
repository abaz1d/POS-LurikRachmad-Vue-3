import { fileURLToPath, URL } from "node:url";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "tailwindcss";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: command === "build" ? "/" : "/",
  plugins: [/*basicSsl(),*/ tailwindcss, vue({}), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: {
      // ...
      // Konfigurasi HTTPS sesuai kebutuhan Anda
      // ...
    },
    // Tambahkan opsi disableHostCheck untuk mengizinkan permintaan HTTP
    disableHostCheck: true,
  },
  build: {
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  },
}));
