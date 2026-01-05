import { useEffect, useRef } from "react";

const BannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set atOptions on window
    (window as any).atOptions = {
      key: "59788b78ce7ac0220b51b6164bbec986",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://evadereprimand.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div ref={containerRef} className="min-h-[250px] min-w-[300px]"></div>
    </div>
  );
};

export default BannerAd;
