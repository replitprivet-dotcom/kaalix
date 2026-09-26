// Serves the Vite-built frontend and proxies both API upstreams.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import youtubedl from "youtube-dl-exec";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, "dist");
const VERCEL_UPSTREAM = "https://api-rebix.vercel.app";
const ZONE_UPSTREAM = "https://api-rebix.zone.id";
const POLLINATIONS_UPSTREAM = "https://image.pollinations.ai";
const UPSTREAM_TIMEOUT_MS = 20000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const STRIP_KEYS = new Set(["creator", "author", "credit", "credits", "by", "made_by"]);
const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtube-nocookie.com"]);
const YOUTUBE_QUALITIES = new Set(["144", "240", "360", "480", "720", "1080", "1440", "2160", "4320"]);

function stripBranding(obj) {
  if (Array.isArray(obj)) return obj.map(stripBranding);
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([key]) => !STRIP_KEYS.has(key.toLowerCase()))
        .map(([key, value]) => {
          if (key.toLowerCase() === "source" && typeof value === "string") {
            return [key, "/api/movie"];
          }
          return [key, stripBranding(value)];
        })
    );
  }
  if (typeof obj === "string") {
    return obj
      .replace(/Samuel-Rebix/gi, "Kaalix")
      .replace(/Samuel\s*[-_]?\s*Rebix/gi, "Kaalix")
      .replace(/Lord[-_]?Samuel/gi, "kaalix-dev")
      .replace(/Samuel/gi, "Kaalix")
      .replace(/Rebix/gi, "Kaalix")
      .replace(/https:\/\/movie-downloader-api\.vercel\.app\/api/gi, "/api/movie")
      .replace(/https:\/\/movie-downloader-api\.vercel\.app/gi, "/api/movie")
      .replace(/movie-downloader-api\.vercel\.app/gi, "kaalix-apis")
      .replace(/https:\/\/api\.onlyfiles\.com\/v1/gi, "/api/onlyfiles")
      .replace(/https:\/\/onlyfiles\.com/gi, "/api/onlyfiles")
      .replace(/api\.onlyfiles\.com/gi, "kaalix-apis")
      .replace(/onlyfiles\.com/gi, "kaalix-apis");
  }
  return obj;
}

function isAllowedYouTubeUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && YOUTUBE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

function normalizeYouTubeQuality(value) {
  return YOUTUBE_QUALITIES.has(String(value)) ? String(value) : "720";
}

async function streamYouTubeVideo(req, res, videoUrl, quality) {
  const selectedQuality = normalizeYouTubeQuality(quality);
  const format = `best[ext=mp4][height<=${selectedQuality}]/best[height<=${selectedQuality}]/best`;
  const process = youtubedl.exec(videoUrl, {
    format,
    output: "-",
    noPlaylist: true,
    noWarnings: true,
    noCheckCertificates: true,
    preferFreeFormats: true,
    remoteComponents: "ejs:github",
    extractorArgs: "youtube:player_client=android_vr",
    forceIpv4: true,
    addHeader: ["referer:youtube.com", "user-agent:Mozilla/5.0"],
  });

  let headersSent = false;
  let stderrText = "";
  const sendVideoHeaders = () => {
    if (headersSent) return;
    headersSent = true;
    res.writeHead(200, {
      "content-type": "video/mp4",
      "content-disposition": `attachment; filename="rbot-youtube-${selectedQuality}p.mp4"`,
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    });
  };
  const fail = (error) => {
    if (headersSent || res.writableEnded) return;
    res.writeHead(502, { "content-type": "application/json", "access-control-allow-origin": "*" });
    res.end(JSON.stringify({ error: "YouTube download failed", message: stderrText.trim() || error?.message || "yt-dlp could not retrieve this video" }));
  };

  process.once("error", fail);
  process.stderr.on("data", (chunk) => {
    stderrText = `${stderrText}${chunk.toString()}`.slice(-4000);
  });
  process.stdout.on("data", (chunk) => {
    sendVideoHeaders();
    res.write(chunk);
  });
  process.stdout.once("end", () => {
    if (headersSent) res.end();
    else fail(new Error("yt-dlp returned no video data"));
  });
  req.once("close", () => {
    if (!res.writableEnded) process.kill();
  });
  process.once("close", (code) => {
    if (code !== 0 && !res.writableEnded) fail(new Error(`yt-dlp exited with code ${code}`));
  });
}

