import { useEffect, useRef, useState } from "react";

const AD_LOAD_TIMEOUT = 8000;

interface InlineAdProps {
  className?: string;
  size?: 'leaderboard' | 'rectangle' | 'mobile';
}

const AD_CONFIGS = {
  leaderboard: {
    width: 728,
    height: 90,
    minWidth: 'min-w-[728px]',
    minHeight: 'min-h-[90px]',
  },
  rectangle: {
    width: 300,
    height: 250,
    minWidth: 'min-w-[300px]',
    minHeight: 'min-h-[250px]',
  },
  mobile: {
    width: 320,
    height: 100,
    minWidth: 'min-w-[320px]',
    minHeight: 'min-h-[100px]',
  },
};

const InlineAd = ({ className = "", size = 'rectangle' }: InlineAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    
    const config = AD_CONFIGS[size];

    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        setAdFailed(true);
      }
    }, AD_LOAD_TIMEOUT);
    
    (window as any).atOptions = {
      key: "59788b78ce7ac0220b51b6164bbec986",
      format: "iframe",
      height: config.height,
      width: config.width,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://evadereprimand.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
    script.async = true;
    script.onerror = () => setAdFailed(true);
    containerRef.current.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      loadedRef.current = false;
    };
  }, [size]);

  const config = AD_CONFIGS[size];

  if (adFailed) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div 
          className={`${config.minHeight} ${config.minWidth} flex items-center justify-center bg-muted/30 rounded-lg border border-border/50`}
          style={{ minHeight: config.height, minWidth: config.width }}
        >
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Premium Content</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Support our free service</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div 
        ref={containerRef} 
        className={`${config.minHeight} ${config.minWidth} flex items-center justify-center`}
        style={{ minHeight: config.height, minWidth: config.width }}
      >
        <span className="text-xs text-muted-foreground/50">Ad</span>
      </div>
    </div>
  );
};

export default InlineAd;
