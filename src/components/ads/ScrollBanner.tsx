import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;
const SCROLL_THRESHOLD = 0.4; // 40% scroll

interface ScrollBannerProps {
  className?: string;
}

/**
 * Scroll-triggered 300x250 Banner Ad
 * 
 * ADSTERRA POLICY COMPLIANT:
 * - Clearly labeled as "Advertisement"
 * - Shows only after 40% scroll (not interrupting main actions)
 * - Placed in content flow (not overlapping buttons)
 * - Mobile centered, no overflow
 */
const ScrollBanner = ({ className = "" }: ScrollBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  // Check scroll position to show banner
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollProgress = window.scrollY / scrollHeight;
      
      if (scrollProgress >= SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load ad when visible
  useEffect(() => {
    if (!isVisible || !containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        setAdFailed(true);
        trackAdEvent({
          eventType: "timeout",
          adComponent: "ScrollBanner",
          errorReason: "Ad failed to load within timeout",
        });
      }
    }, AD_LOAD_TIMEOUT);

    // Set ad options
    (window as any).atOptions = {
      key: '59788b78ce7ac0220b51b6164bbec986',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };

    const script = document.createElement("script");
    script.src = "https://encouragingjawsordinarily.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
    script.async = true;
    script.onerror = () => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "failure",
        adComponent: "ScrollBanner",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      trackAdEvent({
        eventType: "load",
        adComponent: "ScrollBanner",
      });
    };
    containerRef.current.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, [isVisible, trackAdEvent]);

  if (!isVisible || adFailed) return null;

  return (
    <div className={`my-6 ${className}`}>
      {/* Clear advertisement label */}
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Advertisement
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

export default ScrollBanner;
