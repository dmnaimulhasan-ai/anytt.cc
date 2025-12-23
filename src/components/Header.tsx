import { Zap, Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-3 md:py-4 px-4 md:px-6 relative z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-2 shadow-glow-pink">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">
            <span className="gradient-text">GEN-Z</span>
          </span>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 rounded-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Home
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Facebook
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Contact
          </a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-border/30 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-foreground font-medium flex items-center gap-2 p-3 rounded-xl hover:bg-muted/50 active:bg-muted">
              <Sparkles className="h-4 w-4 text-primary" />
              Home
            </a>
            <a href="#" className="text-muted-foreground font-medium flex items-center gap-2 p-3 rounded-xl hover:bg-muted/50 active:bg-muted">
              Facebook Downloader
            </a>
            <a href="#" className="text-muted-foreground font-medium flex items-center gap-2 p-3 rounded-xl hover:bg-muted/50 active:bg-muted">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
