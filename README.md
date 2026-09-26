# Kᴀᴀʟɪx Free APIs

A polished UI for browsing and testing the live public API catalog from `api-rebix.vercel.app`. The website uses the upstream catalog at `/allEnds`, currently synchronized to **55 routes** across AI, downloaders, search, anime, tools, images, NSFW, random, and system categories.

## Deploy to Vercel

Push this project to GitHub, import it into [Vercel](https://vercel.com), and deploy with the settings already included in `vercel.json`:

```text
Build command: npm run build
Output directory: dist
Environment variables: none required
```

The production rewrites use `https://api-rebix.vercel.app` as the primary upstream. The direct website form is `/api/<route>`, for example:

```text
/api/lyrics2?q=ozeba       -> https://api-rebix.vercel.app/api/lyrics2?q=ozeba
/api/bluearchive           -> https://api-rebix.vercel.app/api/bluearchive
/api/wallpaper/programming -> https://api-rebix.vercel.app/api/wallpaper/programming
/api/txt2img?q=naruto      -> https://api-rebix.vercel.app/api/txt2img?q=naruto
```

The previous `/api/v1/<route>` and `/api/zone/<route>` namespaces remain supported as compatibility aliases. If an upstream rewrite returns an error page or a 5xx response, the browser tester retries the corresponding route directly against `api-rebix.vercel.app` and then displays a clear error state if the upstream itself is unavailable.

## Live catalog synchronization

The source catalog is generated from the live `/allEnds` response. To refresh it after the upstream adds or removes routes:

```bash
curl -L https://api-rebix.vercel.app/allEnds -o upstream_allEnds.json
python3 sync_endpoints.py
```

The current catalog includes upstream routes such as `/api/ytdl`, `/api/ytv`, `/api/apksearch`, `/api/apkdl`, `/api/cfbypass`, `/api/txt2img`, `/api/couplepp`, `/api/wallpaper`, `/api/wallpaper/programming`.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL in your browser. Vite proxies `/api/*` to `api-rebix.vercel.app`; the production Node server provides the same proxy behavior when started with `npm start`.

## Verification

Use the synchronized smoke-test script to check the live catalog routes and record their response status and content type:

```bash
python3 smoke_test_upstream.py
```
