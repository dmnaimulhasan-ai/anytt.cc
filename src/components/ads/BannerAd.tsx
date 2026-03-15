import { useEffect, useRef, useState, forwardRef } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface BannerAdProps {
  className?: string;
}

/**
 * Monetag In-Page Push Banner (replaces Adsterra 300x250)
 */
const BannerAd = forwardRef<HTMLDivElement, BannerAdProps>(({ className = "" }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const timeoutId = setTimeout(() => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "timeout",
        adComponent: "BannerAd",
        errorReason: "Ad failed to load within timeout",
      });
    }, AD_LOAD_TIMEOUT);

    const script = document.createElement("script");
    script.dataset.zone = "10733016";
    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;
    script.onerror = () => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "failure",
        adComponent: "BannerAd",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      clearTimeout(timeoutId);
      trackAdEvent({
        eventType: "load",
        adComponent: "BannerAd",
      });
    };
    containerRef.current.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, [trackAdEvent]);

  if (adFailed) return null;

  return (
    <div ref={ref} className={`my-6 ${className}`}>
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Sponsored
      </p>
      <div className="flex justify-center">
        <div ref={containerRef} className="w-full max-w-2xl" />
      </div>
    </div>
  );
});

BannerAd.displayName = "BannerAd";
export default BannerAd;
