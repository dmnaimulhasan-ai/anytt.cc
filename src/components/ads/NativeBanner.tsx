import { useEffect, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

const AD_LOAD_TIMEOUT = 8000;

const NativeBanner = () => {
  const [adFailed, setAdFailed] = useState(false);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    const container = document.getElementById("container-3025235b7f9e8922019d79a8dd0ff449");
    if (!container) return;

    const timeoutId = setTimeout(() => {
      if (container && container.children.length <= 1) {
        setAdFailed(true);
        trackAdEvent({
          eventType: "timeout",
          adComponent: "NativeBanner",
          errorReason: "Ad failed to load within timeout",
        });
      }
    }, AD_LOAD_TIMEOUT);

    const script = document.createElement("script");
    script.src = "https://evadereprimand.com/3025235b7f9e8922019d79a8dd0ff449/invoke.js";
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
    container.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, []);

  if (adFailed) {
    return (
      <div className="flex justify-center my-6">
        <div className="min-h-[90px] w-full max-w-2xl flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Recommended Content</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-6">
      <div id="container-3025235b7f9e8922019d79a8dd0ff449"></div>
    </div>
  );
};

export default NativeBanner;
