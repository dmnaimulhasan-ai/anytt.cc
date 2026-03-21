import { useEffect, useRef } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

/**
 * Monetag In-Page Push Ad - Zone: 10733016
 * Uses official Monetag script only — no custom fake banners.
 * The script renders its own ad unit; we just provide a container.
 */
interface BannerAdProps {
  className?: string;
}

const BannerAd = ({ className = "" }: BannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.dataset.zone = "10733016";
    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;
    script.onerror = () => {
      trackAdEvent({
        eventType: "failure",
        adComponent: "BannerAd",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      trackAdEvent({ eventType: "load", adComponent: "BannerAd" });
    };

    containerRef.current.appendChild(script);
  }, [trackAdEvent]);

  return (
    <div className={`my-6 ${className}`}>
      <p className="text-[10px] text-muted-foreground/50 text-center mb-1 uppercase tracking-wider">
        Advertisement
      </p>
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
};

BannerAd.displayName = "BannerAd";
export default BannerAd;
