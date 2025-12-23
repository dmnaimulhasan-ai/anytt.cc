import { useState } from "react";
import { Search, Clipboard, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Video Found!",
        description: "Your video is ready to download.",
      });
    }, 2000);
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
      </div>
    </section>
  );
};

export default HeroSection;
