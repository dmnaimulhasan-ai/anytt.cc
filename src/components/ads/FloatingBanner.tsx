import { useEffect, useState } from "react";
import { X } from "lucide-react";

const AD_LOAD_TIMEOUT = 8000;

const FloatingBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !isDismissed) {
      const container = document.getElementById("floating-banner-container");
      if (container && !container.hasChildNodes()) {
        const timeoutId = setTimeout(() => {
          if (container && !container.querySelector('iframe')) {
            setAdFailed(true);
          }
        }, AD_LOAD_TIMEOUT);

        const optionsScript = document.createElement("script");
        optionsScript.innerHTML = `
          atOptions = {
            'key' : '59788b78ce7ac0220b51b6164bbec986',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        `;
        container.appendChild(optionsScript);

        const invokeScript = document.createElement("script");
        invokeScript.src = "https://evadereprimand.com/59788b78ce7ac0220b51b6164bbec986/invoke.js";
        invokeScript.onerror = () => setAdFailed(true);
        container.appendChild(invokeScript);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [isVisible, isDismissed]);

  if (!isVisible || isDismissed) return null;

  // Don't show floating banner if ad failed - just hide it
  if (adFailed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="relative glass-card rounded-xl p-2 shadow-2xl border border-primary/20">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 hover:bg-muted transition-colors shadow-lg"
          aria-label="Close ad"
        >
          <X className="h-4 w-4" />
        </button>
        <div id="floating-banner-container" className="min-w-[300px] min-h-[250px] flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FloatingBanner;
