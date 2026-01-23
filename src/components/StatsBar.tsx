import React, { forwardRef } from "react";
import { Download, Users, TrendingUp } from "lucide-react";
import { useStats } from "@/hooks/useStats";

const StatsBar = forwardRef<HTMLDivElement>((props, ref) => {
  const { stats, isLoading } = useStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center gap-8 py-4">
        <div className="h-8 w-32 bg-muted/50 rounded-xl animate-pulse" />
        <div className="h-8 w-32 bg-muted/50 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-4 md:gap-8 py-4 animate-fade-in" {...props}>
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-card border border-border/30">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary to-accent">
          <Download className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="text-lg font-black font-display text-foreground">
            {formatNumber(stats.downloads)}
          </p>
          <p className="text-xs text-muted-foreground -mt-0.5">Downloads</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-card border border-border/30">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-secondary to-primary">
          <Users className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="text-lg font-black font-display text-foreground">
            {formatNumber(stats.users)}
          </p>
          <p className="text-xs text-muted-foreground -mt-0.5">Happy Users</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-card border border-border/30">
        <div className="p-1.5 rounded-lg bg-gradient-to-r from-accent to-secondary">
          <TrendingUp className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="text-lg font-black font-display text-foreground">
            100%
          </p>
          <p className="text-xs text-muted-foreground -mt-0.5">Free Forever</p>
        </div>
      </div>
    </div>
  );
});

StatsBar.displayName = "StatsBar";

export default StatsBar;
