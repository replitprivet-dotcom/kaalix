import { useState, useMemo, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";
import {
  Bot, Download, Search, Tv2, Eye, Wrench, Settings2, Shuffle,
  ImageIcon, ShieldAlert, Zap, Copy, Check, X, Play, ChevronRight,
  ExternalLink, Sun, Moon, Loader2, Send, Users, CalendarDays, Volume2, VolumeX,
  Sparkles, Activity, AlertTriangle, RotateCcw, Star, Plus, Trash2,
  LayoutGrid, List, Terminal, Globe, Code2, Clock, Bookmark,
  Layers, HardDrive, Film, UploadCloud, FileText
} from "lucide-react";
import { categories as defaultCategories, type Endpoint, type Category } from "./data/endpoints";

function VerifiedBadge() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vbg1" x1="0" y1="0" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8"/>
          <stop offset="100%" stopColor="#6d28d9"/>
        </linearGradient>
        <filter id="vbg-glow">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="10.5" cy="10.5" r="10.5" fill="url(#vbg1)" filter="url(#vbg-glow)"/>
      <circle cx="10.5" cy="10.5" r="10.5" fill="url(#vbg1)" opacity="0.6"/>
      <path d="M6 10.8l3.2 3.2 5.8-6.2" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

const PROFILE_VIDEOS = [
  "https://files.catbox.moe/x3knsd.mp4",
  "https://files.catbox.moe/x43x2x.mp4",
  "https://files.catbox.moe/15gcpt.mp4",
];

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2600);
    const t2 = setTimeout(() => onDone(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`sp-wrap fixed inset-0 z-[100] overflow-hidden flex flex-col${leaving ? " sp-out" : ""}`}
      style={{ background: "#06010a" }}>

      <div className="relative flex-1 min-h-0">
        <img
          src="/splash.jpg"
          alt=""
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="sp-logo absolute inset-0 w-full h-full object-cover object-top select-none"
          style={{ objectPosition: "center 15%", WebkitTouchCallout: "none" } as React.CSSProperties}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(6,1,10,0.05) 0%, rgba(6,1,10,0.3) 55%, rgba(6,1,10,1) 100%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(220,38,38,0.12) 0%, transparent 65%)"
        }} />

        {[
          { cls: "sp-p1", left: "15%",  size: 5, color: "#dc2626" },
          { cls: "sp-p2", left: "80%",  size: 4, color: "#d97706" },
          { cls: "sp-p3", left: "60%",  size: 6, color: "#ef4444" },
          { cls: "sp-p4", left: "35%",  size: 4, color: "#f59e0b" },
        ].map((p, i) => (
          <div key={i} className={`${p.cls} absolute bottom-0 rounded-full`}
            style={{ left: p.left, width: p.size, height: p.size, background: p.color, filter: `blur(1px) drop-shadow(0 0 4px ${p.color})` }} />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-4 px-6 pt-6 pb-10"
        style={{ background: "linear-gradient(180deg, rgba(6,1,10,0) 0%, #06010a 18%)" }}>

        <div className="flex items-center gap-3 w-full max-w-[220px]">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(220,38,38,0.5))" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ boxShadow: "0 0 8px #dc2626" }} />
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(220,38,38,0.5))" }} />
        </div>

        <div className="sp-name flex flex-col items-center gap-1">
          <p className="text-[11px] font-black tracking-[0.35em] uppercase"
            style={{ color: "rgba(255,255,255,0.28)" }}>Kᴀᴀʟɪx</p>
          <h1 className="text-[26px] font-black tracking-tight text-white leading-none"
            style={{ textShadow: "0 0 30px rgba(220,38,38,0.6)" }}>
            FREE <span style={{ color: "#ef4444" }}>APIS</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {[
            { cls: "sp-dot-1", color: "#ef4444" },
            { cls: "sp-dot-2", color: "#f59e0b" },
            { cls: "sp-dot-3", color: "#dc2626" },
          ].map((d, i) => (
            <span key={i} className={`${d.cls} block w-2 h-2 rounded-full`}
              style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
          ))}
        </div>

        <div className="w-[140px] h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="sp-bar-fill h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #dc2626, #ef4444, #f59e0b, #d97706)" }} />
        </div>
      </div>
    </div>
  );
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  Bot, Download, Search, Tv2, Eye, Wrench, Settings2, Shuffle, ImageIcon, ShieldAlert, Globe, Layers, Star, Plus, HardDrive, Film
};

// Calculate consistent, realistic community rating data based on endpoint path
export function getEndpointRatingData(path: string, userRating?: number) {
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    hash = (hash << 5) - hash + path.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  const baseScore = 4.7 + ((abs % 28) / 100); // 4.70 to 4.98
  const baseCount = 42 + (abs % 115); // 42 to 156 reviews

  if (userRating) {
    const totalScore = baseScore * baseCount + userRating;
    const newCount = baseCount + 1;
    const finalScore = parseFloat((totalScore / newCount).toFixed(1));
    return {
      score: finalScore,
      count: newCount,
      userRating,
    };
  }

  return {
    score: parseFloat(baseScore.toFixed(1)),
    count: baseCount,
    userRating: undefined,
  };
}

function StarRatingWidget({
  path,
  ratingData,
  onRate,
  compact = false,
  showCount = true,
}: {
  path: string;
  ratingData: { score: number; count: number; userRating?: number };
  onRate: (path: string, stars: number) => void;
  compact?: boolean;
  showCount?: boolean;
}) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const displayStars = hoveredStar !== null ? hoveredStar : (ratingData.userRating || Math.round(ratingData.score));

  return (
    <div
      className="star-rating-widget inline-flex items-center gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="star-rating-stars inline-flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayStars;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={(e) => {
                e.stopPropagation();
                onRate(path, star);
              }}
              title={`Rate ${star} star${star > 1 ? "s" : ""}`}
              className="star-btn"
            >
              <Star
                size={compact ? 12 : 14}
                fill={filled ? "#fbbf24" : "none"}
                color={filled ? "#fbbf24" : "var(--fg4)"}
                className={filled ? "drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" : ""}
              />
            </button>
          );
        })}
      </div>
      <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1">
        {ratingData.score.toFixed(1)}
        {showCount && (
          <span className="text-[10px] text-[var(--fg4)] font-normal">
            ({ratingData.count})
          </span>
        )}
      </span>
      {ratingData.userRating && (
        <span className="star-user-rated-pill">
          ★ {ratingData.userRating}
        </span>
      )}
    </div>
  );
}

function CategoryIcon({ name, size = 15, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon size={size} style={style} />;
}

function buildUrl(path: string, params: Record<string, string>) {
  const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ""));
  const isPollinationsPrompt = path === "/api/pollinations/prompt";
  const isAbsolute = /^https?:\/\//i.test(path);
  const base = isAbsolute ? "" : BASE;

  if (isPollinationsPrompt) {
    const prompt = filtered.prompt || "abstract futuristic art";
    const { prompt: _prompt, ...queryParams } = filtered;
    const qs = new URLSearchParams(queryParams).toString();
    return `${base}${path}/${encodeURIComponent(prompt)}${qs ? "?" + qs : ""}`;
  }

  const qs = new URLSearchParams(filtered).toString();
  if (!qs) return `${base}${path}`;
  const separator = path.includes("?") ? "&" : "?";
  return `${base}${path}${separator}${qs}`;
}

