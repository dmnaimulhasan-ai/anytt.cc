import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";
import { ArrowRight } from "lucide-react";

const DIRECT_LINK_URL = "https://omg10.com/4/1073301";

const INLINE_VARIATIONS = [
  { emoji: "🎁", text: "Claim Your Free Reward", cta: "Get It Now" },
  { emoji: "⚡", text: "Flash Deal — Limited Time", cta: "Grab It" },
  { emoji: "🔥", text: "Hot Offer Just For You", cta: "Explore" },
  { emoji: "💎", text: "Premium Content Unlocked", cta: "View Now" },
];

interface InlineAdProps {
  className?: string;
}

const InlineAd = ({ className = "" }: InlineAdProps) => {
  const [variation] = useState(() => INLINE_VARIATIONS[Math.floor(Math.random() * INLINE_VARIATIONS.length)]);
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
    trackAdEvent({ eventType: "click", adComponent: "InlineAd" });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={adRef}
      className={`my-4 px-4 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <div
        onClick={handleClick}
        className="group cursor-pointer mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 p-4 flex items-center justify-between gap-3 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:from-primary/15 hover:to-primary/15 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">{variation.emoji}</span>
          <span className="font-semibold text-sm text-foreground">{variation.text}</span>
        </div>
        <div className="flex-shrink-0 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all duration-300 group-hover:gap-2 group-hover:shadow-md">
          {variation.cta} <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground/40 text-center mt-1 uppercase tracking-wider">Ad</p>
    </div>
  );
};

export default InlineAd;
