import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSpinnerProps {
  platform: string;
}

const LoadingSpinner = ({ platform }: LoadingSpinnerProps) => {
  return (
    <div className="max-w-xl mx-auto glass-card rounded-3xl p-5 md:p-6 animate-bounce-in neon-border">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Thumbnail Skeleton */}
        <div className="relative flex-shrink-0 mx-auto sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl animate-pulse" />
          <Skeleton className="relative w-36 sm:w-40 h-48 sm:h-56 rounded-2xl" />
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-4 text-left">
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Button Skeletons */}
          <div className="space-y-2.5 pt-2">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <div className="flex gap-2">
              <Skeleton className="h-12 flex-1 rounded-2xl" />
              <Skeleton className="h-12 flex-1 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-border/30">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Fetching {platform} video info...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
