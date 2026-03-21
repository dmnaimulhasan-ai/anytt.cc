import { useEffect, useRef, useState } from "react";
import { useAdAnalytics } from "@/hooks/useAdAnalytics";
import { ExternalLink, Sparkles, TrendingUp, Award } from "lucide-react";

const DIRECT_LINK_URL = "https://omg10.com/4/1073301";

const NATIVE_VARIATIONS = [
  { icon: Sparkles, label: "Recommended", title: "Discover Something New", desc: "Curated for you — tap to explore", color: "text-primary" },
  { icon: TrendingUp, label: "Trending", title: "Popular Right Now", desc: "See what everyone's talking about", color: "text-secondary" },
  { icon: Award, label: "Featured", title: "Editor's Pick", desc: "Hand-picked content just for you", color: "text-accent" },
];

interface NativeBannerProps {
  className?: string;
}

const NativeBanner = ({ className = "" }: NativeBannerProps) => {
  const [variation] = useState(() => NATIVE_VARIATIONS[Math.floor(Math.random() * NATIVE_VARIATIONS.length)]);
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const { trackAdEvent } = useAdAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "NativeBanner" });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  const Icon = variation.icon;

  return (
    <div
      ref={adRef}
      className={`my-6 px-4 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
      }}
    >
      <div
        onClick={handleClick}
        className="group cursor-pointer mx-auto max-w-2xl glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30 active:scale-[0.98]"
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${variation.color} transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20`}>
            <Icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">{variation.label}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            </div>
            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors duration-300">{variation.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{variation.desc}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-1 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};

export default NativeBanner;
