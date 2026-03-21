import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";
import { ExternalLink, Gift, Flame, Zap, Star } from "lucide-react";

const DIRECT_LINK_URL = "https://omg10.com/4/1073301";

const AD_VARIATIONS = [
  { icon: Flame, emoji: "🔥", title: "Exclusive Deal", subtitle: "Claim Your Reward Today!", bg: "from-primary to-accent" },
  { icon: Gift, emoji: "🎁", title: "Free Gift", subtitle: "Limited Time Offer!", bg: "from-secondary to-primary" },
  { icon: Zap, emoji: "⚡", title: "Trending Now", subtitle: "Don't Miss Out!", bg: "from-accent to-secondary" },
  { icon: Star, emoji: "💰", title: "Special Offer", subtitle: "Click to Unlock!", bg: "from-primary to-secondary" },
];

interface BannerAdProps {
  className?: string;
}

const BannerAd = ({ className = "" }: BannerAdProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [variation] = useState(() => AD_VARIATIONS[Math.floor(Math.random() * AD_VARIATIONS.length)]);
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const { trackAdEvent } = useAdAnalytics();

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  // Load Monetag In-Page Push script in background
  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;
    const script = document.createElement("script");
    script.dataset.zone = "10733016";
    script.src = "https://nap5k.com/tag.min.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "BannerAd" });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={adRef}
      className={`my-6 px-4 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <p className="text-[10px] text-muted-foreground/50 text-center mb-2 uppercase tracking-wider">
        Sponsored
      </p>
      <div
        onClick={handleClick}
        className={`group cursor-pointer mx-auto max-w-2xl rounded-2xl bg-gradient-to-r ${variation.bg} p-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
      >
        <div className="rounded-2xl bg-card/95 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {variation.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">{variation.title}</p>
            <p className="text-xs text-muted-foreground">{variation.subtitle}</p>
          </div>
          <div className="flex-shrink-0 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:gap-2.5">
            Open <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
      {/* Hidden Monetag script container */}
      <div ref={containerRef} className="hidden" />
    </div>
  );
};

BannerAd.displayName = "BannerAd";
export default BannerAd;
