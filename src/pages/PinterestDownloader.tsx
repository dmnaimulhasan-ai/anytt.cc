import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import {
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema
} from "@/lib/seo-config";

const pinterestFaqs = [
  {
    question: "How do I download Pinterest videos using Anytt cc?",
    answer: "Simply copy the Pinterest video pin URL, paste it into Anytt cc, and click download. Your video will be saved in HD quality instantly!"
  },
  {
    question: "Is the Anytt cc Pinterest video downloader free?",
    answer: "Yes, Anytt cc Pinterest video downloader is 100% free with no hidden fees, subscriptions, or limits on downloads."
  },
  {
    question: "Does Anytt cc work with Pinterest Idea Pins?",
    answer: "Yes! Anytt cc supports Pinterest Idea Pins, video pins, and regular pins that contain video content."
  },
  {
    question: "Can I download Pinterest videos on iPhone and Android?",
    answer: "Yes, Anytt cc Pinterest downloader works on all devices including iPhone, Android phones, tablets, and desktop computers."
  },
  {
    question: "Are Pinterest videos downloaded in HD quality?",
    answer: "Yes! Anytt cc downloads Pinterest videos in the highest available quality, typically 720p or 1080p HD."
  },
  {
    question: "Do I need to install an app to download Pinterest videos?",
    answer: "No app needed! Anytt cc works directly in your browser. Just paste the link and download."
  },
  {
    question: "Is it legal to download Pinterest videos?",
    answer: "Downloading videos for personal use is generally permitted. Always respect copyright and the original creator's rights."
  },
  {
    question: "Why can't I download some Pinterest pins?",
    answer: "Some pins are images, not videos. Anytt cc only downloads video pins. Make sure the pin contains a video before trying to download."
  }
];

const PinterestDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Anytt cc Pinterest Video Downloader - Download Pinterest Videos Free HD 2026"
        description="Anytt cc - Free Pinterest video downloader. Download Pinterest videos & Idea Pins in HD quality. No registration, no app needed. Works on iPhone, Android & PC!"
        canonicalUrl={`${BASE_URL}/pinterest-downloader`}
        keywords="pinterest video downloader, download pinterest video, pinterest downloader, save pinterest video, pinterest video saver, pinterest idea pin downloader, pinterest video download hd, free pinterest downloader, pinterest image downloader, pinterest photo downloader, save pinterest images, pinterest gif downloader, pinterest board downloader, pinterest bulk downloader, pinterest reel download, pinterest story download, pinterest to mp4, how to download pinterest video on iphone, how to save pinterest video android"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("Pinterest"),
          getHowToSchema("Pinterest"),
          getFAQSchema(pinterestFaqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "Pinterest Downloader", url: `${BASE_URL}/pinterest-downloader` }
          ])
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          <div className="floating-blob blob-3" />
          
          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "Pinterest Downloader" }]} />
            
            <PlatformDownloader
              platform="pinterest"
              platformName="Pinterest"
              platformIcon="📌"
              functionName="pinterest-download"
              placeholder="Paste Pinterest video link..."
              batchPlaceholder="Paste Pinterest video URLs here 📌&#10;One per line, up to 100 videos!"
              accentColor="primary"
            />
          </div>
        </section>

        {/* Native Banner Ad */}
        <NativeBanner />

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">Anytt cc</span> Pinterest Downloader FAQ
            </h2>
            <div className="space-y-4">
              {pinterestFaqs.map((faq, index) => (
                <details key={index} className="glass-card rounded-2xl p-5 group">
                  <summary className="font-bold font-display cursor-pointer list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Pinterest Video Download Features
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* HD Quality */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📹 HD Video Quality
                </h3>
                <p className="text-sm text-muted-foreground">
                  Download Pinterest videos in the highest available quality - up to 1080p HD.
                </p>
              </div>

              {/* Idea Pins */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  💡 Idea Pins Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Download Pinterest Idea Pins and Story Pins with video content.
                </p>
              </div>

              {/* No App */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🌐 No App Needed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Works directly in your browser - no app installation required.
                </p>
              </div>

              {/* All Devices */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📱 All Devices
                </h3>
                <p className="text-sm text-muted-foreground">
                  Works on iPhone, Android, Windows, Mac, and any device with a browser.
                </p>
              </div>

              {/* Fast Download */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  ⚡ Fast Downloads
                </h3>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast video processing and download speeds.
                </p>
              </div>

              {/* Free Forever */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  💰 100% Free
                </h3>
                <p className="text-sm text-muted-foreground">
                  Completely free with no hidden charges or subscriptions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad */}
        <BannerAd />

        {/* Internal Links */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">Explore More Downloaders</h2>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
              <Link 
                to="/tiktok-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
                title="Download TikTok videos without watermark"
              >
                <span className="font-semibold">🎵 TikTok Downloader</span>
              </Link>
              <Link 
                to="/blog" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors"
                title="Read our video download guides"
              >
                <span className="font-semibold">📚 Guides & Tutorials</span>
              </Link>
              <Link 
                to="/faq" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-muted/30 hover:border-muted/60 transition-colors"
                title="Frequently asked questions"
              >
                <span className="font-semibold">❓ FAQ</span>
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PinterestDownloader;
