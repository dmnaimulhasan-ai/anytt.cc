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
  getOrganizationSchema 
} from "@/lib/seo-config";

const homeFaqs = [
  {
    question: "How do I download videos without watermark?",
    answer: "Simply paste the video URL from TikTok or Facebook into Anytt.cc and click download. Your video will be saved without watermark in HD quality."
  },
  {
    question: "Is Anytt.cc free to use?",
    answer: "Yes, Anytt.cc is 100% free with no hidden fees, subscriptions, or limits on downloads."
  },
  {
    question: "What platforms does Anytt.cc support?",
    answer: "Anytt.cc supports downloading videos from TikTok and Facebook including Reels, Stories, and regular videos."
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
          getWebApplicationSchema(),
          getOrganizationSchema(),
          getFAQSchema(homeFaqs)
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
      </main>
      <Footer />
      
      {/* Mobile Social Bar */}
      <SocialBar />
    </div>
  );
};

export default Index;
