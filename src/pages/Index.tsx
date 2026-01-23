import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollBanner from "@/components/ads/ScrollBanner";
import SocialBar from "@/components/ads/SocialBar";
import { usePopunderTrigger } from "@/hooks/useAdMonetization";
import { 
  seoConfig, 
  BASE_URL, 
  getWebApplicationSchema, 
  getFAQSchema, 
  getOrganizationSchema,
  getWebSiteSchema,
  getServiceSchema,
  getBreadcrumbSchema
} from "@/lib/seo-config";

const homeFaqs = [
  {
    question: "How do I download videos without watermark?",
    answer: "Simply paste the video URL from TikTok into Anytt.cc and click download. Your video will be saved without watermark in HD quality."
  },
  {
    question: "Is Anytt.cc free to use?",
    answer: "Yes, Anytt.cc is 100% free with no hidden fees, subscriptions, or limits on downloads."
  },
  {
    question: "What platforms does Anytt.cc support?",
    answer: "Anytt.cc supports downloading videos from TikTok including Reels, Stories, and regular videos."
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, Anytt.cc works on all devices including iPhone, Android phones, tablets, and desktop computers."
  },
  {
    question: "Is it safe to use?",
    answer: "Absolutely! Anytt.cc doesn't require any registration or personal information. We don't store any of your data."
  }
];

const Index = () => {
  // Initialize popunder trigger on first user interaction
  usePopunderTrigger();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        canonicalUrl={BASE_URL}
        keywords={seoConfig.home.keywords}
        jsonLd={[
          getWebSiteSchema(),
          getWebApplicationSchema(),
          getOrganizationSchema(),
          getServiceSchema(),
          getFAQSchema(homeFaqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL }
          ])
        ]}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HowToSection />
        
        {/* Scroll-triggered Banner */}
        <ScrollBanner />
        
        <FAQSection faqs={homeFaqs} />

        {/* Internal links section for SEO */}
        <section className="py-12 px-4 bg-muted/10">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold font-display mb-6">Our Tools</h2>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Downloader tools">
              <Link 
                to="/tiktok-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
                title="Download TikTok videos without watermark"
              >
                <span className="text-xl">🎵</span>
                <span className="font-semibold">TikTok Downloader</span>
              </Link>
              <Link 
                to="/youtube-downloader" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-red-500/30 hover:border-red-500/60 transition-colors"
                title="Download YouTube videos and Shorts"
              >
                <span className="text-xl">▶️</span>
                <span className="font-semibold">YouTube Downloader</span>
              </Link>
            </nav>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Video download guides"
              >
                📚 Guides & Tutorials
              </Link>
              <Link 
                to="/faq" 
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Frequently asked questions"
              >
                ❓ FAQ
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-colors"
                title="About AnyTT"
              >
                ℹ️ About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Mobile Social Bar */}
      <SocialBar />
    </div>
  );
};

export default Index;
