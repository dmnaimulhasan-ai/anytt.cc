import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveAdProps {
  className?: string;
  position?: 'after-input' | 'below-results' | 'between-sections';
}

const ResponsiveAd = ({ className = "", position = 'between-sections' }: ResponsiveAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    
    // Mobile: 320x100, Desktop: 728x90 for after-input, 300x250 for others
    const config = isMobile 
      ? { width: 320, height: 100 }
      : position === 'after-input' 
        ? { width: 728, height: 90 }
        : { width: 300, height: 250 };
    
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
  }, [isMobile, position]);

  const minHeight = isMobile ? 100 : position === 'after-input' ? 90 : 250;
  const minWidth = isMobile ? 320 : position === 'after-input' ? 728 : 300;

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div 
        ref={containerRef} 
        className="flex items-center justify-center"
        style={{ minHeight, minWidth }}
      >
        <span className="text-xs text-muted-foreground/30">Sponsored</span>
      </div>
    </div>
  );
};

export default ResponsiveAd;
