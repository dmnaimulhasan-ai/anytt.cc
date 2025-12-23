import { useState } from "react";
import { Search, Clipboard, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VideoResult from "./VideoResult";

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

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
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
    setVideoData(null);
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

    try {
      const { data, error } = await supabase.functions.invoke('tiktok-download', {
        body: { url: url.trim() }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast({
          title: "Error",
          description: "Failed to process video. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!data.success) {
        toast({
          title: "Error",
          description: data.error || "Could not fetch video data.",
          variant: "destructive",
        });
        return;
      }

      setVideoData(data.data);
      toast({
        title: "Video Found!",
        description: "Your video is ready to download.",
      });
    } catch (error) {
      console.error('Error fetching video:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setVideoData(null);
  };

  return (
    <section className="hero-gradient py-16 pb-24 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
          TikTok Downloader
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Download and Save TikTok Videos Without Watermark.
        </p>

        {!videoData ? (
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
        ) : (
          <VideoResult video={videoData} onReset={handleReset} />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
