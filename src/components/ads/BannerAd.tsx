import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

const BannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;

    window.atOptions = {
      key: '2120bc2aaa55e77fb15218d3cbc8d791',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {}
    };

    const script = document.createElement('script');
    script.src = 'https://evadereprimand.com/2120bc2aaa55e77fb15218d3cbc8d791/invoke.js';
    script.async = true;
    
    containerRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      scriptLoaded.current = false;
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-3">
      <div ref={containerRef} className="min-h-[50px]" />
    </div>
  );
};

export default BannerAd;
