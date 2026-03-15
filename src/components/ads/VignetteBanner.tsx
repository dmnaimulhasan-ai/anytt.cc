import { useEffect, useRef } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

/**
 * Monetag Vignette Banner - full-page overlay managed by Monetag
 * Zone: 10733014
 */
const VignetteBanner = () => {
  const loadedRef = useRef(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.dataset.zone = "10733014";
    script.src = "https://gizokraijaw.net/vignette.min.js";
    script.async = true;
    script.onerror = () => {
      trackAdEvent({
        eventType: "failure",
        adComponent: "VignetteBanner",
        errorReason: "Script failed to load",
      });
    };
    script.onload = () => {
      trackAdEvent({
        eventType: "load",
        adComponent: "VignetteBanner",
      });
    };

    // Append to body as required by Monetag
    const container = [document.documentElement, document.body].filter(Boolean).pop()!;
    container.appendChild(script);
  }, [trackAdEvent]);

  return null; // Vignette is managed entirely by Monetag script
};

export default VignetteBanner;
