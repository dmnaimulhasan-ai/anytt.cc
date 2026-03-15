import { useState } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdMonetization } from "@/hooks/useAdMonetization";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";

interface SmartlinkButtonProps {
  className?: string;
}

const SmartlinkButton = ({ className = "" }: SmartlinkButtonProps) => {
  const { isSmartlinkTriggered, triggerSmartlink } = useAdMonetization();
  const { trackAdEvent } = useAdAnalytics();
  const [hasClicked, setHasClicked] = useState(false);

  const alreadyTriggered = isSmartlinkTriggered();

  const handleClick = () => {
    if (alreadyTriggered || hasClicked) return;
    
    setHasClicked(true);
    const success = triggerSmartlink();
    
    trackAdEvent({
      eventType: success ? "click" : "failure",
      adComponent: "SmartlinkButton",
      errorReason: success ? undefined : "Already triggered or blocked",
    });
  };

  if (alreadyTriggered) return null;

  return (
    <div className={`text-center space-y-3 ${className}`}>
      <p className="text-xs text-muted-foreground/70">
        You may see a short ad in a new tab. Ads help keep this service free.
      </p>
      
      <Button
        onClick={handleClick}
        disabled={hasClicked}
        variant="outline"
        className="rounded-2xl h-12 px-6 border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold transition-all"
      >
        <Heart className="h-4 w-4 mr-2 text-primary" />
        Support Us
        <ExternalLink className="h-3 w-3 ml-2 opacity-50" />
      </Button>

      {hasClicked && (
        <p className="text-xs text-muted-foreground animate-fade-in">
          Thank you for your support! 💜
        </p>
      )}
    </div>
  );
};

export default SmartlinkButton;
