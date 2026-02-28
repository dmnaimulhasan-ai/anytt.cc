import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import StatsBar from "./StatsBar";

/**
 * Footer - SEO Optimized with proper internal linking
 * Uses semantic HTML and proper <a href=""> links for crawlability
 */
const Footer = forwardRef<HTMLElement>((props, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="py-8 md:py-12 px-4 border-t border-border" role="contentinfo" {...props}>
      <div className="container mx-auto max-w-3xl">
        
        {/* Stats */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Links Grid - SEO optimized with proper anchor tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 text-sm">
          {/* Downloaders */}
          <nav aria-label="Downloader tools">
            <h3 className="font-bold mb-3 text-foreground">Downloaders</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tiktok-downloader" className="block text-muted-foreground hover:text-foreground transition-colors" title="Download TikTok videos without watermark">
                  TikTok Downloader
                </Link>
              </li>
              <li>
                <Link to="/pinterest-downloader" className="block text-muted-foreground hover:text-foreground transition-colors" title="Download Pinterest videos">
                  Pinterest Downloader
                </Link>
              </li>
            </ul>
          </nav>

          {/* Languages */}
          <nav aria-label="Language versions">
            <h3 className="font-bold mb-3 text-foreground">Languages</h3>
            <ul className="space-y-2">
              <li><Link to="/es/descargar-tiktok" className="block text-muted-foreground hover:text-foreground transition-colors" title="Descargar TikTok en Español">🇪🇸 Español</Link></li>
              <li><Link to="/pt/baixar-tiktok" className="block text-muted-foreground hover:text-foreground transition-colors" title="Baixar TikTok em Português">🇧🇷 Português</Link></li>
              <li><Link to="/id/unduh-tiktok" className="block text-muted-foreground hover:text-foreground transition-colors" title="Unduh TikTok Indonesia">🇮🇩 Indonesia</Link></li>
              <li><Link to="/tr/tiktok-indir" className="block text-muted-foreground hover:text-foreground transition-colors" title="TikTok İndir Türkçe">🇹🇷 Türkçe</Link></li>
              <li><Link to="/th/tiktok-download" className="block text-muted-foreground hover:text-foreground transition-colors" title="ดาวน์โหลด TikTok ภาษาไทย">🇹🇭 ไทย</Link></li>
              <li><Link to="/vi/tai-tiktok" className="block text-muted-foreground hover:text-foreground transition-colors" title="Tải TikTok Tiếng Việt">🇻🇳 Tiếng Việt</Link></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="font-bold mb-3 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/blog" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="Video download guides and tutorials"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="Frequently asked questions"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company information">
            <h3 className="font-bold mb-3 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="About AnyTT"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a 
                  href="https://t.me/GEN_ZDownloader" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="Contact us on Telegram"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal information">
            <h3 className="font-bold mb-3 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="Terms of Service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/dmca" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  title="DMCA Policy"
                >
                  DMCA
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm">
          <Link to="/" className="text-xl font-bold" title="AnyTT - Free Video Downloader">
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
});

Footer.displayName = "Footer";

export default Footer;
