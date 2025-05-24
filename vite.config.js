import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.TENANT_ID ? `/${process.env.TENANT_ID}/` : '/',
  define: {
    'import.meta.env.TENANT_ID': JSON.stringify(process.env.TENANT_ID || ''),
  },
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,   // respond to *any* Host header
    watch: {
      usePolling: true,
      interval: 300,   // ms; tune if CPU gets high
    },
    hmr: {
      protocol: 'wss',         // ALB terminates TLS
      host: 'preview.my-domain.com',
      clientPort: 443,
    },
  },
});
