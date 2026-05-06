import { useState, useEffect } from "react";
import { Music2, Image as ImageIcon, History, Trash2 } from "lucide-react";
import PlatformDownloader from "@/components/PlatformDownloader";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import { Button } from "@/components/ui/button";

type Tab = "tiktok" | "pinterest";

const TelegramMiniApp = () => {
  const { isInTelegram, user, haptic } = useTelegramWebApp();
  const { history, clearHistory, removeFromHistory } = useDownloadHistory();
  const [tab, setTab] = useState<Tab>("tiktok");
  const [showHistory, setShowHistory] = useState(false);

  // Listen for download success → haptic feedback
  useEffect(() => {
    document.title = "Anytt cc — Telegram Mini App";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const onComplete = () => haptic("success");
    window.addEventListener("anytt:download-complete", onComplete);
    return () => {
      window.removeEventListener("anytt:download-complete", onComplete);
      document.head.removeChild(meta);
    };
  }, [haptic]);

  const switchTab = (t: Tab) => {
    haptic("light");
    setTab(t);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {user ? `👋 Hi, ${user.first_name}` : "👋 Welcome"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isInTelegram ? "Telegram Mini App" : "Anytt cc Downloader"}
            </p>
          </div>
          <button
            onClick={() => {
              haptic("light");
              setShowHistory((v) => !v);
            }}
            className="p-2 rounded-xl bg-muted text-foreground"
            aria-label="History"
          >
            <History className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Tab switcher */}
      {!showHistory && (
        <div className="px-4 pb-3">
          <div className="flex gap-2 p-1 rounded-2xl bg-muted">
            <button
              onClick={() => switchTab("tiktok")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === "tiktok"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Music2 className="h-4 w-4" />
              TikTok
            </button>
            <button
              onClick={() => switchTab("pinterest")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === "pinterest"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Pinterest
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="px-4 pb-8">
        {showHistory ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold">Recent Downloads</h2>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    haptic("warning");
                    clearHistory();
                  }}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No downloads yet. Paste a TikTok or Pinterest link to get started!
              </div>
            ) : (
              <ul className="space-y-2">
                {history.slice(0, 20).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-xl bg-card border border-border"
                  >
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title || "Untitled"}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.author} · {item.platform}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromHistory(item.id)}
                      className="p-2 text-muted-foreground"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : tab === "tiktok" ? (
          <PlatformDownloader
            platform="tiktok"
            platformName="TikTok"
            platformIcon="🎵"
            functionName="tiktok-download"
            placeholder="Paste TikTok link here..."
            batchPlaceholder="Paste multiple TikTok links, one per line..."
            accentColor="primary"
          />
        ) : (
          <PlatformDownloader
            platform="pinterest"
            platformName="Pinterest"
            platformIcon="📌"
            functionName="pinterest-download"
            placeholder="Paste Pinterest link here..."
            batchPlaceholder="Paste multiple Pinterest links, one per line..."
            accentColor="primary"
          />
        )}
      </main>
    </div>
  );
};

export default TelegramMiniApp;
