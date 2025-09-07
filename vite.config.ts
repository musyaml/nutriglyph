import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html",
    },
  },
});