function buildLegacyProxyUrl(path: string, params: Record<string, string>) {
  if (/^https?:\/\//i.test(path)) return path;
  const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ""));
  const qs = new URLSearchParams(filtered).toString();
  const legacyPath = path.startsWith("/api/") ? `/api/v1${path}` : path;
  return `${BASE}${legacyPath}${qs ? "?" + qs : ""}`;
}

function canUseProxyFallback(path: string) {
  if (/^https?:\/\//i.test(path)) return false;
  return (
    path.startsWith("/api/") &&
    !path.startsWith("/api/pollinations") &&
    !path.startsWith("/api/onlyfiles") &&
    !path.startsWith("/api/movie") &&
    path !== "/api/youtube"
  );
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit, timeoutMs = 30000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal, headers: { accept: "application/json, image/*, video/*, text/plain, */*", ...(init?.headers ?? {}) } });
  } finally {
    window.clearTimeout(timer);
  }
}

async function readWithTimeout<T>(promise: Promise<T>, timeoutMs = 30000): Promise<T> {
  let timer: number | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = window.setTimeout(() => reject(new Error("Response body timed out after 30 seconds")), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) window.clearTimeout(timer);
  }
}

function stripCreatorMetadata(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripCreatorMetadata);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => {
          const lk = key.toLowerCase();
          return lk !== "creator" && lk !== "author" && lk !== "credit" && lk !== "credits" && lk !== "by" && lk !== "made_by";
        })
        .map(([key, child]) => {
          if (key.toLowerCase() === "source" && typeof child === "string") {
            return [key, "/api/movie"];
          }
          return [key, stripCreatorMetadata(child)];
        })
    );
  }
  if (typeof value === "string") {
    return value
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
  return value;
}

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?|$)/i;
const IMAGE_HOST = /^https?:\/\/.+/i;

function extractImageUrls(val: unknown, found: string[] = [], maxImages = 4): string[] {
  if (found.length >= maxImages) return found;
  if (typeof val === "string") {
    if (IMAGE_EXT.test(val) && IMAGE_HOST.test(val) && !found.includes(val)) {
      found.push(val);
    }
  } else if (Array.isArray(val)) {
    for (const v of val) {
      if (found.length >= maxImages) break;
      extractImageUrls(v, found, maxImages);
    }
  } else if (val && typeof val === "object") {
    for (const v of Object.values(val as object)) {
      if (found.length >= maxImages) break;
      extractImageUrls(v, found, maxImages);
    }
  }
  return found;
}

class SafeBoundary extends Component<{ children: ReactNode; onReset?: () => void }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SafeBoundary error caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center my-4">
          <AlertTriangle className="text-red-400 mx-auto mb-2" size={28} />
          <h4 className="font-bold text-red-400 text-sm">Safe error recovery</h4>
          <p className="text-xs text-[var(--fg4)] mt-1 mb-3">A rendering issue was intercepted safely to protect your browser session.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset?.();
            }}
            className="px-4 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold transition-colors"
          >
            Dismiss & Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

type ResponseState =
  | { kind: "none" }
  | { kind: "loading" }
  | { kind: "image"; src: string; status: number; latencyMs: number }
  | { kind: "video"; src: string; status: number; latencyMs: number }
  | { kind: "json"; text: string; images: string[]; status: number; latencyMs: number }
  | { kind: "text"; text: string; status: number; latencyMs: number }
  | { kind: "error"; message: string; status: number; latencyMs: number };

function StatusBadge({ code, latency }: { code: number; latency?: number }) {
  const ok = code >= 200 && code < 300;
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border tracking-wide ${
        ok ? "bg-[var(--emerald-bg)] border-[var(--emerald-brd)] text-[var(--emerald)]" 
           : "bg-red-500/10 border-red-500/20 text-red-500"
      }`}>
        {code} {ok ? "OK" : "ERR"}
      </span>
      {typeof latency === "number" && latency > 0 && (
        <span className="text-[11px] font-mono text-[var(--fg4)] flex items-center gap-1">
          <Clock size={11} /> {latency}ms
        </span>
      )}
    </div>
  );
}

function ImagePreview({ src }: { src: string }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  const noMenu = (e: React.MouseEvent | React.TouchEvent) => e.preventDefault();
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      onContextMenu={noMenu}
      className="block rounded-xl overflow-hidden bg-[var(--card2)] border border-[var(--brd)] relative group"
    >
      <img
        src={src}
        alt="response"
        onError={() => setErr(true)}
        onContextMenu={noMenu}
        draggable={false}
        className="w-full h-auto max-h-[50vh] object-contain block select-none"
        style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
      />
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <ExternalLink size={14} color="#fff" />
      </div>
    </a>
  );
}

function MethodBadge({ method }: { method: string }) {
  const isGet = method.toUpperCase() === "GET";
  const isPost = method.toUpperCase() === "POST";
  return (
    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase border shrink-0 ${
      isGet ? "bg-[var(--emerald-bg)] border-[var(--emerald-brd)] text-[var(--emerald)]"
      : isPost ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
    }`}>
      {method || "GET"}
    </span>
  );
}

