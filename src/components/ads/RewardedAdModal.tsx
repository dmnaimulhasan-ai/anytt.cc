import { useState, useEffect } from "react";
import { Gift, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdPlaceholder, { ADS_ENABLED } from "./AdPlaceholder";

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardEarned: () => void;
  requiredWatchTime?: number; // in seconds
}

const RewardedAdModal = ({ 
  isOpen, 
  onClose, 
  onRewardEarned, 
  requiredWatchTime = 10 
}: RewardedAdModalProps) => {
  const [progress, setProgress] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);

  useEffect(() => {
    if (!isOpen || !ADS_ENABLED) {
      setProgress(0);
      setIsWatching(false);
      setRewardEarned(false);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isWatching || !ADS_ENABLED) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / requiredWatchTime);
        if (next >= 100) {
          setRewardEarned(true);
          setIsWatching(false);
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isWatching, requiredWatchTime]);

  const handleStartWatching = () => {
    setIsWatching(true);
  };

  const handleClaimReward = () => {
    onRewardEarned();
    onClose();
  };

  if (!ADS_ENABLED || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg mx-4 p-6 glass-card rounded-3xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full h-10 w-10 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
            <Gift className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Unlock Large Batch Download
          </h3>
          <p className="text-muted-foreground text-sm">
            Watch a short ad to unlock batch downloads up to 100 videos
          </p>
        </div>

        <AdPlaceholder type="rewarded" className="h-48 md:h-56 mb-6">
          <span className="opacity-50">Rewarded Ad Content</span>
        </AdPlaceholder>

        {/* Progress bar */}
        {isWatching && (
          <div className="mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {Math.ceil((100 - progress) / (100 / requiredWatchTime))}s remaining
            </p>
          </div>
        )}

        {!isWatching && !rewardEarned && (
          <Button
            onClick={handleStartWatching}
            className="w-full rounded-2xl h-12 btn-glow text-primary-foreground font-bold"
          >
            Watch Ad to Unlock
          </Button>
        )}

        {isWatching && (
          <Button
            disabled
            className="w-full rounded-2xl h-12 bg-muted text-muted-foreground font-bold"
          >
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Watching...
          </Button>
        )}

        {rewardEarned && (
          <Button
            onClick={handleClaimReward}
            className="w-full rounded-2xl h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:opacity-90"
          >
            <Gift className="h-5 w-5 mr-2" />
            Claim Reward & Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default RewardedAdModal;
