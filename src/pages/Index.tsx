import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToSection from "@/components/HowToSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { SocialBarAd, NativeBannerAd, PopunderAd, BannerAd, AdSenseAd } from "@/components/ads";

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
        
        {/* AdSense ad between hero and about */}
        <AdSenseAd slot="1234567890" format="horizontal" />
        
        {/* Native banner between hero and about */}
        <NativeBannerAd />
        
        <AboutSection />
        
        {/* Banner ad between about and how-to */}
        <BannerAd />
        
        <HowToSection />
        
        {/* AdSense ad between how-to and FAQ */}
        <AdSenseAd slot="0987654321" format="rectangle" />
        
        {/* Native banner between how-to and FAQ */}
        <NativeBannerAd />
        
        <FAQSection />
        
        {/* AdSense ad after FAQ */}
        <AdSenseAd slot="5678901234" format="horizontal" />
        
        {/* Banner ad before footer */}
        <BannerAd />
        
        {/* Native banner before footer */}
        <NativeBannerAd />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
