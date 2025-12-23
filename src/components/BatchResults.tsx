import { Download, Music, Video, CheckCircle, XCircle, ChevronDown, ChevronUp, Zap, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface VideoData {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  videoUrlNoWatermark: string;
  musicUrl: string;
  musicTitle: string;
}

interface BatchVideoResult {
  url: string;
  success: boolean;
  data?: VideoData;
  error?: string;
}

interface BatchResultsProps {
  results: BatchVideoResult[];
  onReset: () => void;
  autoDownload?: boolean;
}

const BatchResults = ({ results, onReset, autoDownload = false }: BatchResultsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hasAutoDownloaded, setHasAutoDownloaded] = useState(false);
  
  const successCount = results.filter(r => r.success).length;
  const failedCount = results.filter(r => !r.success).length;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { toast } = useToast();

  const handleDownloadAll = useCallback(() => {
    const successfulResults = results.filter(r => r.success && r.data);
    
    if (successfulResults.length === 0) return;

    toast({
      title: "🚀 Starting downloads!",
      description: `Downloading ${successfulResults.length} videos...`,
    });

    successfulResults.forEach((result, index) => {
      setTimeout(() => {
        handleDownload(
          result.data!.videoUrlNoWatermark,
          `tiktok-${result.data!.id}-hd.mp4`
        );
      }, index * 300);
    });
  }, [results, toast]);

  // Auto-download when batch completes
  useEffect(() => {
    if (autoDownload && !hasAutoDownloaded && successCount > 0) {
      setHasAutoDownloaded(true);
      // Small delay to let UI render first
      setTimeout(() => {
        handleDownloadAll();
      }, 500);
    }
  }, [autoDownload, hasAutoDownloaded, successCount, handleDownloadAll]);

  return (
    <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 animate-slide-up neon-border">
      {/* Summary Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold font-display">{successCount} Success</span>
            <Sparkles className="h-4 w-4" />
          </div>
          {failedCount > 0 && (
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              <span className="font-semibold">{failedCount} Failed</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {successCount > 0 && (
            <Button
              onClick={handleDownloadAll}
              className="btn-glow text-primary-foreground rounded-xl border-0"
            >
              <Zap className="h-4 w-4 mr-2" />
              Download All HD ({successCount})
            </Button>
          )}
          <Button
            onClick={onReset}
            variant="outline"
            className="rounded-xl border-border/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            More
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden transition-all ${
              result.success 
                ? 'bg-muted/30 border border-border/50' 
                : 'bg-destructive/10 border border-destructive/30'
            }`}
          >
            {/* Result Header */}
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              )}
              
              {result.success && result.data ? (
                <>
                  <img
                    src={result.data.thumbnail}
                    alt={result.data.title}
                    className="w-12 h-16 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium text-foreground truncate text-sm font-display">
                      {result.data.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @{result.data.author} • {formatDuration(result.data.duration)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm text-foreground truncate">{result.url}</p>
                  <p className="text-xs text-destructive">{result.error} 😢</p>
                </div>
              )}
              
              {result.success && (
                <div className="flex-shrink-0">
                  {expandedIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {result.success && result.data && expandedIndex === index && (
              <div className="p-4 pt-0 border-t border-border/30 bg-muted/20">
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(
                      result.data!.videoUrlNoWatermark,
                      `tiktok-${result.data!.id}-hd.mp4`
                    )}
                    className="btn-glow text-primary-foreground rounded-xl border-0"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    HD ✨
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(
                      result.data!.videoUrl,
                      `tiktok-${result.data!.id}.mp4`
                    )}
                    className="rounded-xl border-border/50"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                  
                  {result.data.musicUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(
                        result.data!.musicUrl,
                        `tiktok-${result.data!.id}-audio.mp3`
                      )}
                      className="rounded-xl border-border/50"
                    >
                      <Music className="h-4 w-4 mr-1" />
                      Audio 🎵
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchResults;
