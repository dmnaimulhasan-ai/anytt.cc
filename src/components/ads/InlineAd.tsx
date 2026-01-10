import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    
    const config = AD_CONFIGS[size];
    
    // Set atOptions on window
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
    containerRef.current.appendChild(script);

    return () => {
      loadedRef.current = false;
    };
  }, [size]);

  const config = AD_CONFIGS[size];

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
