import { Zap, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeaderBannerAd } from "@/components/ads";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 md:px-6 relative z-20">
      <HeaderBannerAd />
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-50" />
            <div className="relative bg-gradient-to-r from-primary to-accent rounded-2xl p-2.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black font-display tracking-tight">
              <span className="gradient-text">GEN-Z</span>
            </span>
            <span className="text-[10px] text-muted-foreground -mt-1 tracking-widest uppercase">Downloader</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-11 w-11 rounded-2xl glass-card border border-border/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <a href="#" className="px-4 py-2 rounded-xl text-foreground font-medium flex items-center gap-2 glass-card border border-primary/30 hover:border-primary/60 transition-colors">
            <Sparkles className="h-4 w-4 text-primary" />
            Home
          </a>
          <a href="#" className="px-4 py-2 rounded-xl text-muted-foreground font-medium hover:text-foreground hover:bg-muted/50 transition-all">
            Instagram
          </a>
          <a href="#" className="px-4 py-2 rounded-xl text-muted-foreground font-medium hover:text-foreground hover:bg-muted/50 transition-all">
            YouTube
          </a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-border/30 py-4 px-4 animate-slide-up">
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-foreground font-medium flex items-center gap-3 p-4 rounded-2xl glass-card border border-primary/30">
              <Sparkles className="h-5 w-5 text-primary" />
              Home
            </a>
            <a href="#" className="text-muted-foreground font-medium flex items-center gap-3 p-4 rounded-2xl hover:bg-muted/50 active:bg-muted transition-colors">
              📸 Instagram Downloader
            </a>
            <a href="#" className="text-muted-foreground font-medium flex items-center gap-3 p-4 rounded-2xl hover:bg-muted/50 active:bg-muted transition-colors">
              🎬 YouTube Shorts
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
