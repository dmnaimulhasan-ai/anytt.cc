import { useState } from "react";
import { Search, Clipboard, X, Loader2, List, Link, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VideoResult from "./VideoResult";
import BatchResults from "./BatchResults";

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

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [batchUrls, setBatchUrls] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [batchResults, setBatchResults] = useState<BatchVideoResult[]>([]);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (isBatchMode) {
        setBatchUrls(prev => prev ? `${prev}\n${text}` : text);
      } else {
        setUrl(text);
      }
      toast({
        title: "✨ URL Pasted",
        description: "Video URL has been pasted from clipboard.",
      });
    } catch (err) {
      toast({
        title: "😅 Paste failed",
        description: "Please paste the URL manually.",
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
      const { data, error } = await supabase.functions.invoke('tiktok-download', {
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
        title: "🔗 URL Required",
        description: "Please paste a TikTok video URL first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVideoData(null);

    const result = await fetchVideo(url);
    
    if (result.success && result.data) {
      setVideoData(result.data);
      toast({
        title: "🎉 Video Found!",
        description: "Your video is ready to download.",
      });
    } else {
      toast({
        title: "❌ Error",
        description: result.error || "Could not fetch video data.",
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
        title: "🔗 URLs Required",
        description: "Please paste at least one TikTok video URL.",
        variant: "destructive",
      });
      return;
    }

    if (urls.length > 10) {
      toast({
        title: "⚠️ Too Many URLs",
        description: "Please paste no more than 10 URLs at once.",
        variant: "destructive",
      });
      return;
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
      title: "🎊 Batch Complete",
      description: `Successfully fetched ${successCount} of ${urls.length} videos.`,
    });
  };

  const handleReset = () => {
    setUrl("");
    setBatchUrls("");
    setVideoData(null);
    setBatchResults([]);
    setProcessingIndex(-1);
  };

  const toggleMode = () => {
    setIsBatchMode(!isBatchMode);
    handleClear();
  };

  const showResults = videoData || batchResults.length > 0;

  return (
    <section className="hero-gradient min-h-[60vh] md:min-h-[70vh] py-8 md:py-16 pb-16 md:pb-24 px-4 md:px-6 relative">
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass-card text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 animate-fade-in">
          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          <span>No watermark • Free forever</span>
          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold font-display mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="gradient-text">TikTok</span>{" "}
          <span className="text-foreground">Downloader</span>
        </h1>
        <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 animate-fade-in max-w-2xl mx-auto px-2" style={{ animationDelay: "0.2s" }}>
          Download videos without watermark ✨ It's giving main character energy 💅
        </p>

        {/* Mode Toggle */}
        {!showResults && (
          <div className="flex justify-center gap-2 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <Button
              variant="ghost"
              onClick={() => !isBatchMode || toggleMode()}
              className={`rounded-full px-4 md:px-6 h-11 md:h-10 text-sm ${!isBatchMode ? "glass-card text-foreground border border-primary/50" : "text-muted-foreground hover:text-foreground active:bg-muted/50"}`}
            >
              <Link className="h-4 w-4 mr-2" />
              Single
            </Button>
            <Button
              variant="ghost"
              onClick={() => isBatchMode || toggleMode()}
              className={`rounded-full px-4 md:px-6 h-11 md:h-10 text-sm ${isBatchMode ? "glass-card text-foreground border border-secondary/50" : "text-muted-foreground hover:text-foreground active:bg-muted/50"}`}
            >
              <List className="h-4 w-4 mr-2" />
              Batch
            </Button>
          </div>
        )}

        {!showResults ? (
          isBatchMode ? (
            // Batch Mode Input
            <div 
              className="max-w-3xl mx-auto glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 animate-slide-up neon-border"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="mb-4">
                <Textarea
                  placeholder="Paste TikTok URLs here 💕 (one per line, max 10)"
                  value={batchUrls}
                  onChange={(e) => setBatchUrls(e.target.value)}
                  className="min-h-28 md:min-h-32 bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none rounded-xl md:rounded-2xl focus:ring-primary text-base"
                />
                <p className="text-xs text-muted-foreground mt-2 text-left flex items-center gap-1">
                  <Zap className="h-3 w-3 text-secondary" />
                  {batchUrls.split('\n').filter(u => u.trim()).length} URL(s) ready
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePaste}
                    className="flex-1 sm:flex-none rounded-xl h-12 sm:h-10 border-border/50 hover:bg-muted/50 active:bg-muted text-base"
                  >
                    <Clipboard className="h-5 w-5 mr-2" />
                    Paste
                  </Button>
                  
                  {batchUrls && (
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      className="rounded-xl h-12 sm:h-10 border-border/50 hover:bg-muted/50 active:bg-muted px-4"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                
                <Button
                  onClick={handleBatchSearch}
                  disabled={isLoading}
                  className="rounded-xl h-12 sm:h-10 btn-glow text-primary-foreground px-6 sm:px-8 border-0 text-base font-semibold"
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
            // Single URL Input - Mobile Optimized
            <div 
              className="max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Mobile: Stacked Layout */}
              <div className="flex flex-col gap-3 md:hidden">
                <div className="glass-card rounded-2xl p-3 flex items-center gap-2 neon-border">
                  <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <Input
                    type="url"
                    placeholder="Paste TikTok URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground text-base h-10"
                  />
                  {url && (
                    <button
                      onClick={handleClear}
                      className="p-2 hover:bg-muted rounded-full transition-colors active:bg-muted"
                    >
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePaste}
                    className="flex-1 rounded-xl h-12 border-border/50 hover:bg-muted/50 active:bg-muted text-base"
                  >
                    <Clipboard className="h-5 w-5 mr-2" />
                    Paste
                  </Button>
                  
                  <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="flex-1 rounded-xl h-12 btn-glow text-primary-foreground border-0 text-base font-semibold"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Desktop: Inline Layout */}
              <div className="hidden md:flex glass-card rounded-full p-2 items-center gap-2 neon-border">
                <div className="flex-1 flex items-center gap-2 pl-4">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Paste a TikTok URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
                  />
                  {url && (
                    <button
                      onClick={handleClear}
                      className="p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={handlePaste}
                  className="rounded-full border-border/50 hover:bg-muted/50"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Paste
                </Button>
                
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="rounded-full btn-glow text-primary-foreground px-8 border-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Go
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        ) : videoData ? (
          <VideoResult video={videoData} onReset={handleReset} />
        ) : (
          <BatchResults results={batchResults} onReset={handleReset} />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
