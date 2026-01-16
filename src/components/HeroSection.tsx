import { useState } from "react";
import { Search, Clipboard, Loader2, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import VideoResult from "./VideoResult";
import SmartlinkButton from "./ads/SmartlinkButton";
import NativeBanner from "./ads/NativeBanner";

type Platform = 'tiktok' | 'facebook';

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

const platformConfig = {
  tiktok: {
    name: 'TikTok',
    placeholder: 'Paste TikTok video link here...',
    functionName: 'tiktok-download',
    regex: /tiktok\.com/i,
  },
  facebook: {
    name: 'Facebook',
    placeholder: 'Paste Facebook video link here...',
    functionName: 'facebook-download',
    regex: /facebook\.com|fb\.watch/i,
  }
};

/**
 * Hero Section - Mobile-First Clean Design
 * Inspired by savett.cc: Large text, simple layout, one clear action
 */
const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { toast } = useToast();

  // Auto-detect platform from URL
  const detectPlatform = (inputUrl: string): Platform => {
    if (platformConfig.facebook.regex.test(inputUrl)) return 'facebook';
    return 'tiktok';
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast({
        title: "Pasted!",
        description: "Link ready to download",
      });
    } catch {
      toast({
        title: "Couldn't paste",
        description: "Please paste manually",
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
        title: "Enter a link",
        description: "Paste a TikTok or Facebook video link",
        variant: "destructive",
      });
      return;
    }

    const platform = detectPlatform(url);
    const config = platformConfig[platform];

    setIsLoading(true);
    setVideoData(null);

    try {
      const { data, error } = await supabase.functions.invoke(config.functionName, {
        body: { url: url.trim() }
      });

      if (error) {
        throw new Error('Failed to process video');
      }

      if (!data.success) {
        throw new Error(data.error || 'Could not fetch video');
      }

      setVideoData(data.data);
      toast({
        title: "Success!",
        description: "Video ready to download",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: error instanceof Error ? error.message : "Could not fetch video",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="hero-gradient min-h-[85vh] flex flex-col justify-center px-4 py-16">
      <div className="container mx-auto max-w-xl">
        
        {/* Main Content */}
        <div className="text-center space-y-8 animate-fade-in">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 tag-pill">
            <Download className="h-4 w-4" />
            <span>Free • No Watermark • HD Quality</span>
          </div>

          {/* Headline - VERY LARGE for mobile */}
          <h1 className="text-hero text-foreground">
            TikTok & Facebook
            <br />
            <span className="gradient-text">Video Downloader</span>
          </h1>

          {/* Subheading - Clear and readable */}
          <p className="text-subhero text-muted-foreground max-w-md mx-auto leading-relaxed">
            Download videos without watermark in HD quality. 100% free, no registration, unlimited downloads.
          </p>

          {/* Search Box */}
          {!videoData ? (
            <div className="space-y-4 pt-6">
              {/* URL Input - Large and easy to use */}
              <div className="relative">
                <input
                  type="url"
                  placeholder="Paste video link here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="input-large pr-14"
                  disabled={isLoading}
                />
                <button
                  onClick={handlePaste}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/10"
                  aria-label="Paste from clipboard"
                >
                  <Clipboard className="h-5 w-5" />
                </button>
              </div>

              {/* Download Button - Full Width, Very Large */}
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="btn-large btn-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search & Download
                  </>
                )}
              </Button>

              {/* Quick Info */}
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4">
                <span className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-primary" />
                  Audio too
                </span>
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  HD Quality
                </span>
              </div>
            </div>
          ) : (
            /* Video Result */
            <div className="space-y-8 pt-6 animate-bounce-in">
              <VideoResult 
                video={videoData} 
                onReset={handleClear} 
                platform={detectPlatform(url)} 
              />
              
              {/* Smartlink Button - Separate from download */}
              <SmartlinkButton />
              
              {/* Native Banner */}
              <NativeBanner />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
