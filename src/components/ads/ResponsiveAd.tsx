import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "ResponsiveAd", adPosition: position });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={adRef}
      className={`my-4 px-4 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      <div
        onClick={handleClick}
        className="group cursor-pointer mx-auto max-w-2xl rounded-xl border border-border/50 bg-muted/30 p-3 flex items-center justify-between gap-3 transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 active:scale-[0.98]"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl transition-transform duration-500 group-hover:scale-125">{variation.emoji}</span>
          <span className="text-sm text-muted-foreground">{variation.text}</span>
        </div>
        <span className="text-xs text-primary font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2">
          {variation.cta} <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      <p className="text-[9px] text-muted-foreground/40 text-center mt-1">Sponsored</p>
    </div>
  );
};

export default ResponsiveAd;
