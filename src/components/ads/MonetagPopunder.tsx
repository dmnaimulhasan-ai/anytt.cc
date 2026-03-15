import { useEffect, useRef } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

/**
 * Monetag Onclick (Popunder) - Zone: 10733025
 * Triggers once per page load, managed by Monetag script
 */
const MonetagPopunder = () => {
  const loadedRef = useRef(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.dataset.zone = "10733025";
    script.src = "https://al5sm.com/tag.min.js";
    script.async = true;
    script.onerror = () => {
      trackAdEvent({
        eventType: "failure",
        adComponent: "MonetagPopunder",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      trackAdEvent({
        eventType: "load",
        adComponent: "MonetagPopunder",
      });
    };

    const container = [document.documentElement, document.body].filter(Boolean).pop()!;
    container.appendChild(script);
  }, [trackAdEvent]);

  return null;
};

export default MonetagPopunder;
