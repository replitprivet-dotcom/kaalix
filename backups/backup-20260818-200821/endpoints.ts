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
      {"name": "Gptlogic", "path": "/api/gptlogic", "description": "AI-powered logic processing", "method": "GET", "params": {"q": "hii", "prompt": "be friendly"}},
      {"name": "llama-meta", "path": "/api/llama-meta", "description": "Llama-meta AI query processing", "method": "GET", "params": {"q": "hii"}},
      {"name": "Qwen", "path": "/api/qwen", "description": "Qwen AI query processing", "method": "GET", "params": {"q": "hii"}},
      {"name": "Cohere", "path": "/api/cohere", "description": "Cohere AI query processing", "method": "GET", "params": {"q": "hii"}},
      {"name": "Deepseek-v3", "path": "/api/deepseek-v3", "description": "Deepseek Chat Mode", "method": "GET", "params": {"q": "hii"}},
      {"name": "Deepseek-r1", "path": "/api/deepseek-r1", "description": "Deepseek Reasoning Mode", "method": "GET", "params": {"q": "hii"}},
      {"name": "Gemini", "path": "/api/gemini", "description": "Google Gemini AI", "method": "GET", "params": {"q": "hello"}},
    ],
  },
  {
    key: "downloader",
    label: "Downloaders",
    iconName: "Download",
    endpoints: [
      {"name": "Twitter", "path": "/api/xdl", "description": "Download Tweets from Twitter", "method": "GET", "params": {"url": "https://x.com/i/status/2047556140410482874"}},
      {"name": "Instagramdl", "path": "/api/igdl", "description": "Download Instagram media", "method": "GET", "params": {"quality": "480", "url": "https://www.instagram.com/reel/DWKV8YDiMRy/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="}},
      {"name": "Tiktok2dl", "path": "/api/tiktok2", "description": "Alternative TikTok downloader", "method": "GET", "params": {"url": "https://vt.tiktok.com/ZSrRVYRUJ/"}},
      {"name": "Facebookdl", "path": "/api/facebook", "description": "Download Facebook videos", "method": "GET", "params": {"url": "https://www.facebook.com/share/r/12Jhv1vQ85G/"}},
      {"name": "Applemusic", "path": "/api/applemusic", "description": "Download Apple Music tracks", "method": "GET", "params": {"q": "sacrifice"}},
      {"name": "Youtubedl", "path": "/api/ytdl", "description": "Download YouTube videos with quality options", "method": "GET", "params": {"format": "mp3", "url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubeMp3", "path": "/api/yta", "description": "Download YouTube audio", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubeMp4", "path": "/api/ytv", "description": "Download YouTube video", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YoutubePlay", "path": "/api/ytplay", "description": "Search and play YouTube videos", "method": "GET", "params": {"q": "Limitless"}},
      {"name": "GitClone", "path": "/api/gitclone", "description": "Clone GitHub repositories", "method": "GET", "params": {"url": "https://github.com/Lord-Samuel/rebix-db"}},
      {"name": "YtAudio", "path": "/api/ytau", "description": "Download YouTube audio via yt1s", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
      {"name": "YtVideo", "path": "/api/ytvi", "description": "Download YouTube video with multiple qualities", "method": "GET", "params": {"url": "https://youtu.be/3ca64kJjhEU"}},
    ],
  },
  {
    key: "search",
    label: "Search",
    iconName: "Search",
    endpoints: [
      {"name": "Pinterest", "path": "/api/pinterest", "description": "Search Pinterest images", "method": "GET", "params": {"q": "anime"}},
      {"name": "NpmSearch", "path": "/api/npmsearch", "description": "Search NPM packages", "method": "GET", "params": {"q": "baileys"}},
      {"name": "TiktokSearch", "path": "/api/tiktoksearch", "description": "Search TikTok content", "method": "GET", "params": {"q": "pela"}},
      {"name": "SpotifySearch", "path": "/api/spotifysearch", "description": "Search Spotify tracks", "method": "GET", "params": {"q": "limitless"}},
      {"name": "Lyrics", "path": "/api/lyrics", "description": "Search song lyrics", "method": "GET", "params": {"q": "ozeba"}},
      {"name": "Lyrics2", "path": "/api/lyrics2", "description": "Alternative lyrics search", "method": "GET", "params": {"q": "ozeba"}},
      {"name": "YoutubeSearch", "path": "/api/yts", "description": "Search YouTube videos", "method": "GET", "params": {"q": "Tamako edit"}},
    ],
  },
  {
    key: "anime",
    label: "Anime",
    iconName: "Tv2",
    endpoints: [
      {"name": "AnimeSearch", "path": "/api/anisearch", "description": "Search anime titles", "method": "GET", "params": {"q": "naruto"}},
      {"name": "Animedl", "path": "/api/anidl", "description": "Download anime episodes", "method": "GET", "params": {"url": "https://www.bilibili.tv/id/video/4794964840158720"}},
      {"name": "AnimeSearch2", "path": "/api/animesearch", "description": "Alternative anime search", "method": "GET", "params": {"q": "naruto"}},
    ],
  },
  {
    key: "stalk",
    label: "Stalk",
    iconName: "Eye",
    endpoints: [
      {"name": "Tiktok-Stalk", "path": "/api/tiktokstalk", "description": "Stalk TikTok user profiles", "method": "GET", "params": {"q": "ronaldo"}},
    ],
  },
  {
    key: "tools",
    label: "Tools",
    iconName: "Wrench",
    endpoints: [
      {"name": "ApkSearch", "path": "/api/apksearch", "description": "Search Android APKs on APKCombo", "method": "GET", "params": {"q": "whatsapp"}},
      {"name": "ApkDownload", "path": "/api/apkdl", "description": "Get a direct download link for an APKCombo app page", "method": "GET", "params": {"url": "https://apkcombo.app/whatsapp-messenger/com.whatsapp"}},
      {"name": "CfBypass", "path": "/api/cfbypass", "description": "Bypass Cloudflare protection (turnstile-min, source, waf-session modes)", "method": "GET", "params": {"url": "https://example.com", "mode": "source"}},
      {"name": "Enhance", "path": "/api/enhance", "description": "Upscale images", "method": "GET", "params": {"url": "https://i.pinimg.com/736x/f9/0f/85/f90f8504271cedf0681a297a7d69c593.jpg"}},
      {"name": "Random-img", "path": "/api/randomimage", "description": "Get random images", "method": "GET", "params": {}},
      {"name": "OCR", "path": "/api/ocr", "description": "Extract text from images", "method": "GET", "params": {"url": "https://sam-cdn.zone.id/files/55ykd6.jpg"}},
    ],
  },
  {
    key: "nsfw",
    label: "NSFW",
    iconName: "ShieldAlert",
    endpoints: [
      {"name": "Pussy", "path": "/api/nsfw/pussy", "description": "NSFW content", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Cuckold", "path": "/api/nsfw/cuckold", "description": "NSFW content", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Yuri", "path": "/api/nsfw/yuri", "description": "NSFW content", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Milf", "path": "/api/nsfw/milf", "description": "NSFW content", "method": "GET", "params": {}, "nsfw": true},
      {"name": "Blowjob", "path": "/api/nsfw/blowjob", "description": "NSFW content", "method": "GET", "params": {}, "nsfw": true},
    ],
  },
  {
    key: "tools-extra",
    label: "Extra Tools",
    iconName: "Settings2",
    endpoints: [
      {"name": "Ssweb", "path": "/api/ssweb", "description": "Take website screenshots", "method": "GET", "params": {"url": "https://google.com", "device": "full"}},
      {"name": "Tinyurl", "path": "/api/tinyurl", "description": "Shorten URLs", "method": "GET", "params": {"url": "https://google.com"}},
      {"name": "Translate", "path": "/api/translate", "description": "Translate text", "method": "GET", "params": {"text": "I love you", "to": "id"}},
      {"name": "RemoveBg", "path": "/api/removebg", "description": "Remove image backgrounds", "method": "GET", "params": {"url": "https://files.catbox.moe/dv8r14.jpg"}},
      {"name": "Txt2Img", "path": "/api/txt2img", "description": "Generate images from text", "method": "GET", "params": {"q": "naruto from naruto"}},
    ],
  },
  {
    key: "random",
    label: "Random",
    iconName: "Shuffle",
    endpoints: [
      {"name": "Random-Quotes", "path": "/api/randomquotes", "description": "Get random quotes", "method": "GET", "params": {}},
      {"name": "Random-Facts", "path": "/api/facts", "description": "Get random facts", "method": "GET", "params": {}},
    ],
  },
  {
    key: "images",
    label: "Images",
    iconName: "ImageIcon",
    endpoints: [
      {"name": "Waifu", "path": "/api/waifu", "description": "Waifu pictures", "method": "GET", "params": {}},
      {"name": "Cosplay", "path": "/api/cosplay", "description": "Anime Cosplay Pictures", "method": "GET", "params": {}},
      {"name": "Couplepp", "path": "/api/couplepp", "description": "Couple Pictures", "method": "GET", "params": {}},
      {"name": "BlueArchive", "path": "/api/bluearchive", "description": "Get Blue Archive images", "method": "GET", "params": {}},
      {"name": "Wallpaper-Main", "path": "/api/wallpaper", "description": "Wallpaper endpoints list", "method": "GET", "params": {}},
      {"name": "Programming", "path": "/api/wallpaper/programming", "description": "Get programming wallpapers", "method": "GET", "params": {}},
    ],
  },
];

export const totalEndpoints = categories.reduce((sum, c) => sum + c.endpoints.length, 0);
