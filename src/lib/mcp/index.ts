import { defineMcp } from "@lovable.dev/mcp-js";
import downloadTiktok from "./tools/download-tiktok";
import downloadPinterest from "./tools/download-pinterest";
import listTiktokProfileVideos from "./tools/tiktok-profile";

export default defineMcp({
  name: "anytt-cc-mcp",
  title: "Anytt.cc Downloader",
  version: "0.1.0",
  instructions:
    "Tools for Anytt.cc, a free TikTok and Pinterest downloader. Use `download_tiktok` to get no-watermark HD video and MP3 links from a TikTok URL, `download_pinterest` to get direct media links from a Pinterest pin, and `list_tiktok_profile_videos` to enumerate a public TikTok profile's recent videos for batch downloading.",
  tools: [downloadTiktok, downloadPinterest, listTiktokProfileVideos],
});
