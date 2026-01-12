import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface ResponsiveAdProps {
  className?: string;
  position?: 'after-input' | 'below-results' | 'between-sections';
}

const ResponsiveAd = ({ className = "", position = 'between-sections' }: ResponsiveAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const isMobile = useIsMobile();
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    
    // Mobile: 300x250, Desktop: 300x250 (centered)
    const config = { width: 300, height: 250 };

    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        setAdFailed(true);
        trackAdEvent({
          eventType: "timeout",
          adComponent: "ResponsiveAd",
          adPosition: position,
          errorReason: "Ad failed to load within timeout",
        });
      }
    }, AD_LOAD_TIMEOUT);
    
    (window as any).atOptions = {
      key: "59788b78ce7ac0220b51b6164bbec986",
      format: "iframe",
      height: config.height,
      width: config.width,
      params: {},
    };

    // New Adsterra domain
    const script = document.createElement("script");
    script.src = "https://encouragingjawsordinarily.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
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
      trackAdEvent({
        eventType: "load",
        adComponent: "ResponsiveAd",
        adPosition: position,
      });
    };
    containerRef.current.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      loadedRef.current = false;
    };
  }, [isMobile, position, trackAdEvent]);

  if (adFailed) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <div 
          className="flex items-center justify-center bg-muted/30 rounded-lg border border-border/50"
          style={{ minHeight: 250, minWidth: 300, maxWidth: 300 }}
        >
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Sponsored</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Support our free service</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div 
        ref={containerRef} 
        className="flex items-center justify-center overflow-hidden"
        style={{ minHeight: 250, minWidth: 300, maxWidth: 300 }}
      >
        <span className="text-xs text-muted-foreground/30">Sponsored</span>
      </div>
    </div>
  );
};

export default ResponsiveAd;
