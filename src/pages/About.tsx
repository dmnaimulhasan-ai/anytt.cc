import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import { Youtube, Facebook, Zap, Shield, Smartphone, Download, Clock, Globe, ExternalLink } from "lucide-react";
import { seoConfig, BASE_URL, getOrganizationSchema, getWebApplicationSchema } from "@/lib/seo-config";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download videos in seconds with our optimized servers"
  },
  {
    icon: Shield,
    title: "100% Safe",
    description: "No registration, no data collection, completely anonymous"
  },
  {
    icon: Smartphone,
    title: "All Devices",
    description: "Works on iPhone, Android, tablets, and desktop computers"
  },
  {
    icon: Download,
    title: "HD Quality",
    description: "Download in the highest available quality up to 4K"
  },
  {
    icon: Clock,
    title: "No Limits",
    description: "Download unlimited videos for free, forever"
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Support for TikTok, YouTube, and Facebook videos"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.about.title}
        description={seoConfig.about.description}
        canonicalUrl={`${BASE_URL}/about`}
        keywords={seoConfig.about.keywords}
        jsonLd={[
          getOrganizationSchema(),
          getWebApplicationSchema()
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          
          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "About" }]} />
            
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-black font-display mb-6">
                About <span className="gradient-text">AnyTT</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                AnyTT is your go-to free online video downloader for TikTok, YouTube, and Facebook. 
                Download videos without watermark in HD quality - no registration, no limits, just vibes ✨
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12">
              Why Choose <span className="gradient-text">AnyTT</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="glass-card rounded-2xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Native Banner Ad */}
        <NativeBanner />

        {/* Supported Platforms */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12">
              Supported <span className="gradient-text">Platforms</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/tiktok-downloader"
                className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-primary/50"
              >
                <span className="text-5xl mb-4 block">🎵</span>
                <h3 className="text-2xl font-bold font-display mb-2">TikTok</h3>
                <p className="text-muted-foreground">Download TikTok videos without watermark</p>
              </Link>
              
              <Link 
                to="/youtube-downloader"
                className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-red-500/50"
              >
                <Youtube className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-display mb-2">YouTube</h3>
                <p className="text-muted-foreground">Download YouTube videos in HD & 4K</p>
              </Link>
              
              <Link 
                to="/facebook-downloader"
                className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-blue-500/50"
              >
                <Facebook className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-display mb-2">Facebook</h3>
                <p className="text-muted-foreground">Download Facebook videos & Reels</p>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12">
              How It <span className="gradient-text">Works</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-1">Copy the Video URL</h3>
                  <p className="text-muted-foreground">Open TikTok, YouTube, or Facebook and copy the video link using the share button</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-1">Paste & Download</h3>
                  <p className="text-muted-foreground">Paste the URL into AnyTT and click the download button</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-1">Save to Device</h3>
                  <p className="text-muted-foreground">Your video downloads instantly to your device in HD quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Banner Ad */}
        <BannerAd />
        
        {/* Promotional CTA Section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 text-center">
              <h3 className="text-2xl font-bold font-display mb-3">🎁 Discover Exclusive Offers</h3>
              <p className="text-muted-foreground mb-6">Check out amazing deals and premium content curated just for you!</p>
              <a 
                href="https://evadereprimand.com/is4a58hxt?key=0c00c75ae0ce1787615332dbc4ad48dd" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Explore Offers
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
