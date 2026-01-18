import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import { Youtube } from "lucide-react";
import { 
  seoConfig, 
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema 
} from "@/lib/seo-config";

const tiktokFaqs = [
  {
    question: "How do I download TikTok videos without watermark?",
    answer: "Simply paste the TikTok video URL into AnyTT and click download. Your video will be saved without the TikTok watermark in HD quality."
  },
  {
    question: "Is the TikTok downloader free?",
    answer: "Yes, AnyTT TikTok downloader is 100% free with no hidden fees, subscriptions, or limits on downloads."
  },
  {
    question: "Does it work on iPhone and Android?",
    answer: "Yes, our TikTok downloader works on all devices including iPhone, Android phones, tablets, and desktop computers."
  },
  {
    question: "Can I download TikTok audio/music only?",
    answer: "Yes, you can download just the audio/music from TikTok videos as MP3 files using our downloader."
  },
  {
    question: "Is it safe to download TikTok videos?",
    answer: "Absolutely! AnyTT doesn't require any registration or personal information. We don't store any of your data."
  }
];

const TikTokDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.tiktok.title}
        description={seoConfig.tiktok.description}
        canonicalUrl={`${BASE_URL}/tiktok-downloader`}
        keywords={seoConfig.tiktok.keywords}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getFAQSchema(tiktokFaqs)
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          <div className="floating-blob blob-3" />
          
          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "TikTok Downloader" }]} />
            
            <PlatformDownloader
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Paste TikTok link..."
              batchPlaceholder="Paste TikTok URLs here 💕&#10;One per line, up to 100 videos!"
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
              <span className="gradient-text">TikTok Downloader</span> FAQ
            </h2>
            <div className="space-y-4">
              {tiktokFaqs.map((faq, index) => (
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
                to="/youtube-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-red-500/30 hover:border-red-500/60 transition-colors"
              >
                <Youtube className="h-5 w-5 text-red-500" />
                <span className="font-semibold">YouTube Downloader</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TikTokDownloader;
