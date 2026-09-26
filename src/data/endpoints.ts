export type Endpoint = {
  name: string;
  path: string;
  description: string;
  method: string;
  params: Record<string, string>;
  nsfw?: boolean;
};

export type Category = {
  key: string;
  label: string;
  iconName: string;
  endpoints: Endpoint[];
};

export const categories: Category[] = [
  {
    key: "ai",
    label: "AI",
    iconName: "Bot",
    endpoints: [
      {"name": "Claude-Haiku", "path": "/api/claude-haiku", "description": "Claude Haiku 4.5 - Fast and efficient AI for everyday tasks", "method": "GET", "params": {"q": "hii"}},
      {"name": "Claude-Session", "path": "/api/claude-session", "description": "Claude Haiku with persistent session support for multi-turn conversations", "method": "GET", "params": {"q": "hii", "sessionId": "optional-session-id"}},
      {"name": "Gptlogic", "path": "/api/gptlogic", "description": "AI-powered logic processing", "method": "GET", "params": {"q": "hii", "prompt": "be friendly"}},
      {"name": "Gptlogic-V2", "path": "/api/gptlogic-v2", "description": "Xiaomi MiMo powered assistant with custom system prompt", "method": "GET", "params": {"q": "hii", "prompt": "Be an annoying ai"}},
      {"name": "Deepseek-v3", "path": "/api/deepseek-v3", "description": "Deepseek Chat Mode", "method": "GET", "params": {"q": "hii"}},
      {"name": "Deepseek-r1", "path": "/api/deepseek-r1", "description": "Deepseek Reasoning Mode", "method": "GET", "params": {"q": "hii"}},
      {"name": "Gemini", "path": "/api/gemini", "description": "Google Gemini AI", "method": "GET", "params": {"q": "hello"}},
      {"name": "Cohere", "path": "/api/cohere", "description": "Cohere Command A - Enterprise-grade AI", "method": "GET", "params": {"q": "hii"}},
      {"name": "llama-meta", "path": "/api/llama-meta", "description": "Llama-meta AI query processing", "method": "GET", "params": {"q": "hii"}},
      {"name": "Qwen", "path": "/api/qwen", "description": "Qwen AI query processing", "method": "GET", "params": {"q": "hii"}},
    ],
  },
  {
    key: "downloader",
    label: "Downloaders",
    iconName: "Download",
    endpoints: [
      {"name": "SpotifyDl", "path": "/api/spotifydl", "description": "Download Spotify track audio with metadata and direct MP3 stream", "method": "GET", "params": {"url": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"}},
      {"name": "TikTokDl", "path": "/api/ttdl", "description": "Download TikTok videos (no-watermark, HD) and photo slideshows via TikWM", "method": "GET", "params": {"url": "https://vm.tiktok.com/ZSq3dLMgC/"}},
      {"name": "Tiktok2dl", "path": "/api/tiktok2", "description": "Alternative TikTok downloader", "method": "GET", "params": {"url": "https://vt.tiktok.com/ZSrRVYRUJ/"}},
      {"name": "Twitter", "path": "/api/xdl", "description": "Download Tweets and media from Twitter / X", "method": "GET", "params": {"url": "https://x.com/i/status/2047556140410482874"}},
      {"name": "Instagramdl", "path": "/api/igdl", "description": "Download Instagram Reels and media", "method": "GET", "params": {"quality": "480", "url": "https://www.instagram.com/reel/DWKV8YDiMRy/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="}},
      {"name": "Facebookdl", "path": "/api/facebook", "description": "Download Facebook videos and reels", "method": "GET", "params": {"url": "https://www.facebook.com/share/r/12Jhv1vQ85G/"}},
      {"name": "YoutubeInfo", "path": "/api/ytsearch", "description": "Get detailed title, channel, thumbnail, duration, views & description for YouTube video", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "Youtubedl", "path": "/api/ytdl", "description": "Download YouTube videos with quality options (mp3 / 360 / 720 / 1080)", "method": "GET", "params": {"format": "mp3", "url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubeMp3", "path": "/api/yta", "description": "Download YouTube audio directly", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubeMp4", "path": "/api/ytv", "description": "Download YouTube video", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubePlay", "path": "/api/ytplay", "description": "Search and stream YouTube audio", "method": "GET", "params": {"q": "Limitless"}},
      {"name": "YtAudio", "path": "/api/ytau", "description": "Download YouTube audio via yt1s", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YtVideo", "path": "/api/ytvi", "description": "Download YouTube video with multiple qualities", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "GitClone", "path": "/api/gitclone", "description": "Download and clone GitHub repositories", "method": "GET", "params": {"url": "https://github.com/octocat/Hello-World"}},
      {"name": "Applemusic", "path": "/api/applemusic", "description": "Download Apple Music tracks", "method": "GET", "params": {"q": "sacrifice"}},
    ],
  },
  {
    key: "movies",
    label: "Movies & Series",
    iconName: "Film",
    endpoints: [
      {"name": "Movie-Search", "path": "/api/movie/search", "description": "Search movies & TV series with episode lists and streaming download links", "method": "GET", "params": {"q": "naruto", "page": "1", "perPage": "20"}},
      {"name": "Movie-QuickSearch", "path": "/api/movie/search", "description": "Quick movie and TV series search by title name", "method": "GET", "params": {"q": "Naruto"}},
    ],
  },
  {
    key: "search",
    label: "Search",
    iconName: "Search",
    endpoints: [
      {"name": "SoundCloudSearch", "path": "/api/soundcloudsearch", "description": "Search SoundCloud tracks via mobile API", "method": "GET", "params": {"q": "lofi", "limit": "10"}},
      {"name": "SoundCloud", "path": "/api/soundcloud", "description": "Resolve a SoundCloud track URL to metadata and direct CDN stream URL", "method": "GET", "params": {"url": "https://soundcloud.com/she-and-him/i-thought-i-saw-your-face"}},
      {"name": "YoutubeSearch", "path": "/api/yts", "description": "Search YouTube for videos, channels, and playlists", "method": "GET", "params": {"q": "Tamako edit"}},
      {"name": "Pinterest", "path": "/api/pinterest", "description": "Search Pinterest images", "method": "GET", "params": {"q": "anime"}},
      {"name": "SpotifySearch", "path": "/api/spotifysearch", "description": "Search Spotify tracks", "method": "GET", "params": {"q": "limitless"}},
      {"name": "NpmSearch", "path": "/api/npmsearch", "description": "Search NPM packages", "method": "GET", "params": {"q": "baileys"}},
      {"name": "TiktokSearch", "path": "/api/tiktoksearch", "description": "Search TikTok content", "method": "GET", "params": {"q": "pela"}},
      {"name": "Lyrics", "path": "/api/lyrics", "description": "Search song lyrics", "method": "GET", "params": {"q": "ozeba"}},
      {"name": "Lyrics2", "path": "/api/lyrics2", "description": "Alternative lyrics search", "method": "GET", "params": {"q": "ozeba"}},
    ],
  },
  {
    key: "anime",
    label: "Anime",
    iconName: "Tv2",
    endpoints: [
      {"name": "BstationSearch", "path": "/api/anisearch", "description": "Search anime titles from Bstation (Bilibili)", "method": "GET", "params": {"q": "naruto"}},
      {"name": "Animedl", "path": "/api/anidl", "description": "Download anime episodes", "method": "GET", "params": {"url": "https://www.bilibili.tv/id/video/4794964840158720"}},
      {"name": "AnimeSearch2", "path": "/api/animesearch", "description": "Alternative anime search engine", "method": "GET", "params": {"q": "naruto"}},
    ],
  },
  {
    key: "stalk",
    label: "Stalk",
    iconName: "Eye",
    endpoints: [
      {"name": "Tiktok-Stalk", "path": "/api/tiktokstalk", "description": "Stalk TikTok user profiles and stats", "method": "GET", "params": {"q": "ronaldo"}},
    ],
  },
  {
    key: "tools",
    label: "Tools",
    iconName: "Wrench",
    endpoints: [
      {"name": "NumberLookup", "path": "/api/numberlookup", "description": "Look up carrier, line type, country, timezone & formatted numbers worldwide", "method": "GET", "params": {"q": "+12128148373"}},
      {"name": "ApkSearch", "path": "/api/apksearch", "description": "Search Android APKs on APKCombo", "method": "GET", "params": {"q": "whatsapp"}},
      {"name": "ApkDownload", "path": "/api/apkdl", "description": "Get a direct download link for an APKCombo app page", "method": "GET", "params": {"url": "https://apkcombo.app/whatsapp-messenger/com.whatsapp"}},
      {"name": "CfBypass", "path": "/api/cfbypass", "description": "Bypass Cloudflare protection (turnstile-min, source, waf-session modes)", "method": "GET", "params": {"url": "https://example.com", "mode": "source"}},
      {"name": "Tinyurl", "path": "/api/tinyurl", "description": "Shorten URLs quickly", "method": "GET", "params": {"url": "https://google.com"}},
      {"name": "Translate", "path": "/api/translate", "description": "Translate text across languages", "method": "GET", "params": {"text": "I love you", "to": "id"}},
      {"name": "OCR", "path": "/api/ocr", "description": "Extract text from images using OCR", "method": "GET", "params": {"url": "https://files.catbox.moe/dv8r14.jpg"}},
    ],
  },
  {
    key: "tools-extra",
    label: "Extra Tools",
    iconName: "Settings2",
    endpoints: [
      {"name": "Ssweb", "path": "/api/ssweb", "description": "Take website screenshots (supports desktop, phone, tablet, and full page)", "method": "GET", "params": {"url": "https://google.com", "device": "full"}},
      {"name": "RemoveBg", "path": "/api/removebg", "description": "Remove image backgrounds automatically", "method": "GET", "params": {"url": "https://files.catbox.moe/dv8r14.jpg"}},
      {"name": "Enhance", "path": "/api/enhance", "description": "Upscale & enhance blurry images", "method": "GET", "params": {"url": "https://i.pinimg.com/736x/f9/0f/85/f90f8504271cedf0681a297a7d69c593.jpg"}},
      {"name": "Txt2Img-Flux", "path": "/api/txt2img", "description": "Generate high-speed images from text prompts using Flux Dev AI", "method": "GET", "params": {"q": "naruto from naruto"}},
      {"name": "Txt2Img-4K", "path": "/api/pollinations/prompt", "description": "Generate 4K resolution images with Pollinations", "method": "GET", "params": {"prompt": "naruto from naruto", "width": "3840", "height": "2160", "nologo": "true", "enhance": "true"}},
    ],
  },
  {
    key: "storage",
    label: "File Storage",
    iconName: "HardDrive",
    endpoints: [
      {"name": "OnlyFiles-Info", "path": "/api/onlyfiles/info", "description": "Get file details, size, download state and metadata by file ID", "method": "GET", "params": {"id": "wswdwDwVA4DT"}},
      {"name": "OnlyFiles-Upload", "path": "/api/onlyfiles/upload", "description": "Anonymous cloud file upload (Supports up to 100MB and custom expiry)", "method": "POST", "params": {"expire": "1440"}},
    ],
  },
  {
    key: "random",
    label: "Random",
    iconName: "Shuffle",
    endpoints: [
      {"name": "Random-Quotes", "path": "/api/randomquotes", "description": "Get random inspirational quotes", "method": "GET", "params": {}},
      {"name": "Random-Facts", "path": "/api/facts", "description": "Get random interesting facts", "method": "GET", "params": {}},
      {"name": "Random-img", "path": "/api/randomimage", "description": "Get random aesthetic images", "method": "GET", "params": {}},
    ],
  },
  {
    key: "images",
    label: "Images & Wallpapers",
    iconName: "ImageIcon",
    endpoints: [
      {"name": "Waifu", "path": "/api/waifu", "description": "Get random anime waifu pictures", "method": "GET", "params": {}},
      {"name": "Cosplay", "path": "/api/cosplay", "description": "Get anime cosplay pictures", "method": "GET", "params": {}},
      {"name": "Couplepp", "path": "/api/couplepp", "description": "Matching couple profile pictures", "method": "GET", "params": {}},
      {"name": "BlueArchive", "path": "/api/bluearchive", "description": "Get Blue Archive game images", "method": "GET", "params": {}},
      {"name": "Wallpaper-Main", "path": "/api/wallpaper", "description": "Browse wallpaper endpoints list", "method": "GET", "params": {}},
      {"name": "Technology", "path": "/api/wallpaper/technology", "description": "Get high-tech & sci-fi wallpapers", "method": "GET", "params": {}},
      {"name": "Programming", "path": "/api/wallpaper/programming", "description": "Get programming & developer wallpapers", "method": "GET", "params": {}},
    ],
  },
  {
    key: "nsfw",
    label: "NSFW",
    iconName: "ShieldAlert",
    endpoints: [
      {"name": "Pussy", "path": "/api/nsfw/pussy", "description": "NSFW content (18+ only)", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Cuckold", "path": "/api/nsfw/cuckold", "description": "NSFW content (18+ only)", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Yuri", "path": "/api/nsfw/yuri", "description": "NSFW content (18+ only)", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Milf", "path": "/api/nsfw/milf", "description": "NSFW content (18+ only)", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Blowjob", "path": "/api/nsfw/blowjob", "description": "NSFW content (18+ only)", "method": "GET", "params": {}, "nsfw": true},
    ],
  },
];

export const totalEndpoints = categories.reduce((sum, c) => sum + c.endpoints.length, 0);
