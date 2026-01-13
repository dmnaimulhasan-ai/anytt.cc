import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface NativeBannerProps {
  className?: string;
}

/**
 * Native Banner Ad Component
 * 
 * ADSTERRA POLICY COMPLIANT:
 * - Clearly labeled as "Advertisement"
 * - Not inside or overlapping download buttons
 * - Mobile responsive
 * - No misleading content
 */
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

    // Adsterra Native Banner script
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
    return null; // Don't show placeholder for failed ads
  }

  return (
    <div className={`my-6 ${className}`}>
      {/* Clear advertisement label - Adsterra policy compliant */}
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Advertisement
      </p>
      <div className="flex justify-center">
        <div 
          ref={containerRef}
          id="container-3025235b7f9e8922019d79a8dd0ff449" 
          className="w-full max-w-2xl"
        />
      </div>
    </div>
  );
};

export default NativeBanner;
