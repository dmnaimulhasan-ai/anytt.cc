import { cn } from "@/lib/utils";

// Set this to true when ready to activate ads
export const ADS_ENABLED = true;

interface AdPlaceholderProps {
  type: "banner" | "header" | "interstitial" | "rewarded";
  className?: string;
  children?: React.ReactNode;
}

const adConfigs = {
  header: {
    height: "h-16",
    label: "Header Banner Ad",
  },
  banner: {
    height: "h-24 md:h-28",
    label: "Banner Ad",
  },
  interstitial: {
    height: "h-full",
    label: "Interstitial Ad",
  },
  rewarded: {
    height: "h-full",
    label: "Rewarded Ad",
  },
};

const AdPlaceholder = ({ type, className, children }: AdPlaceholderProps) => {
  if (!ADS_ENABLED) return null;

  const config = adConfigs[type];

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted/30 border border-dashed border-border/50 rounded-xl text-muted-foreground text-sm",
        config.height,
        className
      )}
    >
      {children || (
        <span className="opacity-50">{config.label}</span>
      )}
    </div>
  );
};

export default AdPlaceholder;
