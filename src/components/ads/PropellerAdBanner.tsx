import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ADS_ENABLED } from "./AdPlaceholder";

interface PropellerAdBannerProps {
  zoneId: string;
  className?: string;
}

const PropellerAdBanner = ({ zoneId, className }: PropellerAdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || !adRef.current || scriptLoaded.current) return;

    // Create the PropellerAds banner script
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//pl26348063.cpmrevenuegate.com/${zoneId}/invoke.js`;
    
    // Create container for the ad
    const adContainer = document.createElement("ins");
    adContainer.className = "adsbygoogle";
    adContainer.style.display = "block";
    adContainer.setAttribute("data-ad-client", zoneId);
    
    if (adRef.current) {
      adRef.current.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
        scriptLoaded.current = false;
      }
    };
  }, [zoneId]);

  if (!ADS_ENABLED) return null;

  return (
    <div 
      ref={adRef}
      className={cn(
        "flex items-center justify-center min-h-[90px] overflow-hidden",
        className
      )}
    />
  );
};

export default PropellerAdBanner;
