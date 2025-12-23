import { useState } from "react";
import { Search, Clipboard, X, Loader2, List, Link, Zap, Sparkles, Star, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VideoResult from "./VideoResult";
import BatchResults from "./BatchResults";

type Platform = 'tiktok' | 'youtube';

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
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [batchResults, setBatchResults] = useState<BatchVideoResult[]>([]);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const { toast } = useToast();

  const platformConfig = {
    tiktok: {
      name: 'TikTok',
      placeholder: 'Paste TikTok link...',
      batchPlaceholder: 'Paste TikTok URLs here bestie 💕\nOne per line, up to 100 videos!',
      function: 'tiktok-download',
      icon: '🎵',
      color: 'primary'
    },
    youtube: {
      name: 'YouTube',
      placeholder: 'Paste YouTube link...',
      batchPlaceholder: 'Paste YouTube URLs here bestie 💕\nOne per line, up to 100 videos!',
      function: 'youtube-download',
      icon: '▶️',
      color: 'destructive'
    }
  };

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
        description: "URL ready to go bestie",
      });
    } catch (err) {
      toast({
        title: "😅 Oops",
        description: "Paste manually pls",
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
      const { data, error } = await supabase.functions.invoke(platformConfig[platform].function, {
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
        description: `Paste a ${platformConfig[platform].name} URL first`,
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
        title: "🎉 Slay!",
        description: "Video ready to download",
      });
    } else {
      toast({
        title: "💀 Failed",
        description: result.error || "Couldn't fetch video",
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
        description: `Paste some ${platformConfig[platform].name} URLs`,
        variant: "destructive",
      });
      return;
    }

    if (urls.length > 100) {
      toast({
        title: "⚠️ Too many!",
        description: "Max 100 at once bestie",
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
      title: "🎊 Done!",
      description: `Got ${successCount}/${urls.length} videos`,
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

  const switchPlatform = (newPlatform: Platform) => {
    if (newPlatform !== platform) {
      setPlatform(newPlatform);
      handleClear();
    }
  };

  const showResults = videoData || batchResults.length > 0;

  return (
    <section className="hero-gradient min-h-[65vh] md:min-h-[70vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
      {/* Floating blobs */}
      <div className="floating-blob blob-1" />
      <div className="floating-blob blob-2" />
      <div className="floating-blob blob-3" />

      <div className="container mx-auto text-center relative z-10">
        {/* Floating emojis */}
        <div className="absolute top-0 left-[10%] text-3xl emoji-float" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-[20%] right-[15%] text-2xl emoji-float" style={{ animationDelay: '0.5s' }}>💅</div>
        <div className="absolute bottom-[30%] left-[5%] text-2xl emoji-float hidden md:block" style={{ animationDelay: '1s' }}>🔥</div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground mb-6 animate-bounce-in">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="font-medium">No watermark • Free forever • No cap</span>
          <Star className="h-4 w-4 text-secondary fill-secondary" />
        </div>

        <h1 className="text-5xl md:text-8xl font-black font-display mb-4 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
          <span className="gradient-text">Video</span>
          <br className="md:hidden" />
          <span className="text-foreground"> Saver</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-xl mx-auto font-medium" style={{ animationDelay: "0.2s" }}>
          Download vids without the watermark 
          <span className="inline-block ml-2 animate-bounce">🚀</span>
        </p>

        {/* Platform Toggle */}
        {!showResults && (
          <div className="flex flex-col items-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="flex justify-center gap-3">
              <Button
                variant="ghost"
                onClick={() => switchPlatform('tiktok')}
                className={`rounded-2xl px-5 h-12 text-sm font-semibold transition-all ${
                  platform === 'tiktok'
                    ? "glass-card text-foreground border-2 border-primary/50" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-2">🎵</span>
                TikTok
              </Button>
              <Button
                variant="ghost"
                onClick={() => switchPlatform('youtube')}
                className={`rounded-2xl px-5 h-12 text-sm font-semibold transition-all ${
                  platform === 'youtube'
                    ? "glass-card text-foreground border-2 border-red-500/50" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Youtube className="h-4 w-4 mr-2 text-red-500" />
                YouTube
              </Button>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-3">
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
          </div>
        )}

        {!showResults ? (
          isBatchMode ? (
            // Batch Mode Input
            <div 
              className="max-w-2xl mx-auto glass-card rounded-3xl p-5 md:p-6 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="mb-4">
                <Textarea
                  placeholder={platformConfig[platform].batchPlaceholder}
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
            <div 
              className="max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Mobile: Stacked */}
              <div className="flex flex-col gap-3 md:hidden">
                <div className="glass-card rounded-2xl p-4 flex items-center gap-3 border border-border/30">
                  <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <Input
                    type="url"
                    placeholder={platformConfig[platform].placeholder}
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
                    disabled={isLoading}
                    className="flex-1 rounded-2xl h-14 btn-glow text-primary-foreground border-0 text-base font-bold"
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

              {/* Desktop: Inline */}
              <div className="hidden md:flex glass-card rounded-full p-2 items-center gap-2 border border-border/30">
                <div className="flex-1 flex items-center gap-3 pl-5">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder={`Paste a ${platformConfig[platform].name} link here...`}
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
                  disabled={isLoading}
                  className="rounded-full h-12 btn-glow text-primary-foreground px-8 border-0 font-bold text-base"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
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
          <BatchResults results={batchResults} onReset={handleReset} autoDownload={true} />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
