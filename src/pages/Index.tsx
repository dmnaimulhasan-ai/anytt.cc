import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import { Youtube, Facebook } from "lucide-react";
import { 
  seoConfig, 
  BASE_URL, 
  getWebApplicationSchema, 
  getFAQSchema, 
  getOrganizationSchema 
} from "@/lib/seo-config";

const homeFaqs = [
  {
    question: "How do I download videos without watermark?",
    answer: "Simply paste the video URL from TikTok, YouTube, or Facebook into AnyTT and click download. Your video will be saved without watermark in HD quality."
  },
  {
    question: "Is AnyTT free to use?",
    answer: "Yes, AnyTT is 100% free with no hidden fees, subscriptions, or limits on downloads."
  },
  {
    question: "What platforms does AnyTT support?",
    answer: "AnyTT supports downloading videos from TikTok, YouTube, and Facebook including Reels, Shorts, and Stories."
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, AnyTT works on all devices including iPhone, Android phones, tablets, and desktop computers."
  },
  {
    question: "Is it safe to use?",
    answer: "Absolutely! AnyTT doesn't require any registration or personal information. We don't store any of your data."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        canonicalUrl={BASE_URL}
        keywords={seoConfig.home.keywords}
        jsonLd={[
          getWebApplicationSchema(),
          getOrganizationSchema(),
          getFAQSchema(homeFaqs)
        ]}
      />
      <Header />
      <main>
        <HeroSection />
        
        {/* Native Banner Ad */}
        <NativeBanner />
        
        <AboutSection />
        
        {/* Platform Links Section */}
        <section className="py-12 px-4 md:px-6 bg-muted/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-black font-display text-center mb-8">
              Download From <span className="gradient-text">Any Platform</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/tiktok-downloader"
                className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-primary/50"
              >
                <span className="text-4xl mb-3 block">🎵</span>
                <h3 className="text-xl font-bold font-display">TikTok Downloader</h3>
                <p className="text-sm text-muted-foreground mt-1">Download without watermark</p>
              </Link>
              
              <Link 
                to="/youtube-downloader"
                className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-red-500/50"
              >
                <Youtube className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display">YouTube Downloader</h3>
                <p className="text-sm text-muted-foreground mt-1">HD & 4K quality</p>
              </Link>
              
              <Link 
                to="/facebook-downloader"
                className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-blue-500/50"
              >
                <Facebook className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display">Facebook Downloader</h3>
                <p className="text-sm text-muted-foreground mt-1">Videos & Reels</p>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Banner Ad */}
        <BannerAd />
        
        <HowToSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
