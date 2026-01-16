import { Link } from "react-router-dom";
import StatsBar from "./StatsBar";

/**
 * Footer - Clean and minimal
 * Mobile-first design
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-3xl">
        
        {/* Stats */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-sm">
          <div>
            <h3 className="font-bold mb-3 text-foreground">Downloaders</h3>
            <nav className="space-y-2">
              <Link to="/tiktok-downloader" className="block text-muted-foreground hover:text-foreground transition-colors">
                TikTok
              </Link>
              <Link to="/facebook-downloader" className="block text-muted-foreground hover:text-foreground transition-colors">
                Facebook
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-foreground">Company</h3>
            <nav className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-foreground">Support</h3>
            <nav className="space-y-2">
              <a 
                href="https://t.me/GEN_ZDownloader" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Telegram
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm">
          <Link to="/" className="text-xl font-bold">
            <span className="gradient-text">Anytt</span>
            <span className="text-foreground">.cc</span>
          </Link>
          
          <p className="text-muted-foreground text-center">
            © {currentYear} Anytt.cc — Free video downloader
          </p>
          
          <p className="text-muted-foreground">
            by <span className="font-semibold text-foreground">NAIMUL</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
