import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface ResponsiveAdProps {
  className?: string;
  position?: 'after-input' | 'below-results' | 'between-sections';
}

/**
 * Monetag In-Page Push (replaces Adsterra Responsive Ad)
 */
const ResponsiveAd = ({ className = "", position = 'between-sections' }: ResponsiveAdProps) => {
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
        adComponent: "ResponsiveAd",
        adPosition: position,
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
        adComponent: "ResponsiveAd",
        adPosition: position,
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      clearTimeout(timeoutId);
      trackAdEvent({
        eventType: "load",
        adComponent: "ResponsiveAd",
        adPosition: position,
      });
    };
    containerRef.current.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, [position, trackAdEvent]);

  if (adFailed) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <div className="flex items-center justify-center bg-muted/30 rounded-lg border border-border/50 p-4" style={{ minHeight: 100 }}>
          <p className="text-sm text-muted-foreground">Sponsored</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div ref={containerRef} className="w-full max-w-2xl" />
    </div>
  );
};

export default ResponsiveAd;