// ── Code Snippet Generator Modal Section ──
function CodeSnippets({ url, method }: { url: string; method: string }) {
  const [lang, setLang] = useState<"curl" | "js" | "python" | "node">("curl");
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const snippets = {
    curl: `curl -X ${method.toUpperCase()} "${fullUrl}"`,
    js: `// Fetch request in browser / JavaScript
const response = await fetch("${fullUrl}");
const data = await response.json();
console.log(data);`,
    python: `# Python requests
import requests

response = requests.get("${fullUrl}")
data = response.json()
print(data)`,
    node: `// Node.js (axios)
import axios from "axios";

const { data } = await axios.get("${fullUrl}");
console.log(data);`
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(snippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-xl border border-[var(--brd)] bg-[var(--card2)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--brd2)] bg-[var(--inp)]">
        <div className="flex items-center gap-1">
          {(["curl", "js", "python", "node"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-colors ${
                lang === l ? "bg-[var(--accent)] text-white" : "text-[var(--fg4)] hover:text-[var(--fg)]"
              }`}
            >
              {l === "curl" ? "cURL" : l === "js" ? "JavaScript" : l === "python" ? "Python" : "Node.js"}
            </button>
          ))}
        </div>
        <button
          onClick={copySnippet}
          className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--fg3)] hover:text-[var(--accent)] transition-colors"
        >
          {copied ? <Check size={13} className="text-[var(--emerald)]" /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="p-3 text-[12px] font-mono text-[var(--fg2)] overflow-x-auto whitespace-pre leading-relaxed no-scrollbar">
        {snippets[lang]}
      </pre>
    </div>
  );
}

function ApiTesterModal({ endpoint, onClose, onToast, userRating, onRate }: {
  endpoint: Endpoint;
  onClose: () => void;
  onToast: (msg: string) => void;
  userRating?: number;
  onRate?: (path: string, stars: number) => void;
}) {
  const [params, setParams] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(endpoint.params).map(([k, v]) => [k, String(v)]))
  );
  const [resp, setResp] = useState<ResponseState>({ kind: "none" });
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const isUploadEndpoint = endpoint.path.includes("upload") || (endpoint.method === "POST" && endpoint.path.includes("onlyfiles"));
  const url = buildUrl(endpoint.path, params);
  const isImageGenerator = endpoint.path === "/api/pollinations/prompt";

  async function run() {
    setResp({ kind: "loading" });
    const startTime = performance.now();
    let res: Response | null = null;
    let contentType = "";
    let lastError: Error | null = null;

    if (isUploadEndpoint) {
      try {
        const formData = new FormData();
        if (uploadFile) {
          formData.append("file", uploadFile);
        } else {
          const sampleBlob = new Blob(
            [`Kaalix Free APIs - File Upload Verification\nTime: ${new Date().toISOString()}\nSize: 76 bytes`],
            { type: "text/plain" }
          );
          formData.append("file", sampleBlob, "kaalix-sample.txt");
        }
        if (params.expire) {
          formData.append("expire", params.expire);
        }

        const candidateRes = await fetchWithTimeout(endpoint.path, {
          method: "POST",
          body: formData,
        });
        res = candidateRes;
        contentType = candidateRes.headers.get("content-type") ?? "";
      } catch (e) {
        lastError = e as Error;
      }
    } else if (endpoint.method === "POST") {
      try {
        const candidateRes = await fetchWithTimeout(endpoint.path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });
        res = candidateRes;
        contentType = candidateRes.headers.get("content-type") ?? "";
      } catch (e) {
        lastError = e as Error;
      }
    } else {
      const candidates = [url];
      if (canUseProxyFallback(endpoint.path)) candidates.push(buildLegacyProxyUrl(endpoint.path, params));

      for (const candidate of candidates) {
        try {
          const candidateRes = await fetchWithTimeout(candidate);
          const candidateType = candidateRes.headers.get("content-type") ?? "";
          const looksLikeAppShell = candidateType.includes("text/html");
          if (candidateRes.ok && !looksLikeAppShell) {
            res = candidateRes;
            contentType = candidateType;
            break;
          }
          res = candidateRes;
          contentType = candidateType;
        } catch (e) {
          lastError = e as Error;
        }
      }
    }

    const latencyMs = Math.round(performance.now() - startTime);

    if (!res || !res.ok || (contentType.includes("text/html") && !endpoint.path.includes("download"))) {
      let detail = lastError?.message || "The API proxy did not return a usable response";
      if (res) {
        try {
          const raw = await readWithTimeout(res.text());
          const parsed = JSON.parse(raw) as { message?: string; error?: string };
          detail = parsed.message || parsed.error || raw.slice(0, 180) || detail;
        } catch {
          // Keep message
        }
      }
      const status = res?.status ?? 0;
      setResp({ kind: "error", message: status ? `${status} ${res?.statusText || "Error"} — ${detail}` : `Network error — ${detail}`, status, latencyMs });
      return;
    }

    try {
      if (contentType.startsWith("image/")) {
        const blob = await readWithTimeout(res.blob());
        setResp({ kind: "image", src: URL.createObjectURL(blob), status: res.status, latencyMs });
      } else if (contentType.startsWith("video/")) {
        const blob = await readWithTimeout(res.blob());
        setResp({ kind: "video", src: URL.createObjectURL(blob), status: res.status, latencyMs });
      } else {
        const raw = await readWithTimeout(res.text());
        if (contentType.includes("application/json")) {
          let cleanedJson: any;
          try {
            const json = JSON.parse(raw);
            cleanedJson = stripCreatorMetadata(json);
          } catch {
            cleanedJson = raw;
          }
          const formatted = typeof cleanedJson === "object" ? JSON.stringify(cleanedJson, null, 2) : String(cleanedJson);
          const images = extractImageUrls(cleanedJson, [], 4);
          setResp({
            kind: "json",
            text: formatted,
            images,
            status: res.status,
            latencyMs,
          });
        } else {
          setResp({ kind: "text", text: raw, status: res.status, latencyMs });
        }
      }
    } catch (e) {
      const error = e as Error;
      setResp({ kind: "error", message: error.message || "The response could not be read", status: res.status, latencyMs });
    }
  }

  function copyUrl() {
    const full = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    onToast("Endpoint URL copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  }

  function copyResponse() {
    if (resp.kind === "json" || resp.kind === "text") {
      navigator.clipboard.writeText(resp.text);
      onToast("Response copied to clipboard!");
    }
  }

  const preStyle: React.CSSProperties = {
    background: "var(--card2)", border: "1px solid var(--brd)", borderRadius: 12,
    padding: "16px", color: "var(--fg3)", fontSize: 13,
    fontFamily: '"JetBrains Mono", monospace', overflowX: "auto",
    maxHeight: 280, overflowY: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6,
  };

  return (
    <div className="api-tester-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="api-tester-modal">
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--brd)]" />
        </div>
        
        <div className="flex items-start justify-between p-5 lg:p-6 border-b border-[var(--brd2)] bg-[var(--card2)] lg:rounded-t-[24px]">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <MethodBadge method={endpoint.method} />
              {endpoint.nsfw && (
                <span className="text-[10px] font-extrabold bg-red-500/10 border border-red-500/20 text-red-500 px-1.5 py-0.5 rounded-md">18+</span>
              )}
              {onRate && (
                <div className="flex items-center gap-1.5 bg-[var(--inp)] border border-[var(--brd2)] px-2.5 py-1 rounded-xl">
                  <StarRatingWidget
                    path={endpoint.name}
                    ratingData={getEndpointRatingData(endpoint.name, userRating)}
                    onRate={onRate}
                  />
                </div>
              )}
            </div>
            <div className="font-bold text-xl text-[var(--fg)] leading-snug">{endpoint.name}</div>
            <div className="text-[14px] text-[var(--fg3)] mt-1.5 leading-relaxed font-medium">{endpoint.description}</div>
          </div>
          <button onClick={onClose} className="btn-icon w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 lg:p-6 flex flex-col gap-5 overflow-y-auto no-scrollbar">
          {isImageGenerator && (
            <div className="generator-callout rounded-2xl p-4 flex items-start gap-3">
              <div className="generator-callout-icon w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-[var(--fg)]">Describe your scene</div>
                <div className="text-[12px] text-[var(--fg3)] mt-1 leading-relaxed">Use a detailed prompt for richer results. Your prompt is sent to Pollinations as an image URL.</div>
              </div>
            </div>
          )}

          {isUploadEndpoint && (
            <div className="p-4 rounded-2xl border-2 border-dashed border-[var(--accent)]/40 bg-[var(--accent)]/5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UploadCloud size={20} className="text-[var(--accent)]" />
                  <span className="text-[13px] font-bold text-[var(--fg)]">Upload File</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const sample = new File([`Kaalix Free APIs Test File — ${new Date().toISOString()}`], "demo-note.txt", { type: "text/plain" });
                    setUploadFile(sample);
                    onToast("Sample demo file selected!");
                  }}
                  className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                >
                  Use Sample File
                </button>
              </div>

              <input
                type="file"
                id="modal-file-upload-input"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setUploadFile(e.target.files[0]);
                }}
              />

              <label
                htmlFor="modal-file-upload-input"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[var(--inp)] border border-[var(--brd)] hover:border-[var(--accent)] cursor-pointer transition-all text-center"
              >
                {uploadFile ? (
                  <div className="flex items-center gap-2 text-[13px] font-mono text-[var(--emerald)]">
                    <FileText size={18} />
                    <span className="font-bold">{uploadFile.name}</span>
                    <span className="text-[11px] text-[var(--fg4)]">({(uploadFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[13px] font-semibold text-[var(--fg2)]">Click to choose file or drop here</span>
                    <span className="text-[11px] text-[var(--fg4)]">Supports documents, images, audio, zip (Max 100MB)</span>
                  </div>
                )}
              </label>
            </div>
          )}

          {Object.keys(params).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-bold text-[var(--fg4)] uppercase tracking-widest">Parameters</div>
                <button
                  onClick={() => setParams(Object.fromEntries(Object.entries(endpoint.params).map(([k, v]) => [k, String(v)])))}
                  className="text-[11px] text-[var(--fg4)] hover:text-[var(--accent)] font-medium transition-colors"
                >
                  Reset defaults
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {Object.entries(params).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-[13px] font-mono font-semibold text-[var(--fg3)] w-24 text-right shrink-0">{key}</span>
                    <input
                      value={val}
                      onChange={(e) => setParams((p) => ({ ...p, [key]: e.target.value }))}
                      className="glass-input w-full rounded-xl py-2 px-3.5 text-[14px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 bg-[var(--card2)] border border-[var(--brd)] rounded-xl p-2.5 pl-4">
            <code className="flex-1 min-w-0 text-[13px] font-mono text-[var(--accent)] break-all leading-relaxed">{url}</code>
            <button onClick={copyUrl} className="btn-icon w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" title="Copy endpoint URL">
              {copied ? <Check size={16} className="text-[var(--emerald)]" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={run} disabled={resp.kind === "loading"} className="btn-violet rounded-xl py-3 px-5 flex-1 flex items-center justify-center gap-2 font-bold text-[15px] disabled:opacity-80">
              {resp.kind === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
              {resp.kind === "loading" ? "Executing..." : isUploadEndpoint ? "Upload File & Test" : "Run API Request"}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 text-[13px] font-bold transition-colors ${
                showCode ? "bg-[var(--accent-muted)] border-[var(--accent)] text-[var(--accent)]" : "bg-[var(--inp)] border-[var(--brd)] text-[var(--fg3)] hover:text-[var(--fg)]"
              }`}
              title="Show code snippets"
            >
              <Code2 size={16} />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>

          {showCode && <CodeSnippets url={url} method={endpoint.method} />}

          {resp.kind !== "none" && resp.kind !== "loading" && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--fg4)]">Response</span>
                  <StatusBadge code={resp.status} latency={resp.latencyMs} />
                </div>
                {(resp.kind === "json" || resp.kind === "text") && (
                  <button onClick={copyResponse} className="flex items-center gap-1 text-[12px] font-medium text-[var(--fg3)] hover:text-[var(--accent)]">
                    <Copy size={12} /> Copy JSON
                  </button>
                )}
              </div>
              
              {resp.kind === "image" && <ImagePreview src={resp.src} />}
              {resp.kind === "video" && (
                <div className="flex flex-col gap-3">
                  <video src={resp.src} controls playsInline className="w-full rounded-xl border border-[var(--brd)] bg-black" />
                  <a href={resp.src} download="kaalix-media.mp4" className="btn-violet rounded-xl py-3 px-4 text-center font-bold text-[14px]">Download Video</a>
                </div>
              )}
              {resp.kind === "json" && (
                <div className="flex flex-col gap-2">
                  {resp.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {resp.images.slice(0, 4).map((src, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-[var(--brd)] bg-[var(--card2)] aspect-video relative group shadow-sm">
                          <img src={src} alt="Preview" className="w-full h-full object-cover" loading="lazy" />
                          <a href={src} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] font-bold transition-opacity">
                            View Image
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {resp.text.length > 35000 ? (
                    <div>
                      <div className="mb-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[12px] flex items-center justify-between gap-2">
                        <span>⚠️ Large response ({(resp.text.length / 1024).toFixed(1)} KB). Display preview truncated to protect performance.</span>
                        <button
                          onClick={copyResponse}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold shrink-0 transition-colors"
                        >
                          Copy Full JSON
                        </button>
                      </div>
                      <pre style={preStyle}>
                        {resp.text.slice(0, 35000)}
                        {"\n\n/* ... [Truncated for performance: Total " + (resp.text.length / 1024).toFixed(1) + " KB]. Click 'Copy JSON' for full response ... */"}
                      </pre>
                    </div>
                  ) : (
                    <pre style={preStyle}>{resp.text}</pre>
                  )}
                </div>
              )}
              {resp.kind === "text" && (
                resp.text.length > 35000 ? (
                  <div>
                    <div className="mb-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[12px] flex items-center justify-between gap-2">
                      <span>⚠️ Large text ({(resp.text.length / 1024).toFixed(1)} KB). Preview truncated to prevent browser freeze.</span>
                      <button
                        onClick={copyResponse}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold shrink-0 transition-colors"
                      >
                        Copy Full Text
                      </button>
                    </div>
                    <pre style={preStyle}>
                      {resp.text.slice(0, 35000)}
                      {"\n\n/* ... [Truncated] ... */"}
                    </pre>
                  </div>
                ) : (
                  <pre style={preStyle}>{resp.text}</pre>
                )
              )}
              {resp.kind === "error" && (
                <div className="api-error-card rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="api-error-icon w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      <AlertTriangle size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-red-400 text-[11px] font-black uppercase tracking-[0.16em] mb-1.5">
                        Request failed
                      </div>
                      <div className="text-[var(--fg)] font-semibold text-[14px] leading-relaxed break-words">
                        {resp.message}
                      </div>
                    </div>
                  </div>
                  <button onClick={run} className="api-retry-button mt-4 w-full rounded-xl py-2.5 flex items-center justify-center gap-2 text-[13px] font-extrabold">
                    <RotateCcw size={14} /> Try again
                  </button>
                </div>
              )}

              {onRate && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Star size={17} className="text-amber-400 shrink-0" fill="currentColor" />
                    <div>
                      <div className="text-[12px] font-bold text-[var(--fg)]">Rate this API experience</div>
                      <div className="text-[11px] text-[var(--fg4)]">Help developers find the most reliable free endpoints</div>
                    </div>
                  </div>
                  <StarRatingWidget
                    path={endpoint.name}
                    ratingData={getEndpointRatingData(endpoint.name, userRating)}
                    onRate={onRate}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card Component for Grid View ──
function EndpointCard({
  ep,
  isFavorite,
  userRating,
  onToggleFavorite,
  onTry,
  onCopyUrl,
  onRate,
}: {
  ep: Endpoint;
  isFavorite: boolean;
  userRating?: number;
  onToggleFavorite: () => void;
  onTry: () => void;
  onCopyUrl: () => void;
  onRate: (path: string, stars: number) => void;
}) {
  const paramKeys = Object.keys(ep.params);
  const ratingData = getEndpointRatingData(ep.name, userRating);

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col justify-between group hover:border-[var(--accent)] transition-all duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <MethodBadge method={ep.method} />
            {ep.nsfw && (
              <span className="text-[9px] font-extrabold bg-red-500/10 border border-red-500/20 text-red-500 px-1.5 py-0.5 rounded">
                18+
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite ? "text-amber-400 bg-amber-400/10" : "text-[var(--fg4)] hover:text-amber-400"
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <h4 className="font-bold text-[15px] text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors leading-tight mb-1.5">
          {ep.name}
        </h4>

        {/* 5-Star Interactive Rating Widget */}
        <div className="mb-2.5">
          <StarRatingWidget
            path={ep.name}
            ratingData={ratingData}
            onRate={onRate}
          />
        </div>

        <p className="text-[12px] text-[var(--fg3)] line-clamp-2 leading-relaxed mb-3">
          {ep.description}
        </p>

        {paramKeys.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mb-4">
            {paramKeys.slice(0, 3).map((k) => (
              <span key={k} className="text-[10px] font-mono text-[var(--fg4)] bg-[var(--inp)] px-1.5 py-0.5 rounded border border-[var(--brd2)]">
                ?{k}
              </span>
            ))}
            {paramKeys.length > 3 && (
              <span className="text-[10px] text-[var(--fg4)]">+{paramKeys.length - 3}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[var(--brd2)]">
        <button
          onClick={onCopyUrl}
          className="btn-icon p-2 rounded-xl text-[var(--fg3)] hover:text-[var(--accent)] flex items-center justify-center transition-colors"
          title="Copy URL"
        >
          <Copy size={13} />
        </button>
        <button
          onClick={onTry}
          className="btn-violet flex-1 py-1.5 px-3 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5"
        >
          <Play size={12} fill="currentColor" />
          <span>Test API</span>
        </button>
      </div>
    </div>
  );
}

// ── Row Component for List View ──
function EndpointRow({
  ep,
  isFavorite,
  userRating,
  onToggleFavorite,
  onTry,
  onCopyUrl,
  onRate,
}: {
  ep: Endpoint;
  isFavorite: boolean;
  userRating?: number;
  onToggleFavorite: () => void;
  onTry: () => void;
  onCopyUrl: () => void;
  onRate: (path: string, stars: number) => void;
}) {
  const ratingData = getEndpointRatingData(ep.name, userRating);

  return (
    <div className="endpoint-row w-full flex items-center gap-3 py-3 px-4 lg:px-5 group">
      <button
        onClick={onToggleFavorite}
        className={`p-1.5 rounded-lg shrink-0 transition-colors ${
          isFavorite ? "text-amber-400 bg-amber-400/10" : "text-[var(--fg4)] hover:text-amber-400"
        }`}
        title="Favorite"
      >
        <Star size={14} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <MethodBadge method={ep.method} />

      <div className="flex-1 min-w-0 cursor-pointer" onClick={onTry}>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[14px] font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
            {ep.name}
          </span>
          {ep.nsfw && (
            <span className="text-[9px] font-extrabold bg-red-500/10 border border-red-500/20 text-red-500 px-1.5 py-0.5 rounded-md">
              18+
            </span>
          )}
          <StarRatingWidget
            path={ep.name}
            ratingData={ratingData}
            onRate={onRate}
            compact={true}
          />
        </div>
        <div className="text-[12px] text-[var(--fg4)] truncate mt-0.5 font-medium">
          {ep.description}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onCopyUrl}
          className="btn-icon p-1.5 rounded-lg text-[var(--fg4)] hover:text-[var(--accent)] transition-colors"
          title="Copy URL"
        >
          <Copy size={13} />
        </button>
        <button
          onClick={onTry}
          className="btn-violet py-1.5 px-3 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0"
        >
          <span>Test</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

function CategorySection({
  cat,
  viewMode,
  favorites,
  ratings,
  onToggleFavorite,
  onTry,
  onCopyUrl,
  onRate,
  isActive,
}: {
  cat: Category;
  viewMode: "grid" | "list";
  favorites: string[];
  ratings: Record<string, number>;
  onToggleFavorite: (path: string) => void;
  onTry: (ep: Endpoint) => void;
  onCopyUrl: (ep: Endpoint) => void;
  onRate: (path: string, stars: number) => void;
  isActive: boolean;
}) {
  return (
    <section
      id={`cat-${cat.key}`}
      className={`glass-card rounded-[24px] mb-6 overflow-hidden transition-all duration-300 ${
        isActive ? "!border-[var(--accent)] ring-4 ring-[var(--accent-muted)]" : ""
      }`}
    >
      <div className={`flex items-center gap-4 p-4 lg:p-5 border-b border-[var(--brd2)] transition-colors ${
        isActive ? "bg-[var(--accent-muted)]" : "bg-[var(--card2)]"
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
          isActive ? "bg-[var(--accent)] shadow-[0_4px_16px_rgba(0,200,255,0.3)] text-white" : "bg-[var(--inp)] border border-[var(--brd)] text-[var(--fg3)]"
        }`}>
          <CategoryIcon name={cat.iconName} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-[17px] ${isActive ? "text-[var(--accent)]" : "text-[var(--fg)]"}`}>
            {cat.label}
          </h3>
          <p className="text-[12px] text-[var(--fg4)] truncate">
            {cat.endpoints.length} active route{cat.endpoints.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {cat.endpoints.map((ep) => (
            <EndpointCard
              key={`${cat.key}-${ep.name}`}
              ep={ep}
              isFavorite={favorites.includes(ep.name) || favorites.includes(ep.path)}
              userRating={ratings[ep.name] ?? ratings[ep.path]}
              onToggleFavorite={() => onToggleFavorite(ep.name)}
              onTry={() => onTry(ep)}
              onCopyUrl={() => onCopyUrl(ep)}
              onRate={onRate}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {cat.endpoints.map((ep) => (
            <EndpointRow
              key={`${cat.key}-${ep.name}`}
              ep={ep}
              isFavorite={favorites.includes(ep.name) || favorites.includes(ep.path)}
              userRating={ratings[ep.name] ?? ratings[ep.path]}
              onToggleFavorite={() => onToggleFavorite(ep.name)}
              onTry={() => onTry(ep)}
              onCopyUrl={() => onCopyUrl(ep)}
              onRate={onRate}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: Category[];
  active: string | null;
  onSelect: (k: string) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5 border-t border-[var(--brd2)]">
      {categories.map((cat) => {
        const sel = active === cat.key;
        return (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[13px] font-bold whitespace-nowrap shrink-0 transition-all duration-200 border ${
              sel
                ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-[0_4px_14px_rgba(0,200,255,0.35)]"
                : "bg-[var(--card)] border-[var(--brd)] text-[var(--fg3)] hover:bg-[var(--inp)]"
            }`}
          >
            <CategoryIcon name={cat.iconName} size={14} style={{ color: sel ? "#fff" : "var(--fg4)" }} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

function BackgroundEffects() {
  const [images, setImages] = useState<{ src: string; id: number }[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let isMounted = true;
    let count = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const fetchImage = async () => {
      try {
        const urlPath = count % 2 === 0 ? "/api/waifu" : "/api/cosplay";
        const res = await fetch(`${BASE}${urlPath}`);
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        const urls = extractImageUrls(data);
        if (urls.length > 0 && isMounted) {
          const newSrc = urls[0];
          setImages((prev) => {
            const next = [...prev, { src: newSrc, id: count }];
            if (next.length > 2) return next.slice(-2);
            return next;
          });
          setActiveIndex(count);
          const favicon = document.getElementById("dyn-favicon") as HTMLLinkElement | null;
          if (favicon) favicon.href = newSrc;
          count++;
          timerId = setTimeout(fetchImage, 60000);
        } else {
          throw new Error("no images");
        }
      } catch {
        if (isMounted) {
          timerId = setTimeout(fetchImage, 15000);
        }
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-[var(--pg)] to-[#0f091a]">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: activeIndex === img.id ? 1 : 0,
            filter: "blur(18px)",
            transform: "scale(1.08)",
          }}
          alt=""
        />
      ))}
      <div className="absolute inset-0" style={{ background: "var(--overlay)" }} />
    </div>
  );
}

function ProfileModal({ onClose }: { onClose: () => void }) {
  const [muted, setMuted] = useState(true);
  const userToggledMute = useRef(false);
  const stallRetries = useRef(0);
  const [videoIdx, setVideoIdx] = useState(() => Math.floor(Date.now() / (1000 * 60 * 60)) % PROFILE_VIDEOS.length);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const msInHour = 1000 * 60 * 60;
    const msUntilNext = msInHour - (Date.now() % msInHour);
    const t = setTimeout(() => setVideoIdx((p) => (p + 1) % PROFILE_VIDEOS.length), msUntilNext);
    return () => clearTimeout(t);
  }, [videoIdx]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, videoIdx]);

  const handlePlay = () => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  };

  const handleStall = () => {
    const v = videoRef.current;
    if (!v) return;
    stallRetries.current += 1;
    if (stallRetries.current <= 2) {
      window.setTimeout(() => v.play().catch(() => {}), 180);
    } else {
      stallRetries.current = 0;
      const t = Number.isFinite(v.currentTime) ? v.currentTime : 0;
      v.load();
      try { v.currentTime = t; } catch {}
      v.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    const v = videoRef.current;
    if (!v || videoFailed) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const toggleSound = () => {
    userToggledMute.current = true;
    setMuted((prev) => !prev);
  };

  return (
    <div
      className="pm-backdrop fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(18px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pm-card w-full max-w-[350px] rounded-[28px] overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 40px 100px rgba(0,0,0,0.8), 0 0 70px rgba(0,180,255,0.08)"
        }}>

        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <img src="/profile.jpg" alt="" aria-hidden="true" className={`pm-video-fallback absolute inset-0 w-full h-full object-cover select-none ${videoFailed ? "is-visible" : ""}`} />
          <video
            key={videoIdx}
            ref={videoRef}
            src={PROFILE_VIDEOS[videoIdx]}
            poster="/profile.jpg"
            autoPlay loop playsInline muted preload="auto"
            onPlay={handlePlay}
            onEnded={handleVideoEnded}
            onError={() => setVideoFailed(true)}
            onWaiting={handleStall}
            onStalled={handleStall}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            className={`pm-video absolute inset-0 w-full h-full object-cover select-none ${videoFailed ? "is-failed" : ""}`}
            style={{ WebkitTouchCallout: "none" } as React.CSSProperties}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(6,8,22,0.6) 80%, rgba(6,8,22,1) 100%)" }} />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <button onClick={toggleSound}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.14)", color: muted ? "rgba(255,255,255,0.55)" : "#4ade80" }}>
              {muted ? <><VolumeX size={12}/><span>Sound off</span></> : <><Volume2 size={12}/><span>Sound on</span></>}
            </button>
            <div className="flex items-center gap-1.5">
              {PROFILE_VIDEOS.map((_, i) => (
                <span key={i} className="rounded-full transition-all duration-300"
                  style={{ width: i === videoIdx ? "14px" : "5px", height: "5px", background: i === videoIdx ? "#fff" : "rgba(255,255,255,0.3)" }} />
              ))}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <X size={14} color="#fff" />
            </button>
          </div>
        </div>

        <div style={{ background: "linear-gradient(180deg, #060816 0%, #08091c 100%)" }}>
          <div className="flex justify-center" style={{ marginTop: "-44px" }}>
            <div className="pm-avatar pm-float relative">
              <div className="pm-ring absolute -inset-[3px] rounded-full"
                style={{ background: "conic-gradient(from 0deg, #00c8ff, #818cf8, #f9c74f, #4ade80, #00c8ff)", filter: "blur(2px)" }} />
              <div className="pm-glow absolute -inset-3 rounded-full opacity-50"
                style={{ background: "radial-gradient(circle, rgba(0,200,255,0.4) 0%, transparent 70%)" }} />
              <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden"
                style={{ border: "3px solid #060816" }}>
                <img src="/profile.jpg" alt="avatar" draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-full h-full object-cover select-none" style={{ WebkitTouchCallout: "none" } as React.CSSProperties} />
              </div>
              <span className="pm-dot absolute bottom-1.5 right-1 w-3.5 h-3.5 rounded-full bg-green-400"
                style={{ border: "2.5px solid #060816", boxShadow: "0 0 10px #4ade80" }} />
            </div>
          </div>

          <div className="pm-row-1 flex flex-col items-center px-5 pt-3 pb-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-[17px] sm:text-[22px] tracking-tight leading-none text-center">ＲＯＣＫＹܓ ＢＨＡＩ !</span>
              <img src="/badge.png" alt="verified" draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-[22px] h-[22px] object-contain select-none" style={{ WebkitTouchCallout: "none" } as React.CSSProperties} />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <span className="pm-dot w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 5px #4ade80" }} />
              <span className="pm-shimmer-text text-[10.5px] font-black tracking-[0.18em] uppercase">Owner &amp; Developer</span>
            </div>
          </div>

          <div className="px-4 pt-3 pb-2">
            <button
              onClick={() => openLink("tg://openmessage?user_id=8703382327")}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              className="pm-link-btn pm-row-2 flex items-center justify-center gap-2.5 w-full py-3 rounded-2xl font-bold text-[14px] text-white transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: "linear-gradient(90deg, #0088cc 0%, #00aaff 100%)", boxShadow: "0 4px 24px rgba(0,170,255,0.35)" }}>
              <Send size={15} />
              Send Thanks ❤️
            </button>
          </div>

          <div className="px-4 pb-2 flex gap-2">
            <button
              onClick={() => openLink("https://t.me/autolikegc")}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              className="pm-link-btn pm-social-card pm-group-card pm-row-3 flex-1 flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-left transition-all hover:brightness-110"
              style={{ background: "rgba(88,166,255,0.1)", border: "1px solid rgba(88,166,255,0.24)" }}>
              <span className="pm-social-icon"><Users size={15} /></span>
              <span><strong>Group</strong><small>Join community</small></span>
            </button>
            <button
              onClick={() => openLink("https://t.me/+bUatHAfpxIRmMjM9")}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
              className="pm-link-btn pm-social-card pm-channel-card pm-row-4 flex-1 flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-left transition-all hover:brightness-110"
              style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.24)" }}>
              <span className="pm-social-icon"><Send size={15} /></span>
              <span><strong>Channel</strong><small>Get updates</small></span>
            </button>
          </div>

          <div className="pm-row-5 flex items-center justify-center gap-2 pb-4 pt-1">
            <CalendarDays size={12} style={{ color: "rgba(255,255,255,0.25)" }} />
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.28)" }}>Dec 01, 2006 · 19 years old</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("kaalix-theme");
    return saved ? saved === "dark" : true;
  });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [upstreamOnline, setUpstreamOnline] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickFilter, setQuickFilter] = useState<"all" | "favorites" | "top-rated">("all");
  const [toast, setToast] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // User Ratings stored in localStorage
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("kaalix_ratings");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleRate = (path: string, stars: number) => {
    setRatings((prev) => {
      const next = { ...prev, [path]: stars };
      localStorage.setItem("kaalix_ratings", JSON.stringify(next));
      return next;
    });
    showToast(`You rated ${stars} star${stars > 1 ? "s" : ""}! ⭐ Thank you!`);
  };

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("kaalix_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const toggleFavorite = (path: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(path);
      const next = exists ? prev.filter((p) => p !== path) : [...prev, path];
      localStorage.setItem("kaalix_favorites", JSON.stringify(next));
      showToast(exists ? "Removed from favorites" : "Added to favorites ⭐");
      return next;
    });
  };

  const handleCopyEndpointUrl = (ep: Endpoint) => {
    const url = buildUrl(ep.path, ep.params);
    const full = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(full);
    showToast(`Copied ${ep.name} URL!`);
  };

  // Keyboard shortcut listener for Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape") {
        setSelectedEndpoint(null);
        setShowProfile(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allCategories = defaultCategories;

  const totalEndpointsCount = useMemo(() => {
    return allCategories.reduce((sum, c) => sum + c.endpoints.length, 0);
  }, [allCategories]);

  useEffect(() => {
    let mounted = true;
    const checkUpstream = async () => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(`${BASE}/api`, { method: "GET", cache: "no-store", signal: controller.signal });
        if (mounted) setUpstreamOnline(response.ok || response.status < 500);
      } catch {
        if (mounted) setUpstreamOnline(false);
      } finally {
        window.clearTimeout(timer);
      }
    };
    checkUpstream();
    const interval = window.setInterval(checkUpstream, 10 * 60 * 60 * 1000);
    return () => { mounted = false; window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("kaalix-theme", dark ? "dark" : "light");
  }, [dark]);

  const filteredCategories = useMemo(() => {
    let base = allCategories;

    // Apply quick filters
    if (quickFilter === "favorites") {
      base = base
        .map((cat) => ({
          ...cat,
          endpoints: cat.endpoints.filter((ep) => favorites.includes(ep.name) || favorites.includes(ep.path)),
        }))
        .filter((cat) => cat.endpoints.length > 0);
    } else if (quickFilter === "top-rated") {
      base = base
        .map((cat) => ({
          ...cat,
          endpoints: cat.endpoints
            .filter((ep) => {
              const r = getEndpointRatingData(ep.name, ratings[ep.name] ?? ratings[ep.path]);
              return r.score >= 4.8;
            })
            .sort((a, b) => {
              const rA = getEndpointRatingData(a.name, ratings[a.name] ?? ratings[a.path]);
              const rB = getEndpointRatingData(b.name, ratings[b.name] ?? ratings[b.path]);
              return rB.score - rA.score;
            }),
        }))
        .filter((cat) => cat.endpoints.length > 0);
    }

    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base
      .map((cat) => ({
        ...cat,
        endpoints: cat.endpoints.filter(
          (ep) =>
            ep.name.toLowerCase().includes(q) ||
            ep.description.toLowerCase().includes(q) ||
            ep.path.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.endpoints.length > 0);
  }, [allCategories, search, quickFilter, favorites, ratings]);

  function scrollTo(key: string) {
    setActiveCategory(key);
    setTimeout(() => {
      document.getElementById(`cat-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <BackgroundEffects />
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] bg-[var(--card)] border border-[var(--accent)] text-[var(--fg)] px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2.5 animate-bounce-short">
          <Sparkles size={16} className="text-[var(--accent)] shrink-0" />
          <span className="text-[13px] font-semibold">{toast}</span>
        </div>
      )}

      {!upstreamOnline && (
        <div className="upstream-maintenance" role="status">
          <div>
            <span className="upstream-maintenance-dot" />
            <strong>API maintenance mode</strong>
            <p>The upstream is temporarily unavailable. The workspace will automatically return when it comes back online.</p>
          </div>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      <div className="nova-app">
        {selectedEndpoint && (
          <SafeBoundary onReset={() => setSelectedEndpoint(null)}>
            <ApiTesterModal
              endpoint={selectedEndpoint}
              onClose={() => setSelectedEndpoint(null)}
              onToast={showToast}
              userRating={ratings[selectedEndpoint.name] ?? ratings[selectedEndpoint.path]}
              onRate={handleRate}
            />
          </SafeBoundary>
        )}

        {/* ── Sidebar Navigation ── */}
        <aside className="nova-rail">
          <button className="nova-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="nova-brand-mark"><img src="/logo-avatar.png" alt="Kᴀᴀʟɪx" /></span>
            <span><strong>Kᴀᴀʟɪx</strong><small>API WORKSPACE</small></span>
          </button>

          <div className="nova-rail-label mt-2">QUICK VIEWS</div>
          <nav className="flex flex-col gap-1 px-3 mb-2">
            <button
              onClick={() => { setQuickFilter("all"); setActiveCategory(null); }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                quickFilter === "all" ? "bg-[var(--accent-muted)] text-[var(--accent)] font-bold" : "text-[var(--fg3)] hover:bg-[var(--inp)] hover:text-[var(--fg)]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Layers size={15} /> All APIs
              </span>
              <span className="text-[11px] font-mono text-[var(--fg4)]">{totalEndpointsCount}</span>
            </button>
            <button
              onClick={() => { setQuickFilter("top-rated"); setActiveCategory(null); }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                quickFilter === "top-rated" ? "bg-[var(--accent-muted)] text-[var(--accent)] font-bold" : "text-[var(--fg3)] hover:bg-[var(--inp)] hover:text-[var(--fg)]"
              }`}
            >
              <span className="flex items-center gap-2.5 text-amber-300">
                <Sparkles size={15} /> Top Rated (★4.8+)
              </span>
              <span className="text-[11px] font-mono text-[var(--fg4)]">
                {allCategories.reduce((sum, c) => sum + c.endpoints.filter(e => getEndpointRatingData(e.path, ratings[e.path]).score >= 4.8).length, 0)}
              </span>
            </button>
            <button
              onClick={() => { setQuickFilter("favorites"); setActiveCategory(null); }}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                quickFilter === "favorites" ? "bg-[var(--accent-muted)] text-[var(--accent)] font-bold" : "text-[var(--fg3)] hover:bg-[var(--inp)] hover:text-[var(--fg)]"
              }`}
            >
              <span className="flex items-center gap-2.5 text-amber-400">
                <Star size={15} fill="currentColor" /> Favorites
              </span>
              <span className="text-[11px] font-mono text-[var(--fg4)]">{favorites.length}</span>
            </button>
          </nav>

          <div className="nova-rail-label">CATEGORIES</div>
          <nav className="nova-rail-nav">
            {allCategories.map((cat) => {
              const sel = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  className={`nova-rail-item${sel ? " is-active" : ""}`}
                  onClick={() => {
                    setQuickFilter("all");
                    scrollTo(cat.key);
                  }}
                >
                  <CategoryIcon name={cat.iconName} size={16} />
                  <span>{cat.label}</span>
                  <em>{cat.endpoints.length}</em>
                </button>
              );
            })}
          </nav>

          <button className="nova-rail-profile" onClick={() => setShowProfile(true)}>
            <img src="/profile.jpg" alt="Profile" />
            <span><strong>ＲＯＣＫＹܓ ＢＨＡＩ !</strong><small>OWNER &amp; DEVELOPER</small></span>
            <ChevronRight size={15} />
          </button>
        </aside>

        {/* ── Main Area ── */}
        <main className="nova-main">
          <header className="nova-topbar">
            <div className="nova-mobile-brand">
              <img src="/logo-avatar.png" alt="Kᴀᴀʟɪx" />
              <strong>Kᴀᴀʟɪx</strong>
            </div>

            <label className="nova-search">
              <Search size={17} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 67+ free APIs (name, path, params)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-[var(--fg4)] hover:text-[var(--fg)] p-1"
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd>⌘ K</kbd>
              )}
            </label>

            <div className="nova-top-actions">
              {/* View Switcher: Grid vs List */}
              <div className="flex items-center bg-[var(--inp)] border border-[var(--brd)] rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-[var(--accent)] text-white" : "text-[var(--fg4)] hover:text-[var(--fg)]"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-[var(--accent)] text-white" : "text-[var(--fg4)] hover:text-[var(--fg)]"
                  }`}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>

              <span className="nova-live hidden md:flex">
                <i /> {totalEndpointsCount} ONLINE
              </span>

              <button
                className="nova-icon-btn"
                onClick={() => setDark((d) => !d)}
                title={dark ? "Light mode" : "Dark mode"}
              >
                {dark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button className="nova-avatar-btn" onClick={() => setShowProfile(true)} title="Developer profile">
                <img src="/profile.jpg" alt="Profile" />
              </button>
            </div>
          </header>

          <div className="nova-mobile-tabs">
            <CategoryTabs categories={allCategories} active={activeCategory} onSelect={scrollTo} />
          </div>

          <div className="nova-content">
            {!search && quickFilter === "all" && (
              <section className="nova-hero">
                <div className="nova-hero-copy">
                  <div className="nova-overline">
                    <span className="flex items-center gap-1.5"><Activity size={12} className="text-emerald-400 animate-pulse" /> 67+ LIVE FREE APIS</span>
                    <b>NO API KEY REQUIRED · 100% UNRESTRICTED</b>
                  </div>
                  <h1 className="kaalix-hero-title">
                    <span className="kaalix-word">Kᴀᴀʟɪx</span>
                    <span className="kaalix-word kaalix-word-accent">FREE APIS</span>
                  </h1>
                  <p className="kaalix-hero-subtitle">
                    The ultra-fast developer workspace for AI models, video &amp; music downloaders, web search, anonymous file storage, image generation, and utility tools.
                  </p>
                  <div className="nova-hero-actions kaalix-hero-actions">
                    <button onClick={() => scrollTo(allCategories[0]?.key ?? "")}>
                      <Zap size={15} /> Explore all APIs
                    </button>
                    <button className="is-quiet" onClick={() => setQuickFilter("top-rated")}>
                      <Sparkles size={15} className="text-amber-400" /> Top Rated APIs
                    </button>
                    <button className="is-quiet" onClick={() => setShowProfile(true)}>
                      <Users size={15} /> Developer
                    </button>
                  </div>
                </div>

                <div className="nova-hero-orbit">
                  <div className="nova-orbit-ring" />
                  <div className="nova-orbit-core">
                    <strong>{totalEndpointsCount}</strong>
                    <small>ENDPOINTS</small>
                  </div>
                  <span className="nova-orbit-dot dot-a" />
                  <span className="nova-orbit-dot dot-b" />
                </div>

                <div className="nova-hero-footer">
                  <span><b>{totalEndpointsCount}</b> endpoints</span>
                  <span><b>{allCategories.length}</b> categories</span>
                  <span><b>★ 4.9</b> community rating</span>
                  <span className="nova-hero-status"><i /> All systems active</span>
                </div>
              </section>
            )}

            {/* Catalog Filter Header */}
            <div className="nova-catalog-head">
              <div>
                <span className="nova-section-kicker">
                  {quickFilter === "favorites" ? "BOOKMARKED" : quickFilter === "top-rated" ? "HIGHEST RATED" : "DIRECTORY"}
                </span>
                <h2>
                  {search
                    ? `Results for "${search}"`
                    : quickFilter === "favorites"
                    ? "Starred Favorites"
                    : quickFilter === "top-rated"
                    ? "Top Rated APIs (★ 4.8+)"
                    : "API Directory"}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {quickFilter !== "all" && (
                  <button
                    onClick={() => setQuickFilter("all")}
                    className="text-[12px] font-bold text-[var(--accent)] hover:underline"
                  >
                    View All
                  </button>
                )}
                <div className="nova-view-meta">
                  <span>{filteredCategories.reduce((n, c) => n + c.endpoints.length, 0)} routes</span>
                  <span className="nova-filter-dot" />
                </div>
              </div>
            </div>

            {/* Catalog Sections */}
            {filteredCategories.length === 0 ? (
              <div className="nova-empty">
                <Search size={32} />
                <h3>No APIs found</h3>
                <p>
                  {quickFilter === "favorites"
                    ? "You haven't starred any APIs yet. Click the star icon on any API to bookmark it."
                    : quickFilter === "top-rated"
                    ? "No top-rated APIs matched your criteria."
                    : "Try a different search term or browse by category."}
                </p>
                {quickFilter !== "all" && (
                  <button
                    onClick={() => setQuickFilter("all")}
                    className="btn-violet px-4 py-2 rounded-xl text-[13px] font-bold mt-2"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="nova-catalog">
                {filteredCategories.map((cat) => (
                  <CategorySection
                    key={cat.key}
                    cat={cat}
                    viewMode={viewMode}
                    favorites={favorites}
                    ratings={ratings}
                    onToggleFavorite={toggleFavorite}
                    onTry={setSelectedEndpoint}
                    onCopyUrl={handleCopyEndpointUrl}
                    onRate={handleRate}
                    isActive={activeCategory === cat.key}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ── Mobile Bottom Dock ── */}
        {!splash && (
          <nav className="nova-mobile-dock">
            <button
              className={quickFilter === "all" ? "is-current" : ""}
              onClick={() => {
                setQuickFilter("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Search size={18} />
              <span>Explore</span>
            </button>
            <button
              className={quickFilter === "top-rated" ? "is-current" : ""}
              onClick={() => setQuickFilter("top-rated")}
            >
              <Sparkles size={18} />
              <span>Top Rated</span>
            </button>
            <button
              className={quickFilter === "favorites" ? "is-current" : ""}
              onClick={() => setQuickFilter("favorites")}
            >
              <Star size={18} />
              <span>Favorites</span>
            </button>
            <button onClick={() => setShowProfile(true)}>
              <Users size={18} />
              <span>Profile</span>
            </button>
          </nav>
        )}
      </div>
    </>
  );
}
