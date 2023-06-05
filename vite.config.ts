import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ command, mode, ssrBuild }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const MODE = process.env.NODE_ENV || "production";
  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });
  dotenv.config({
    path: path.join(path.resolve(), `.env.${MODE}`),
  });
  const HOST = process.env.HOST;
  const PORT = Number(process.env.PORT) || 3000;
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      host: HOST,
      port: PORT,
      proxy: {
        "/api": {
          target: "http://localhost:2323/api",
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/api/, "");
          },
        },
      },
      watch: {
        
      },
    },
    base: "",
    build: {
      outDir: "build",
      minify: true,
    },
  };
});
