import { useState } from "react";
import { Search, Clipboard, Loader2, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

/**
 * Hero Section - Mobile-First Clean Design
 * Auto-detects platform (TikTok/YouTube) and redirects to correct downloader page
 */
const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Platform detection patterns
  const platformPatterns = {
    tiktok: /(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i,
    youtube: /(?:youtube\.com|youtu\.be|youtube-nocookie\.com)/i,
  };

  // Detect platform from URL
  const detectPlatform = (inputUrl: string): 'tiktok' | 'youtube' | null => {
    if (platformPatterns.tiktok.test(inputUrl)) return 'tiktok';
    if (platformPatterns.youtube.test(inputUrl)) return 'youtube';
    return null;
  };

  // Validate URL format
  const isValidUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl.trim());
      return true;
    } catch {
      // Check if it's a short link missing protocol
      if (inputUrl.includes('.') && !inputUrl.includes(' ')) {
        try {
          new URL('https://' + inputUrl.trim());
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      
      // Auto-submit after paste if valid URL
      const platform = detectPlatform(text);
      if (platform && isValidUrl(text)) {
        toast({
          title: "Pasted!",
          description: `Detected ${platform === 'tiktok' ? 'TikTok' : 'YouTube'} link`,
        });
        // Small delay to show toast, then redirect
        setTimeout(() => handleSearch(text), 300);
      } else {
        toast({
          title: "Pasted!",
          description: "Link ready to download",
        });
      }
    } catch {
      toast({
        title: "Couldn't paste",
        description: "Please paste manually",
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (inputUrl?: string) => {
    const urlToProcess = (inputUrl || url).trim();
    
    // Validate empty input
    if (!urlToProcess) {
      toast({
        title: "Enter a link",
        description: "Paste a TikTok or YouTube video link",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    if (!isValidUrl(urlToProcess)) {
      toast({
        title: "Invalid link",
        description: "Please enter a valid video URL",
        variant: "destructive",
      });
      return;
    }

    // Detect platform
    const platform = detectPlatform(urlToProcess);

    if (!platform) {
      toast({
        title: "Unsupported platform",
        description: "We only support TikTok and YouTube videos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Redirect to platform-specific page with URL as query param
    const encodedUrl = encodeURIComponent(urlToProcess);
    const targetPath = platform === 'tiktok' 
      ? `/tiktok-downloader?url=${encodedUrl}`
      : `/youtube-downloader?url=${encodedUrl}`;

    navigate(targetPath);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
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
            <span className="gradient-text">Anytt cc</span>
            <br />
            TikTok Downloader
          </h1>

          {/* Subheading - Clear and readable */}
          <p className="text-subhero text-muted-foreground max-w-md mx-auto leading-relaxed">
            Anytt cc - Download TikTok videos without watermark in HD. 100% free, no registration, unlimited downloads.
          </p>

          {/* Search Box */}
          <div className="space-y-4 pt-6">
            {/* URL Input - Large and easy to use */}
            <div className="relative">
              <input
                type="url"
                placeholder="Paste TikTok video link..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input-large pr-14"
                disabled={isLoading}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <button
                onClick={handlePaste}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/10"
                aria-label="Paste from clipboard"
                type="button"
              >
                <Clipboard className="h-5 w-5" />
              </button>
            </div>

            {/* Download Button - Full Width, Very Large */}
            <Button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="btn-large btn-primary"
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search & Download
                </>
              )}
            </Button>

            {/* Supported Platform */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-2">
                <span className="text-lg">🎵</span>
                TikTok Videos
              </span>
            </div>

            {/* Quick Info */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
