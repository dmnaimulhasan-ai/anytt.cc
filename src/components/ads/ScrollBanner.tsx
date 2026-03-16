import { useEffect, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";
import { X, ExternalLink } from "lucide-react";

const DIRECT_LINK_URL = "https://omg10.com/4/1073301";
const SCROLL_THRESHOLD = 0.05;

const ScrollBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      if (window.scrollY / scrollHeight >= SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "ScrollBanner" });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  if (!isVisible || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-md rounded-2xl bg-card border border-border shadow-xl p-3 flex items-center gap-3">
        <div
          onClick={handleClick}
          className="flex-1 flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg flex-shrink-0">
            🎁
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-sm">Special Offer</p>
            <p className="text-[11px] text-muted-foreground">Tap to claim your reward</p>
          </div>
          <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[9px] text-muted-foreground/40 text-center mt-1">Sponsored</p>
    </div>
  );
};

export default ScrollBanner;
