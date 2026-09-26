import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function maskedProxyPlugin(): Plugin {
  const STRIP_KEYS = new Set(["creator", "author", "credit", "credits", "by", "made_by"]);

  function sanitizeJson(val: any): any {
    if (Array.isArray(val)) return val.map(sanitizeJson);
    if (val && typeof val === "object") {
      return Object.fromEntries(
        Object.entries(val)
          .filter(([k]) => !STRIP_KEYS.has(k.toLowerCase()))
          .map(([k, v]) => [k, k.toLowerCase() === "source" ? "/api/movie" : sanitizeJson(v)])
      );
    }
    if (typeof val === "string") {
      return val
        .replace(/https:\/\/movie-downloader-api\.vercel\.app\/api/gi, "/api/movie")
        .replace(/https:\/\/movie-downloader-api\.vercel\.app/gi, "/api/movie")
        .replace(/movie-downloader-api\.vercel\.app/gi, "kaalix-apis")
        .replace(/https:\/\/api\.onlyfiles\.com\/v1/gi, "/api/onlyfiles")
        .replace(/https:\/\/onlyfiles\.com/gi, "/api/onlyfiles")
        .replace(/api\.onlyfiles\.com/gi, "kaalix-apis")
        .replace(/onlyfiles\.com/gi, "kaalix-apis")
        .replace(/Samuel-Rebix/gi, "Kaalix")
        .replace(/Samuel\s*[-_]?\s*Rebix/gi, "Kaalix")
        .replace(/Lord[-_]?Samuel/gi, "kaalix-dev")
        .replace(/Samuel/gi, "Kaalix")
        .replace(/Rebix/gi, "Kaalix");
    }
    return val;
  }

  return {
    name: "masked-proxy-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || "";

        // 1. Movie Downloader API proxy
        if (rawUrl.startsWith("/api/movie")) {
          try {
            const parsed = new URL(rawUrl, "http://localhost");
            const subPath = parsed.pathname.replace(/^\/api\/movie/, "");
            const targetUrl = `https://movie-downloader-api.vercel.app/api${subPath}${parsed.search}`;

            const upstream = await fetch(targetUrl, {
              method: req.method || "GET",
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              },
            });

            const contentType = upstream.headers.get("content-type") || "application/octet-stream";
            res.setHeader("Content-Type", contentType);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.statusCode = upstream.status;

            if (contentType.includes("application/json")) {
              let text = await upstream.text();
              text = text
                .replace(/https:\/\/movie-downloader-api\.vercel\.app\/api/gi, "/api/movie")
                .replace(/https:\/\/movie-downloader-api\.vercel\.app/gi, "/api/movie")
                .replace(/movie-downloader-api\.vercel\.app/gi, "kaalix-apis")
                .replace(/Samuel-Rebix/gi, "Kaalix")
                .replace(/Samuel\s*[-_]?\s*Rebix/gi, "Kaalix")
                .replace(/Lord[-_]?Samuel/gi, "kaalix-dev")
                .replace(/Samuel/gi, "Kaalix")
                .replace(/Rebix/gi, "Kaalix");

              try {
                const parsedData = JSON.parse(text);
                const cleaned = sanitizeJson(parsedData);
                res.end(JSON.stringify(cleaned));
              } catch {
                res.end(text);
              }
              return;
            } else {
              const buffer = Buffer.from(await upstream.arrayBuffer());
              res.end(buffer);
              return;
            }
          } catch (e: any) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Movie Proxy Error", message: e?.message }));
            return;
          }
        }

        // 2. OnlyFiles masked proxy
        if (rawUrl.startsWith("/api/onlyfiles")) {
          try {
            const parsed = new URL(rawUrl, "http://localhost");
            let target = "";
            if (parsed.pathname === "/api/onlyfiles/info" || parsed.pathname === "/api/onlyfiles/file") {
              const id = parsed.searchParams.get("id") || "";
              target = `https://api.onlyfiles.com/v1/file/${encodeURIComponent(id)}/info`;
            } else if (parsed.pathname === "/api/onlyfiles/upload") {
              target = `https://api.onlyfiles.com/v1/upload`;
            } else {
              const sub = parsed.pathname.slice("/api/onlyfiles".length);
              target = `https://api.onlyfiles.com/v1${sub}${parsed.search}`;
            }

            let reqBody: Buffer | undefined = undefined;
            if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
              const chunks: Buffer[] = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
              }
              reqBody = Buffer.concat(chunks);
            }

            const upstream = await fetch(target, {
              method: req.method || "GET",
              body: reqBody,
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Referer": "https://onlyfiles.com/",
                ...(req.headers["content-type"] ? { "content-type": req.headers["content-type"] as string } : {}),
              },
            });

            const contentType = upstream.headers.get("content-type") || "application/json";
            res.setHeader("Content-Type", contentType);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.statusCode = upstream.status;

            if (contentType.includes("application/json")) {
              let text = await upstream.text();
              text = text
                .replace(/https:\/\/api\.onlyfiles\.com\/v1\/file\/([a-zA-Z0-9_-]+)\/info/gi, "/api/onlyfiles/info?id=$1")
                .replace(/https:\/\/onlyfiles\.com\/([a-zA-Z0-9_-]+)\/([^"'\s]+)/gi, "/api/onlyfiles/file?id=$1")
                .replace(/https:\/\/onlyfiles\.com\/([a-zA-Z0-9_-]+)/gi, "/api/onlyfiles/info?id=$1")
                .replace(/https:\/\/api\.onlyfiles\.com\/v1/gi, "/api/onlyfiles")
                .replace(/https:\/\/onlyfiles\.com/gi, "/api/onlyfiles")
                .replace(/api\.onlyfiles\.com/gi, "kaalix-apis")
                .replace(/onlyfiles\.com/gi, "kaalix-apis")
                .replace(/Samuel-Rebix/gi, "Kaalix")
                .replace(/Samuel\s*[-_]?\s*Rebix/gi, "Kaalix")
                .replace(/Lord[-_]?Samuel/gi, "kaalix-dev")
                .replace(/Samuel/gi, "Kaalix")
                .replace(/Rebix/gi, "Kaalix");

              try {
                const parsedData = JSON.parse(text);
                const cleaned = sanitizeJson(parsedData);
                res.end(JSON.stringify(cleaned));
              } catch {
                res.end(text);
              }
              return;
            } else {
              const buffer = Buffer.from(await upstream.arrayBuffer());
              res.end(buffer);
              return;
            }
          } catch (e: any) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "OnlyFiles Proxy Error", message: e?.message }));
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), maskedProxyPlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
    proxy: {
      // Direct Blue Archive compatibility route through the requested upstream.
      "/api/bluearchive": {
        target: "https://api-rebix.vercel.app",
        changeOrigin: true,
      },
      // Pollinations image API: use /api/pollinations/prompt/... on the website.
      "/api/pollinations": {
        target: "https://image.pollinations.ai",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pollinations/, ""),
      },
      // Existing API upstream: use /api/v1/api/... on the website.
      "/api/v1/zone": {
        target: "https://api-rebix.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/zone/, ""),
      },
      // Zone.id convenience namespace: use /api/zone/api/... on the website.
      "/api/zone": {
        target: "https://api-rebix.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zone/, ""),
      },
      "/api/v1": {
        target: "https://api-rebix.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
      "/api": {
        target: "https://api-rebix.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
