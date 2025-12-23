import { useState } from "react";
import { Search, Clipboard, X, Loader2, List, Link } from "lucide-react";
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
        title: "URL Pasted",
        description: "Video URL has been pasted from clipboard.",
      });
    } catch (err) {
      toast({
        title: "Paste failed",
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
        title: "URL Required",
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
        title: "Video Found!",
        description: "Your video is ready to download.",
      });
    } else {
      toast({
        title: "Error",
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
        title: "URLs Required",
        description: "Please paste at least one TikTok video URL.",
        variant: "destructive",
      });
      return;
    }

    if (urls.length > 10) {
      toast({
        title: "Too Many URLs",
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
      title: "Batch Complete",
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
    <section className="hero-gradient py-16 pb-24 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
          TikTok Downloader
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Download and Save TikTok Videos Without Watermark.
        </p>

        {/* Mode Toggle */}
        {!showResults && (
          <div className="flex justify-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <Button
              variant={!isBatchMode ? "secondary" : "ghost"}
              onClick={() => !isBatchMode || toggleMode()}
              className={!isBatchMode ? "bg-primary-foreground text-primary" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}
            >
              <Link className="h-4 w-4 mr-2" />
              Single URL
            </Button>
            <Button
              variant={isBatchMode ? "secondary" : "ghost"}
              onClick={() => isBatchMode || toggleMode()}
              className={isBatchMode ? "bg-primary-foreground text-primary" : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"}
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
              className="max-w-3xl mx-auto bg-card rounded-2xl p-6 search-container animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="mb-4">
                <Textarea
                  placeholder="Paste multiple TikTok URLs here (one per line, max 10)..."
                  value={batchUrls}
                  onChange={(e) => setBatchUrls(e.target.value)}
                  className="min-h-32 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2 text-left">
                  {batchUrls.split('\n').filter(u => u.trim()).length} URL(s) entered
                </p>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={handlePaste}
                  className="border-border hover:bg-muted"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Paste
                </Button>
                
                {batchUrls && (
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="border-border hover:bg-muted"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
                
                <Button
                  onClick={handleBatchSearch}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing {processingIndex + 1}/{batchUrls.split('\n').filter(u => u.trim()).length}
                    </>
                  ) : (
                    "Download All"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            // Single URL Input
            <div 
              className="max-w-3xl mx-auto bg-card rounded-full p-2 search-container flex items-center gap-2 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex-1 flex items-center gap-2 pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Paste a TikTok video URL here..."
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
                className="rounded-full border-border hover:bg-muted"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Paste
              </Button>
              
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
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
