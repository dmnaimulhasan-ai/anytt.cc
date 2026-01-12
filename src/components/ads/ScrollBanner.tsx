import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;
const SCROLL_THRESHOLD = 0.4; // 40% scroll

interface ScrollBannerProps {
  className?: string;
}

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
      const scrollProgress = window.scrollY / scrollHeight;
      
      if (scrollProgress >= SCROLL_THRESHOLD && scrollProgress <= 0.8) {
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

    // Adsterra 300x250 Banner script
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

  if (!isVisible) return null;

  if (adFailed) {
    return (
      <div className={`flex justify-center my-6 ${className}`}>
        <div className="min-h-[250px] min-w-[300px] max-w-[300px] flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Premium Content</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Support our free service</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div 
        ref={containerRef} 
        className="min-h-[250px] min-w-[300px] max-w-[300px] flex items-center justify-center overflow-hidden"
      >
        <span className="text-xs text-muted-foreground/30">Ad</span>
      </div>
    </div>
  );
};

export default ScrollBanner;
