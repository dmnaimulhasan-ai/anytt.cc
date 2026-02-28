import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

/**
 * Header - SEO Optimized Navigation
 * Uses proper <Link> components for crawlability
 * Added more internal links for better site structure
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home", title: "AnyTT Home - Free Video Downloader" },
    { path: "/tiktok-downloader", label: "TikTok", title: "TikTok Video Downloader" },
    { path: "/pinterest-downloader", label: "Pinterest", title: "Pinterest Video Downloader" },
    { path: "/blog", label: "Blog", title: "Video Download Guides" },
    { path: "/faq", label: "FAQ", title: "Frequently Asked Questions" },
  ];

  return (
    <header className="py-3 md:py-4 px-4 relative z-20" role="banner">
      <div className="container mx-auto flex items-center justify-between max-w-4xl">
        {/* Logo - Proper anchor with title */}
        <Link 
          to="/" 
          className="flex items-center"
          title="AnyTT - Free TikTok Video Downloader"
        >
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="gradient-text">Anytt</span>
            <span className="text-foreground">.cc</span>
          </span>
        </Link>

        {/* Desktop Nav - Semantic navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              title={link.title}
              className={`px-4 py-2 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Language Selector - Desktop */}
          <LanguageSelector />
        </nav>

        {/* Mobile: Language + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Full navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-4 animate-slide-up shadow-lg z-50">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                title={link.title}
                onClick={() => setIsMenuOpen(false)}
                className={`p-4 rounded-xl text-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:bg-muted active:bg-muted"
                }`}
              >
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
