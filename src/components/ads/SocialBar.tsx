import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

const SocialBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const isMobile = useIsMobile();
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    // Only show on mobile
    if (!isMobile) return;
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const timeoutId = setTimeout(() => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "timeout",
        adComponent: "SocialBar",
        errorReason: "Ad failed to load within timeout",
      });
    }, AD_LOAD_TIMEOUT);

    // Adsterra Social Bar script
    const script = document.createElement("script");
    script.src = "https://encouragingjawsordinarily.com/b2/24/36/b22436c5372c7da186e7f7fb1232cb74.js";
    script.async = true;
    script.onerror = () => {
      setAdFailed(true);
      trackAdEvent({
        eventType: "failure",
        adComponent: "SocialBar",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      clearTimeout(timeoutId);
      trackAdEvent({
        eventType: "load",
        adComponent: "SocialBar",
      });
    };
    document.body.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMobile, trackAdEvent]);

  // Don't render anything visible - social bar is managed by the script
  // Only render on mobile, return null on desktop
  if (!isMobile || adFailed) return null;

  return <div ref={containerRef} className="hidden" />;
};

export default SocialBar;
