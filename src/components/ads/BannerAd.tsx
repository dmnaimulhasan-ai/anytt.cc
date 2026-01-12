import { useEffect, useRef, useState } from "react";

const AD_LOAD_TIMEOUT = 8000;

const BannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        setAdFailed(true);
      }
    }, AD_LOAD_TIMEOUT);

    (window as any).atOptions = {
      key: "59788b78ce7ac0220b51b6164bbec986",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://evadereprimand.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
    script.onerror = () => setAdFailed(true);
    containerRef.current.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, []);

  if (adFailed) {
    return (
      <div className="flex justify-center my-6">
        <div className="min-h-[250px] min-w-[300px] flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Premium Content</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Support our free service</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-6">
      <div ref={containerRef} className="min-h-[250px] min-w-[300px]"></div>
    </div>
  );
};

export default BannerAd;
