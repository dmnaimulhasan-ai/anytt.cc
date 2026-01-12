import { useState } from "react";
import { Search, Clipboard, X, Loader2, List, Link, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VideoResult from "./VideoResult";
import BatchResults from "./BatchResults";
import LoadingSpinner from "./LoadingSpinner";
import NativeBanner from "./ads/NativeBanner";
import { useAdMonetization } from "@/hooks/useAdMonetization";

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

interface PlatformDownloaderProps {
  platform: 'tiktok' | 'youtube' | 'facebook';
  platformName: string;
  platformIcon: string;
  functionName: string;
  placeholder: string;
  batchPlaceholder: string;
  accentColor: string;
}

const PlatformDownloader = ({
  platform,
  platformName,
  platformIcon,
  functionName,
  placeholder,
  batchPlaceholder,
  accentColor
}: PlatformDownloaderProps) => {
  const [url, setUrl] = useState("");
  const [batchUrls, setBatchUrls] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [batchResults, setBatchResults] = useState<BatchVideoResult[]>([]);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const [isAdDelaying, setIsAdDelaying] = useState(false);
  const { toast } = useToast();
  const { handleDownloadClick } = useAdMonetization();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (isBatchMode) {
        setBatchUrls(prev => prev ? `${prev}\n${text}` : text);
      } else {
        setUrl(text);
      }
      toast({
        title: "✨ Pasted!",
        description: "URL ready to download",
      });
    } catch (err) {
      toast({
        title: "😅 Oops",
        description: "Please paste manually",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setUrl("");
    setBatchUrls("");
    setVideoData(null);
    setBatchResults([]);
    setProcessingIndex(-1);
  };

  const fetchVideo = async (videoUrl: string): Promise<BatchVideoResult> => {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { url: videoUrl.trim() }
      });

      if (error) {
        return { url: videoUrl, success: false, error: 'Failed to process video' };
      }

      if (!data.success) {
        return { url: videoUrl, success: false, error: data.error || 'Could not fetch video' };
      }

      return { url: videoUrl, success: true, data: data.data };
    } catch (error) {
      return { url: videoUrl, success: false, error: 'An unexpected error occurred' };
    }
  };

  const handleSearch = async () => {
    if (!url.trim()) {
      toast({
        title: "🔗 Need a link!",
        description: `Paste a ${platformName} URL first`,
        variant: "destructive",
      });
      return;
    }

    // Smart ad monetization - first click triggers popunder with delay
    const adResult = await handleDownloadClick();
    
    if (adResult.shouldDelay) {
      setIsAdDelaying(true);
      toast({
        title: "⏳ Processing...",
        description: "Your video will be ready in a moment",
      });
      
      await new Promise(resolve => setTimeout(resolve, adResult.delayMs));
      setIsAdDelaying(false);
    }

    setIsLoading(true);
    setVideoData(null);

    const result = await fetchVideo(url);
    
    if (result.success && result.data) {
      setVideoData(result.data);
      toast({
        title: "🎉 Success!",
        description: "Video ready to download",
      });
    } else {
      toast({
        title: "❌ Failed",
        description: result.error || "Could not fetch video",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleBatchSearch = async () => {
    const urls = batchUrls
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urls.length === 0) {
      toast({
        title: "🔗 Need links!",
        description: `Paste some ${platformName} URLs`,
        variant: "destructive",
      });
      return;
    }

    if (urls.length > 100) {
      toast({
        title: "⚠️ Too many!",
        description: "Maximum 100 videos at once",
        variant: "destructive",
      });
      return;
    }

    // Smart ad monetization - first click triggers popunder with delay
    const adResult = await handleDownloadClick();
    
    if (adResult.shouldDelay) {
      setIsAdDelaying(true);
      toast({
        title: "⏳ Processing...",
        description: "Your videos will be ready in a moment",
      });
      
      await new Promise(resolve => setTimeout(resolve, adResult.delayMs));
      setIsAdDelaying(false);
    }

    setIsLoading(true);
    setBatchResults([]);
    
    const results: BatchVideoResult[] = [];

    for (let i = 0; i < urls.length; i++) {
      setProcessingIndex(i);
      const result = await fetchVideo(urls[i]);
      results.push(result);
      setBatchResults([...results]);
    }

    setProcessingIndex(-1);
    setIsLoading(false);

    const successCount = results.filter(r => r.success).length;
    toast({
      title: "🎊 Done!",
      description: `Got ${successCount}/${urls.length} videos`,
    });
  };

  const toggleMode = () => {
    setIsBatchMode(!isBatchMode);
    handleClear();
  };

  const showResults = videoData || batchResults.length > 0;

  return (
    <div className="w-full">
      {/* Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="font-medium">No watermark • Free forever • No cap</span>
          <Star className="h-4 w-4 text-secondary fill-secondary" />
        </div>
      </div>

      <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
        <span className="gradient-text">{platformName}</span>
        <br className="md:hidden" />
        <span className="text-foreground"> Downloader</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-xl mx-auto font-medium">
        Download {platformName} videos without watermark in HD
        <span className="inline-block ml-2 animate-bounce">🚀</span>
      </p>

      {/* Mode Toggle */}
      {!showResults && (
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant="ghost"
            onClick={() => !isBatchMode || toggleMode()}
            className={`rounded-2xl px-4 h-10 text-xs font-semibold transition-all ${
              !isBatchMode 
                ? "bg-muted/50 text-foreground border border-border/50" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link className="h-3.5 w-3.5 mr-1.5" />
            Single
          </Button>
          <Button
            variant="ghost"
            onClick={() => isBatchMode || toggleMode()}
            className={`rounded-2xl px-4 h-10 text-xs font-semibold transition-all ${
              isBatchMode 
                ? "bg-muted/50 text-foreground border border-border/50" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-3.5 w-3.5 mr-1.5" />
            Batch
          </Button>
        </div>
      )}

      {isLoading && !isBatchMode ? (
        <LoadingSpinner platform={platformName} />
      ) : !showResults ? (
        isBatchMode ? (
          // Batch Mode Input
          <div className="max-w-2xl mx-auto glass-card rounded-3xl p-5 md:p-6">
            <div className="mb-4">
              <Textarea
                placeholder={batchPlaceholder}
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                className="min-h-40 bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none rounded-2xl focus:ring-2 focus:ring-primary/50 text-base"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-secondary" />
                  {batchUrls.split('\n').filter(u => u.trim()).length}/100 URLs
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handlePaste}
                className="flex-1 sm:flex-none rounded-2xl h-13 sm:h-12 border-border/50 hover:bg-muted/50 active:scale-95 transition-all text-base font-semibold"
              >
                <Clipboard className="h-5 w-5 mr-2" />
                Paste
              </Button>
              
              {batchUrls && (
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="rounded-2xl h-13 sm:h-12 border-border/50 hover:bg-muted/50 active:scale-95 px-5"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              
              <Button
                onClick={handleBatchSearch}
                disabled={isLoading}
                className="flex-1 rounded-2xl h-13 sm:h-12 btn-glow text-primary-foreground border-0 text-base font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {processingIndex + 1}/{batchUrls.split('\n').filter(u => u.trim()).length}
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Download All
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          // Single URL Input
          <div className="max-w-2xl mx-auto">
            {/* Mobile: Stacked */}
            <div className="flex flex-col gap-3 md:hidden">
              <div className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-border/30">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <Input
                  type="url"
                  placeholder={placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-base h-10"
                />
                {url && (
                  <button
                    onClick={handleClear}
                    className="p-2 hover:bg-muted rounded-xl transition-colors active:scale-95"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePaste}
                  className="flex-1 rounded-2xl h-14 border-border/50 hover:bg-muted/50 active:scale-95 text-base font-semibold"
                >
                  <Clipboard className="h-5 w-5 mr-2" />
                  Paste
                </Button>
                
                <Button
                  onClick={handleSearch}
                  disabled={isLoading || isAdDelaying}
                  className="flex-1 rounded-2xl h-14 btn-glow text-primary-foreground border-0 text-base font-bold"
                >
                  {isLoading || isAdDelaying ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      {isAdDelaying ? "Wait..." : "Loading"}
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Download
                    </>
                  )}
                </Button>
                </div>
              </div>

            {/* Desktop: Inline */}
            <div className="hidden md:flex glass-card rounded-full p-2 items-center gap-2 border border-border/30">
              <div className="flex-1 flex items-center gap-3 pl-5">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder={`Paste a ${platformName} link here...`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-lg"
                />
                {url && (
                  <button
                    onClick={handleClear}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={handlePaste}
                className="rounded-full h-12 px-5 border-border/50 hover:bg-muted/50 font-semibold"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Paste
              </Button>
              
              <Button
                onClick={handleSearch}
                disabled={isLoading || isAdDelaying}
                className="rounded-full h-12 btn-glow text-primary-foreground px-8 border-0 font-bold text-base"
              >
                {isLoading || isAdDelaying ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {isAdDelaying ? "Wait..." : ""}
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="mt-8 animate-fade-in">
          {videoData && (
            <VideoResult video={videoData} onReset={handleClear} platform={platform} />
          )}
          {batchResults.length > 0 && (
            <BatchResults 
              results={batchResults} 
              onReset={handleClear}
              isProcessing={isLoading}
            />
          )}
          
          {/* Native Banner below download results */}
          <NativeBanner />
        </div>
      )}
    </div>
  );
};

export default PlatformDownloader;
