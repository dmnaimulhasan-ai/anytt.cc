import { Zap, ExternalLink, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import StatsBar from "./StatsBar";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-6 border-t border-border/20">
      <div className="container mx-auto">

        {/* Stats Section */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Promotional CTA Banner */}
        <div className="mb-8 p-4 md:p-6 glass-card rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Gift className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold font-display text-lg">🎁 Exclusive Offers & Deals!</h3>
                <p className="text-sm text-muted-foreground">Discover amazing deals and premium content</p>
              </div>
            </div>
            <a 
              href="https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                Claim Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Downloaders */}
          <div>
            <h3 className="font-bold font-display mb-4 text-foreground">Downloaders</h3>
            <nav className="space-y-2" aria-label="Downloader links">
              <Link to="/tiktok-downloader" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                TikTok Downloader
              </Link>
              <Link to="/youtube-downloader" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                YouTube Downloader
              </Link>
              <Link to="/facebook-downloader" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Facebook Downloader
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold font-display mb-4 text-foreground">Resources</h3>
            <nav className="space-y-2" aria-label="Resource links">
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog & Tutorials
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold font-display mb-4 text-foreground">Legal</h3>
            <nav className="space-y-2" aria-label="Legal links">
              <a href="https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold font-display mb-4 text-foreground">Support</h3>
            <nav className="space-y-2" aria-label="Support links">
              <a 
                href="https://t.me/GEN_ZDownloader" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Telegram Support
                <ExternalLink className="h-3 w-3" />
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between pt-6 border-t border-border/20">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-50" />
              <div className="relative bg-gradient-to-r from-primary to-accent rounded-xl p-2">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-black font-display">
              <span className="gradient-text">AnyTT</span>
            </span>
          </Link>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} AnyTT. Free video downloader for TikTok, YouTube & Facebook.
          </p>
          
          <p className="text-sm text-muted-foreground">
            made by <span className="font-semibold text-foreground">NAIMUL</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
