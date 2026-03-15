import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;
const SCROLL_THRESHOLD = 0.4;

interface ScrollBannerProps {
  className?: string;
}

/**
 * Scroll-triggered Monetag In-Page Push Banner
 */
const ScrollBanner = ({ className = "" }: ScrollBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      if (window.scrollY / scrollHeight >= SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const timeoutId = setTimeout(() => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "timeout",
        adComponent: "ScrollBanner",
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
        adComponent: "ScrollBanner",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      clearTimeout(timeoutId);
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
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Advertisement
      </p>
      <div className="flex justify-center">
        <div ref={containerRef} className="w-full max-w-2xl" />
      </div>
    </div>
  );
};

export default ScrollBanner;
