import { Zap, Heart, ExternalLink } from "lucide-react";
import StatsBar from "./StatsBar";

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-6 border-t border-border/20">
      <div className="container mx-auto">
        {/* Stats Section */}
        <div className="mb-8">
          <StatsBar />
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-50" />
              <div className="relative bg-gradient-to-r from-primary to-accent rounded-xl p-2">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-black font-display">
              <span className="gradient-text">GEN-Z</span>
            </span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-muted-foreground hover:text-foreground active:text-primary transition-colors flex items-center gap-1">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground active:text-primary transition-colors">
              Terms
            </a>
            <a href="https://t.me/GEN_ZDownloader" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground active:text-primary transition-colors flex items-center gap-1">
              Support
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            made by <span className="font-semibold text-foreground">NAIMUL</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
