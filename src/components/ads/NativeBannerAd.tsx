import { useEffect, useRef } from 'react';

const NativeBannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    
    const script = document.createElement('script');
    script.src = 'https://evadereprimand.com/d1ae3e166b7ee06ce3e6ba5efc2ecbf3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      scriptLoaded.current = false;
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4">
      <div 
        ref={containerRef}
        id="container-d1ae3e166b7ee06ce3e6ba5efc2ecbf3"
        className="flex justify-center"
      />
    </div>
  );
};

export default NativeBannerAd;
