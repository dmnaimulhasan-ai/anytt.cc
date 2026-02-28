import { useState, useEffect } from "react";
import { Clipboard, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const StickyMobileCTA = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!isMobile || !visible) return null;

  const platformPatterns = {
    tiktok: /(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i,
    pinterest: /(?:pinterest\.(?:com|co\.uk|ca|de|fr|es|it|jp|au|nz|at|ch|ru|nl|pl|pt|se|dk|no|fi|be|ie|mx|br|ar|cl|co)|pin\.it)/i,
  };

  const detectPlatform = (u: string) => {
    if (platformPatterns.tiktok.test(u)) return "tiktok";
    if (platformPatterns.pinterest.test(u)) return "pinterest";
    return null;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      const platform = detectPlatform(text);
      if (platform) {
        setIsLoading(true);
        setTimeout(() => {
          navigate(`/${platform}-downloader?url=${encodeURIComponent(text)}`);
        }, 200);
      } else {
        toast({ title: "Pasted!", description: "Now tap Download" });
      }
    } catch {
      toast({ title: "Couldn't paste", description: "Please paste manually", variant: "destructive" });
    }
  };

  const handleSearch = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast({ title: "Enter a link", description: "Paste a video link first", variant: "destructive" });
      return;
    }
    const platform = detectPlatform(trimmed);
    if (!platform) {
      toast({ title: "Unsupported", description: "We support TikTok & Pinterest", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    navigate(`/${platform}-downloader?url=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom animate-slide-up">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex-1 relative">
          <input
            type="url"
            placeholder="Paste video link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-3 pr-10 py-2.5 text-sm rounded-xl bg-muted/60 border border-border/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
          <button
            onClick={handlePaste}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary rounded-lg"
            aria-label="Paste"
            type="button"
          >
            <Clipboard className="h-4 w-4" />
          </button>
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="shrink-0 rounded-xl h-10 px-4 btn-primary text-sm font-bold"
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4 mr-1" />
              Go
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
