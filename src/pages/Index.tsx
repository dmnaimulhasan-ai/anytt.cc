import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { SocialBarAd, NativeBannerAd, PopunderAd, BannerAd } from "@/components/ads";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Social bar - floating element */}
      <SocialBarAd />
      
      {/* Popunder - loads in background on first visit */}
      <PopunderAd />
      
      <Header />
      <main>
        <HeroSection />
        
        {/* Native banner between hero and about */}
        <NativeBannerAd />
        
        <AboutSection />
        
        {/* Banner ad between about and how-to */}
        <BannerAd />
        
        <HowToSection />
        
        {/* Native banner between how-to and FAQ */}
        <NativeBannerAd />
        
        <FAQSection />
        
        {/* Banner ad before footer */}
        <BannerAd />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
