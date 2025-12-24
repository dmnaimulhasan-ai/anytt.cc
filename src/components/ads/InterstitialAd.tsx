import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADS_ENABLED } from "./AdPlaceholder";

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  autoCloseDelay?: number; // in seconds
}

const InterstitialAd = ({ isOpen, onClose, autoCloseDelay = 5 }: InterstitialAdProps) => {
  const [countdown, setCountdown] = useState(autoCloseDelay);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!isOpen || !ADS_ENABLED) return;

    setCountdown(autoCloseDelay);
    setCanClose(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, autoCloseDelay]);

  if (!ADS_ENABLED || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg mx-4 p-6 glass-card rounded-3xl">
        <div className="absolute top-4 right-4">
          {canClose ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-10 w-10 hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          ) : (
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
              {countdown}
            </div>
          )}
        </div>

        <div className="h-64 md:h-80 mt-8 flex items-center justify-center bg-muted/20 rounded-xl overflow-hidden">
          {/* PropellerAds interstitial content - shown via scripts in index.html */}
          <div id="propeller-interstitial-ad" className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Loading ad...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;
