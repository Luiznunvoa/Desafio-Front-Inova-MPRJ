import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "components": path.resolve(__dirname, "src/components"),
      "assets": path.resolve(__dirname, "src/assets"),
      "router": path.resolve(__dirname, "src/router"),
      "hooks": path.resolve(__dirname, "src/hooks")
    }
  }
});
