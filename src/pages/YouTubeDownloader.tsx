import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import { 
  seoConfig, 
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema 
} from "@/lib/seo-config";

const youtubeFaqs = [
  {
    question: "How do I download YouTube videos?",
    answer: "Copy the YouTube video URL, paste it into AnyTT, and click download. You can save videos in HD, Full HD, or 4K quality."
  },
  {
    question: "Is it free to download YouTube videos?",
    answer: "Yes, AnyTT YouTube downloader is completely free with no limits on downloads or video quality."
  },
  {
    question: "Can I download YouTube Shorts?",
    answer: "Yes, you can download YouTube Shorts just like regular videos. Simply paste the Shorts URL and download."
  },
  {
    question: "What video quality can I download?",
    answer: "AnyTT supports downloading YouTube videos in various qualities including 720p HD, 1080p Full HD, and 4K when available."
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, our YouTube downloader works perfectly on all devices - Android, iPhone, tablets, and desktop computers."
  }
];

const YouTubeDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.youtube.title}
        description={seoConfig.youtube.description}
        canonicalUrl={`${BASE_URL}/youtube-downloader`}
        keywords={seoConfig.youtube.keywords}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("YouTube"),
          getFAQSchema(youtubeFaqs)
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          <div className="floating-blob blob-3" />
          
          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "YouTube Downloader" }]} />
            
            <PlatformDownloader
              platform="youtube"
              platformName="YouTube"
              platformIcon="▶️"
              functionName="youtube-download"
              placeholder="Paste YouTube link..."
              batchPlaceholder="Paste YouTube URLs here 💕&#10;One per line, up to 100 videos!"
              accentColor="destructive"
            />
          </div>
        </section>

        {/* Native Banner Ad */}
        <NativeBanner />

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">YouTube Downloader</span> FAQ
            </h2>
            <div className="space-y-4">
              {youtubeFaqs.map((faq, index) => (
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

        {/* Banner Ad */}
        <BannerAd />

        {/* Internal Links */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold font-display mb-6">Try Other Downloaders</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/tiktok-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
              >
                <span className="text-xl">🎵</span>
                <span className="font-semibold">TikTok Downloader</span>
              </Link>
              <Link 
                to="/facebook-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-blue-500/30 hover:border-blue-500/60 transition-colors"
              >
                <Facebook className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Facebook Downloader</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default YouTubeDownloader;
