import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

interface BannerAdProps {
  className?: string;
}

/**
 * 300x250 Banner Ad Component
 * 
 * ADSTERRA POLICY COMPLIANT:
 * - Clearly labeled as "Advertisement"
 * - Placed in footer/content areas, NOT near download button
 * - Mobile centered, no overflow
 * - Not interrupting user actions
 */
const BannerAd = ({ className = "" }: BannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    
    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        setAdFailed(true);
        trackAdEvent({
          eventType: "timeout",
          adComponent: "BannerAd",
          errorReason: "Ad failed to load within timeout",
        });
      }
    }, AD_LOAD_TIMEOUT);

    // Set ad options for 300x250
    (window as any).atOptions = {
      key: "59788b78ce7ac0220b51b6164bbec986",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://encouragingjawsordinarily.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
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
      trackAdEvent({
        eventType: "load",
        adComponent: "BannerAd",
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
      {/* Clear advertisement label */}
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Sponsored
      </p>
      <div className="flex justify-center">
        <div 
          ref={containerRef} 
          className="min-h-[250px] min-w-[300px] max-w-[300px] flex items-center justify-center overflow-hidden"
        />
      </div>
    </div>
  );
};

export default BannerAd;
