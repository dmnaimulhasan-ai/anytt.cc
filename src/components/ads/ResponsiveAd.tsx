import { useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";
import { ArrowRight } from "lucide-react";

const DIRECT_LINK_URL = "https://omg10.com/4/1073301";

const VARIATIONS = [
  { emoji: "🌟", text: "You might like this", cta: "Check it out" },
  { emoji: "🎯", text: "Picked for you", cta: "See more" },
  { emoji: "✨", text: "Something special", cta: "Discover" },
];

interface ResponsiveAdProps {
  className?: string;
  position?: "after-input" | "below-results" | "between-sections";
}

const ResponsiveAd = ({ className = "", position = "between-sections" }: ResponsiveAdProps) => {
  const [variation] = useState(() => VARIATIONS[Math.floor(Math.random() * VARIATIONS.length)]);
  const { trackAdEvent } = useAdAnalytics();

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "ResponsiveAd", adPosition: position });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`my-4 px-4 ${className}`}>
      <div
        onClick={handleClick}
        className="cursor-pointer mx-auto max-w-2xl rounded-xl border border-border/50 bg-muted/30 p-3 flex items-center justify-between gap-3 transition-all hover:bg-muted/50 active:scale-[0.98]"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{variation.emoji}</span>
          <span className="text-sm text-muted-foreground">{variation.text}</span>
        </div>
        <span className="text-xs text-primary font-medium flex items-center gap-1">
          {variation.cta} <ArrowRight className="w-3 h-3" />
        </span>
      </div>
      <p className="text-[9px] text-muted-foreground/40 text-center mt-1">Sponsored</p>
    </div>
  );
};

export default ResponsiveAd;
