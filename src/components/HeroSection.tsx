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
    <section className="hero-gradient min-h-[70vh] py-16 pb-24 px-6 relative">
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6 animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>No watermark • Free forever • No cap fr fr</span>
          <Sparkles className="h-4 w-4 text-secondary" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="gradient-text">TikTok</span>{" "}
          <span className="text-foreground">Downloader</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
          Download TikTok videos without watermark ✨ It's giving main character energy 💅
        </p>

        {/* Mode Toggle */}
        {!showResults && (
          <div className="flex justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <Button
              variant="ghost"
              onClick={() => !isBatchMode || toggleMode()}
              className={`rounded-full px-6 ${!isBatchMode ? "glass-card text-foreground border border-primary/50" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Link className="h-4 w-4 mr-2" />
              Single
            </Button>
            <Button
              variant="ghost"
              onClick={() => isBatchMode || toggleMode()}
              className={`rounded-full px-6 ${isBatchMode ? "glass-card text-foreground border border-secondary/50" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4 mr-2" />
              Batch Mode
            </Button>
          </div>
        )}

        {!showResults ? (
          isBatchMode ? (
            // Batch Mode Input
            <div 
              className="max-w-3xl mx-auto glass-card rounded-3xl p-6 animate-slide-up neon-border"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="mb-4">
                <Textarea
                  placeholder="Paste multiple TikTok URLs here bestie 💕 (one per line, max 10)"
                  value={batchUrls}
                  onChange={(e) => setBatchUrls(e.target.value)}
                  className="min-h-32 bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground resize-none rounded-2xl focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-2 text-left flex items-center gap-1">
                  <Zap className="h-3 w-3 text-secondary" />
                  {batchUrls.split('\n').filter(u => u.trim()).length} URL(s) ready to go
                </p>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handlePaste}
                  className="rounded-full border-border/50 hover:bg-muted/50"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Paste
                </Button>
                
                {batchUrls && (
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="rounded-full border-border/50 hover:bg-muted/50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
                
                <Button
                  onClick={handleBatchSearch}
                  disabled={isLoading}
                  className="rounded-full btn-glow text-primary-foreground px-8 border-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {processingIndex + 1}/{batchUrls.split('\n').filter(u => u.trim()).length}
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Download All
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // Single URL Input
            <div 
              className="max-w-3xl mx-auto glass-card rounded-full p-2 flex items-center gap-2 animate-slide-up neon-border"
              style={{ animationDelay: "0.3s" }}
            >
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
