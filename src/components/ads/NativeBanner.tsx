import { useState } from "react";
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
  const { trackAdEvent } = useAdAnalytics();

  const handleClick = () => {
    trackAdEvent({ eventType: "click", adComponent: "NativeBanner" });
    window.open(DIRECT_LINK_URL, "_blank", "noopener,noreferrer");
  };

  const Icon = variation.icon;

  return (
    <div className={`my-6 px-4 ${className}`}>
      <div
        onClick={handleClick}
        className="cursor-pointer mx-auto max-w-2xl glass-card rounded-2xl p-5 transition-all hover:shadow-lg hover:border-primary/30 active:scale-[0.98]"
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${variation.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">{variation.label}</span>
            </div>
            <p className="font-bold text-foreground text-sm">{variation.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{variation.desc}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default NativeBanner;
