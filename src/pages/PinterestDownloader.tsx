import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import { Link } from "react-router-dom";
import {
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  pinterestKeywords,
  allPinterestKeywords,
  banglaKeywords
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
  },
  // New FAQ entries for expanded keywords
  {
    question: "Can I download an entire Pinterest board at once?",
    answer: "Anytt cc supports bulk downloading of Pinterest videos from a board. Use our batch mode to paste multiple pin URLs and download them all at once — works as a Pinterest board bulk downloader!"
  },
  {
    question: "Does Anytt cc support Pinterest carousel downloads?",
    answer: "Yes! Anytt cc can download Pinterest carousel content. Simply paste the carousel pin URL and download the video content. Pinterest carousel downloader no watermark — fast and free!"
  },
  {
    question: "Can I download Pinterest GIFs and images?",
    answer: "Anytt cc focuses on Pinterest video content. For GIF-style animated pins, they are downloaded as short video clips. Pinterest gif downloader for mobile — works perfectly!"
  },
  {
    question: "Can I use downloaded Pinterest images for Figma or Shopify?",
    answer: "Yes! Download Pinterest images and videos with Anytt cc, then use them in Figma for mood boards or on Shopify for product inspiration. Pinterest image downloader for Figma and Shopify!"
  },
  {
    question: "How do I bulk download Pinterest pins with titles?",
    answer: "Use Anytt cc's batch download feature. Paste multiple Pinterest URLs (one per line) and download them all. Save Pinterest board to zip file — bulk download Pinterest pins with ease!"
  }
];

const PinterestDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Pinterest Video Downloader - Free HD | AnyTT"
        description="Anytt cc - Free Pinterest video downloader. Download Pinterest videos & Idea Pins in HD quality. No registration, no app needed. Works on iPhone, Android & PC!"
        canonicalUrl={`${BASE_URL}/pinterest-downloader`}
        keywords={`${allPinterestKeywords}, ${banglaKeywords.pinterest.join(", ")}`}
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

        {/* What is Anytt cc Pinterest Downloader - Descriptive Content */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              What is <span className="gradient-text">Anytt cc</span> Pinterest Downloader?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Anytt cc Pinterest Downloader is a free online tool that lets you download Pinterest videos and Idea Pins in HD quality. Whether you want to save recipe videos, DIY tutorials, or creative Idea Pins from Pinterest, Anytt cc makes it simple — just paste the pin URL and click download.
              </p>
              <p>
                Our Pinterest video downloader works on all devices including iPhone, Android, Windows, and Mac. No app installation needed — everything happens right in your browser. Anytt cc downloads Pinterest videos in the highest available quality, up to 1080p HD, so you never lose detail. It's 100% free with no registration, no limits, and no hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* Pinterest Keyword Cloud Section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Your Complete Pinterest Solution
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Board Downloader */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📋 Board Downloader
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.board.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pin Saver */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📌 Pin Saver
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.bulk.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Carousel Download */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎠 Carousel Download
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.carousel.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image & GIF */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🖼️ Image & GIF
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.imageAndGif.slice(0, 5).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bulk Download */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📦 Bulk Download
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.bulk.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* HD Quality */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎯 HD Quality
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pinterestKeywords.quality.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
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
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">📹 HD Video Quality</h3>
                <p className="text-sm text-muted-foreground">Download Pinterest videos in the highest available quality - up to 1080p HD.</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">💡 Idea Pins Support</h3>
                <p className="text-sm text-muted-foreground">Download Pinterest Idea Pins and Story Pins with video content.</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">🌐 No App Needed</h3>
                <p className="text-sm text-muted-foreground">Works directly in your browser - no app installation required.</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">📱 All Devices</h3>
                <p className="text-sm text-muted-foreground">Works on iPhone, Android, Windows, Mac, and any device with a browser.</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">⚡ Fast Downloads</h3>
                <p className="text-sm text-muted-foreground">Lightning-fast video processing and download speeds.</p>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">💰 100% Free</h3>
                <p className="text-sm text-muted-foreground">Completely free with no hidden charges or subscriptions.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Popular Pinterest Downloads - SEO Keywords Section */}
        <section className="py-10 px-4 bg-muted/10 border-t border-border/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular Pinterest Downloads</h3>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 leading-relaxed">
              {/* Short golden Pinterest keywords */}
              <span>Pinterest video</span><span>•</span>
              <span>Pin saver</span><span>•</span>
              <span>Board downloader</span><span>•</span>
              <span>Pinterest carousel</span><span>•</span>
              <span>Pinterest GIF</span><span>•</span>
              <span>Pinterest boards</span><span>•</span>
              <span>Pinterest image</span><span>•</span>
              <span>Pin downloader</span><span>•</span>
              <span>Pinterest stories</span><span>•</span>
              <span>Bulk downloader</span><span>•</span>
              <span>Pinterest tool</span><span>•</span>
              <span>Pinterest scraper</span><span>•</span>
              <span>Pinterest search</span><span>•</span>
              <span>Save Pinterest</span><span>•</span>
              <span>Pinterest aesthetic</span><span>•</span>
              <span>Pinterest links</span><span>•</span>
              <span>Pinterest offline</span><span>•</span>
              <span>Pinterest mobile</span><span>•</span>
              <span>Pinterest extension</span><span>•</span>
              <span>Pinterest metadata</span><span>•</span>
              <span>Pinterest engagement</span><span>•</span>
              <span>Pinterest trends</span><span>•</span>
              <span>Pinterest algorithm</span><span>•</span>
              <span>Pinterest SEO</span><span>•</span>
              <span>Idea Pin</span><span>•</span>
              <span>Pins download</span><span>•</span>
              <span>Board saver</span><span>•</span>
              <span>Pinterest HD</span><span>•</span>
              <span>Pinterest online</span><span>•</span>
              <span>Pinterest free</span><span>•</span>
              <span>Pinterest photo</span><span>•</span>
              {/* Long-tail Pinterest keywords */}
              <span>Pinterest board bulk downloader zip</span><span>•</span>
              <span>Save entire Pinterest board to gallery</span><span>•</span>
              <span>Download Pinterest carousel images online</span><span>•</span>
              <span>Pinterest image saver for mood boards</span><span>•</span>
              <span>Bulk download Pinterest pins with titles</span><span>•</span>
              <span>Pinterest video downloader for iPhone 2026</span><span>•</span>
              <span>Download Pinterest board for offline use</span><span>•</span>
              <span>Pinterest carousel downloader no watermark</span><span>•</span>
              <span>Save Pinterest board to Figma directly</span><span>•</span>
              <span>Pinterest board downloader pro free</span><span>•</span>
              <span>Save Pinterest board to zip file</span><span>•</span>
              <span>Pinterest image downloader for Figma</span><span>•</span>
              <span>Bulk download Pinterest pins extension</span><span>•</span>
              <span>Pinterest video downloader high resolution</span><span>•</span>
              <span>Save Pinterest board for client presentation</span><span>•</span>
              <span>Pinterest image scraper for mood board</span><span>•</span>
              <span>Download Pinterest board for Mac</span><span>•</span>
              <span>Pinterest gif downloader for mobile</span><span>•</span>
              <span>Save Pinterest board to PDF</span><span>•</span>
              <span>Pinterest board downloader with metadata</span><span>•</span>
              <span>Download Pinterest pins without logging in</span><span>•</span>
              <span>Pinterest image downloader for Shopify</span><span>•</span>
              <span>Bulk Pinterest video downloader online</span><span>•</span>
              <span>Save Pinterest ideas for offline travel</span><span>•</span>
              <span>Pinterest board downloader for researchers</span><span>•</span>
              <span>High speed Pinterest image saver</span><span>•</span>
              <span>Pinterest board to Canva export</span><span>•</span>
              <span>Pinterest video downloader no ads</span><span>•</span>
              <span>Save Pinterest pins for Procreate</span><span>•</span>
              <span>Download Pinterest board for interior design</span><span>•</span>
              <span>Save Pinterest landscape photos for desktop</span><span>•</span>
              <span>Where to find best Pinterest board downloader</span><span>•</span>
              <span>Is there a free Pinterest carousel downloader</span><span>•</span>
              <span>Fastest way to save Pinterest carousels</span><span>•</span>
              {/* Bangla Pinterest keywords */}
              <span>পিন্টারেস্ট ভিডিও</span><span>•</span>
              <span>পিন্টারেস্ট সেভার</span><span>•</span>
              <span>বোর্ড ডাউনলোড</span><span>•</span>
              <span>পিন্টারেস্ট ফটো</span><span>•</span>
              {/* Bangla transliterated Pinterest */}
              <span>Pinterest theke video download korar niyom</span><span>•</span>
              <span>Pinterest board ekbare download bangla</span><span>•</span>
              <span>Pinterest theke sob photo ekbare download</span><span>•</span>
              <span>Pinterest image download korar link</span><span>•</span>
              <span>Pinterest video download bangla tutorial</span><span>•</span>
              <span>mobile-e Pinterest video save kivabe korbo</span><span>•</span>
              <span>Pinterest image download korar apps bangla</span><span>•</span>
              <span>Pinterest video download link copy paste</span><span>•</span>
              <span>Pinterest board save korar best software</span>
            </div>
          </div>
        </section>

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