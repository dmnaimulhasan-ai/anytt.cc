import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import {
  seoConfig, 
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  tiktokKeywords
} from "@/lib/seo-config";

const tiktokFaqs = [
  {
    question: "How do I download TikTok videos without watermark using Anytt cc?",
    answer: "Simply paste the TikTok video URL into Anytt cc and click download. Your video will be saved without the TikTok watermark in HD quality. Anytt cc makes it easy!"
  },
  {
    question: "Is the Anytt cc TikTok downloader free?",
    answer: "Yes, Anytt cc TikTok video downloader is 100% free with no hidden fees, subscriptions, or limits on downloads. Use anytt cc unlimited times!"
  },
  {
    question: "Does Anytt cc work on iPhone and Android?",
    answer: "Yes, Anytt cc TikTok downloader works on all devices including iPhone, Android phones, tablets, and desktop computers. Access anytt.cc from any browser!"
  },
  {
    question: "Can I download TikTok audio/music only with Anytt cc?",
    answer: "Yes, you can download just the audio/music from TikTok videos as MP3 files using Anytt cc downloader."
  },
  {
    question: "Is Anytt cc safe to use?",
    answer: "Absolutely! Anytt cc doesn't require any registration or personal information. We don't store any of your data. Anytt cc is 100% safe and secure."
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
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "TikTok Downloader", url: `${BASE_URL}/tiktok-downloader` }
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
              <span className="gradient-text">Anytt cc</span> TikTok Downloader FAQ
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

        {/* Keywords Section - SEO Rich Content */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Your Complete TikTok Solution
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Primary Features */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🔥 TikTok Downloader
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.primary.slice(0, 5).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* No Watermark */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  💰 No Watermark
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.highIntent.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audio/MP3 */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎵 TikTok MP3 Download
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.audio.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Device Support */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🌍 Works Everywhere
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.device.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🚀 Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.feature.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Long-tail */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎯 HD Quality
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.longTail.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad */}
        <BannerAd />

        {/* Internal Links - SEO optimized with proper anchors */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">Explore More</h2>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
              <Link 
                to="/blog" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
                title="Read our video download guides"
              >
                <span className="font-semibold">📚 Guides & Tutorials</span>
              </Link>
              <Link 
                to="/faq" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors"
                title="Frequently asked questions about TikTok downloading"
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

export default TikTokDownloader;
