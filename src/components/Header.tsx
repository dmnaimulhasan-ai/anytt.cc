import { Zap, Sparkles, Menu, X, Youtube, Facebook, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", icon: <Sparkles className="h-4 w-4" /> },
    { path: "/tiktok-downloader", label: "TikTok", icon: <span>🎵</span> },
    { path: "/youtube-downloader", label: "YouTube", icon: <Youtube className="h-4 w-4 text-red-500" /> },
    { path: "/facebook-downloader", label: "Facebook", icon: <Facebook className="h-4 w-4 text-blue-500" /> },
    { path: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <header className="py-4 px-4 md:px-6 relative z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-50" />
            <div className="relative bg-gradient-to-r from-primary to-accent rounded-2xl p-2.5">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black font-display tracking-tight">
              <span className="gradient-text">AnyTT</span>
            </span>
            <span className="text-[10px] text-muted-foreground -mt-1 tracking-widest uppercase">Downloader</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-11 w-11 rounded-2xl glass-card border border-border/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all ${
                isActive(link.path)
                  ? "text-foreground glass-card border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-b border-border/30 py-4 px-4 animate-slide-up">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium flex items-center gap-3 p-4 rounded-2xl transition-colors ${
                  isActive(link.path)
                    ? "text-foreground glass-card border border-primary/30"
                    : "text-muted-foreground hover:bg-muted/50 active:bg-muted"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
