import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface NativeBannerProps {
  className?: string;
}

const NativeBanner = ({ className = "" }: NativeBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const timeoutId = setTimeout(() => {
      if (containerRef.current && containerRef.current.children.length <= 1) {
        setAdFailed(true);
        trackAdEvent({
          eventType: "timeout",
          adComponent: "NativeBanner",
          errorReason: "Ad failed to load within timeout",
        });
      }
    }, AD_LOAD_TIMEOUT);

    // New Adsterra Native Banner script
    const script = document.createElement("script");
    script.src = "https://encouragingjawsordinarily.com/3025235b7f9e8922019d79a8dd0ff449/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.onerror = () => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "failure",
        adComponent: "NativeBanner",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      trackAdEvent({
        eventType: "load",
        adComponent: "NativeBanner",
      });
    };
    containerRef.current.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, [trackAdEvent]);

  if (adFailed) {
    return (
      <div className={`flex justify-center my-6 ${className}`}>
        <div className="min-h-[90px] w-full max-w-2xl flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Recommended Content</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div 
        ref={containerRef}
        id="container-3025235b7f9e8922019d79a8dd0ff449" 
        className="w-full max-w-2xl"
      />
    </div>
  );
};

export default NativeBanner;
