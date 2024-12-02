import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "/index.html",
      output: {
        assetFileNames: "[name].[hash][extname]",
        chunkFileNames: "[name].[hash].js",
        entryFileNames: "[name].[hash].js",
      },
    },
  },
  test: {
    environment: "jsdom", // Use jsdom for React component testing
    globals: true, // Enables global test functions like 'describe', 'it', etc.
    setupFiles: "./setupTests.js", // Path to setup file
  },
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env": process.env,
  },
});
