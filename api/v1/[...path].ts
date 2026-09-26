import type { VercelRequest, VercelResponse } from "@vercel/node";

const STRIP_KEYS = new Set(["creator", "author", "credit", "credits", "by", "made_by"]);

function stripBranding(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(stripBranding);
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .filter(([k]) => !STRIP_KEYS.has(k.toLowerCase()))
        .map(([k, v]) => [k, stripBranding(v)]),
    );
  }
  return obj;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path, ...rest } = req.query;
  const segments = Array.isArray(path) ? path : path ? [path] : [];
  const subPath = segments.join("/");
  const qs = new URLSearchParams(rest as Record<string, string>).toString();
  const targetUrl = `https://api-rebix.vercel.app/${subPath}${qs ? "?" + qs : ""}`;

  try {
    const upstream = await fetch(targetUrl, {
      method: "GET",
      headers: { "user-agent": "Mozilla/5.0", host: "api-rebix.vercel.app" },
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    res.status(upstream.status);
    res.setHeader("content-type", contentType);

    if (contentType.includes("application/json")) {
      const json = await upstream.json();
      res.send(JSON.stringify(stripBranding(json)));
      return;
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (err) {
    res.status(502).json({ error: "Gateway error", message: (err as Error).message });
  }
}