async function forwardApi(res, targetUrl, upstreamHost, { stripJsonBranding = false } = {}) {
  try {
    const upstream = await fetch(targetUrl, {
      method: "GET",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      headers: {
        "user-agent": "Mozilla/5.0",
        host: upstreamHost,
      },
    });

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    res.writeHead(upstream.status, {
      "content-type": contentType,
      "access-control-allow-origin": "*",
    });

    if (contentType.includes("application/json")) {
      let raw = await upstream.text();
      raw = raw
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
        .replace(/Rebix/gi, "Kaalix")
        .replace(/api-rebix\.vercel\.app/gi, "kaalix-apis")
        .replace(/api-rebix\.zone\.id/gi, "kaalix-apis");

      if (stripJsonBranding) {
        try {
          res.end(JSON.stringify(stripBranding(JSON.parse(raw))));
        } catch {
          res.end(raw);
        }
      } else {
        try {
          res.end(JSON.stringify(stripBranding(JSON.parse(raw))));
        } catch {
          res.end(raw);
        }
      }
    } else {
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.end(buf);
    }
  } catch (err) {
    const message = err?.name === "TimeoutError" || err?.name === "AbortError"
      ? `Upstream response timed out after ${UPSTREAM_TIMEOUT_MS / 1000} seconds`
      : err?.message || "Upstream request failed";
    if (!res.headersSent) res.writeHead(504, { "content-type": "application/json", "access-control-allow-origin": "*", "cache-control": "no-store" });
    res.end(JSON.stringify({ error: "Gateway timeout", message }));
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  // CORS preflight
  res.setHeader("access-control-allow-origin", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // OnlyFiles masked proxy: user never sees onlyfiles.com
  if (url.pathname.startsWith("/api/onlyfiles")) {
    let target = "";
    if (url.pathname === "/api/onlyfiles/info" || url.pathname === "/api/onlyfiles/file") {
      const id = url.searchParams.get("id") || "";
      target = `https://api.onlyfiles.com/v1/file/${encodeURIComponent(id)}/info`;
    } else if (url.pathname === "/api/onlyfiles/upload") {
      target = `https://api.onlyfiles.com/v1/upload`;
    } else {
      const sub = url.pathname.slice("/api/onlyfiles".length);
      target = `https://api.onlyfiles.com/v1${sub}${url.search}`;
    }

    try {
      let reqBody = undefined;
      if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
        }
        reqBody = Buffer.concat(chunks);
      }

      const upstream = await fetch(target, {
        method: req.method,
        body: reqBody,
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "referer": "https://onlyfiles.com/",
          ...(req.headers["content-type"] ? { "content-type": req.headers["content-type"] } : {}),
        },
      });

      const contentType = upstream.headers.get("content-type") || "application/json";
      res.writeHead(upstream.status, {
        "content-type": contentType,
        "access-control-allow-origin": "*",
      });

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
        res.end(text);
        return;
      }
      const data = Buffer.from(await upstream.arrayBuffer());
      res.end(data);
      return;
    } catch (e) {
      res.writeHead(502, { "content-type": "application/json", "access-control-allow-origin": "*" });
      res.end(JSON.stringify({ error: "OnlyFiles proxy error", message: e?.message || "Failed to reach backend" }));
      return;
    }
  }

  // Movie Downloader masked proxy: /api/movie/... maps to https://movie-downloader-api.vercel.app/api/...
  if (url.pathname.startsWith("/api/movie")) {
    const subPath = url.pathname.slice("/api/movie".length);
    const targetUrl = `https://movie-downloader-api.vercel.app/api${subPath}${url.search}`;
    await forwardApi(res, targetUrl, "movie-downloader-api.vercel.app", { stripJsonBranding: true });
    return;
  }

  // Direct Blue Archive compatibility route through the requested Vercel upstream.
  if (url.pathname === "/api/bluearchive") {
    await forwardApi(res, `${VERCEL_UPSTREAM}/api/bluearchive${url.search}`, "api-rebix.vercel.app");
    return;
  }

  // Internal YouTube MP4 downloader. This avoids the failing upstream routes.
  if (url.pathname === "/api/youtube") {
    const videoUrl = url.searchParams.get("url") || "";
    if (!isAllowedYouTubeUrl(videoUrl)) {
      res.writeHead(400, { "content-type": "application/json", "access-control-allow-origin": "*" });
      res.end(JSON.stringify({ error: "A valid public YouTube URL is required" }));
      return;
    }
    await streamYouTubeVideo(req, res, videoUrl, url.searchParams.get("quality"));
    return;
  }

  // Pollinations image proxy: /api/pollinations/prompt/... maps to image.pollinations.ai/prompt/...
  if (url.pathname.startsWith("/api/pollinations/")) {
    const subPath = url.pathname.slice("/api/pollinations".length);
    await forwardApi(res, `${POLLINATIONS_UPSTREAM}${subPath}${url.search}`, "image.pollinations.ai");
    return;
  }

  // Compatibility aliases now resolve through the requested Vercel upstream.
  if (url.pathname.startsWith("/api/v1/zone/")) {
    const subPath = url.pathname.slice("/api/v1/zone".length);
    await forwardApi(res, `${VERCEL_UPSTREAM}${subPath}${url.search}`, "api-rebix.vercel.app");
    return;
  }

  if (url.pathname.startsWith("/api/zone/")) {
    const subPath = url.pathname.slice("/api/zone".length);
    await forwardApi(res, `${VERCEL_UPSTREAM}${subPath}${url.search}`, "api-rebix.vercel.app");
    return;
  }

  // Legacy namespace: /api/v1/api/... maps to the same live Vercel upstream.
  if (url.pathname.startsWith("/api/v1/")) {
    const subPath = url.pathname.slice("/api/v1".length);
    await forwardApi(
      res,
      `${VERCEL_UPSTREAM}${subPath}${url.search}`,
      "api-rebix.vercel.app",
      { stripJsonBranding: true }
    );
    return;
  }

  // Primary namespace: every catalog path /api/... maps to api-rebix.vercel.app/api/....
  if (url.pathname.startsWith("/api/")) {
    await forwardApi(
      res,
      `${VERCEL_UPSTREAM}${url.pathname}${url.search}`,
      "api-rebix.vercel.app",
      { stripJsonBranding: true }
    );
    return;
  }

  // Static files from dist/
  let filePath = path.join(DIST, url.pathname);

  // Safety: don't escape DIST directory
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // If path is a directory, look for index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // If file doesn't exist, serve SPA index.html (client-side routing)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  res.writeHead(200, { "content-type": mime });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ R-BOT FREE APIS server running on port ${PORT}`);
});
