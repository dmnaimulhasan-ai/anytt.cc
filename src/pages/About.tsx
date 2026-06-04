import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Zap, Shield, Smartphone, Download, Clock, Globe } from "lucide-react";
import { seoConfig, BASE_URL, getOrganizationSchema, getWebApplicationSchema, getFAQSchema } from "@/lib/seo-config";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download TikTok videos in seconds with our optimized servers"
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
    description: "Download TikTok videos in the highest available quality"
  },
  {
    icon: Clock,
    title: "No Limits",
    description: "Download unlimited TikTok videos for free, forever"
  },
  {
    icon: Globe,
    title: "No Watermark",
    description: "Save TikTok videos without the TikTok logo watermark"
  }
];

const aboutFaqs = [
  {
    question: "What is AnyTT?",
    answer: "AnyTT is a free online TikTok video downloader that lets you save TikTok videos without watermark in HD quality. No registration required, works on all devices."
  },
  {
    question: "Is AnyTT safe to use?",
    answer: "Yes, AnyTT is 100% safe. We don't require any personal information, don't store your data, and don't install anything on your device."
  },
  {
    question: "How does AnyTT work?",
    answer: "Simply copy a TikTok video URL, paste it into AnyTT, and click download. The video is processed instantly and saved to your device without watermark."
  },
  {
    question: "Is AnyTT really free?",
    answer: "Yes, AnyTT is completely free with no hidden fees, subscriptions, or download limits. Download as many TikTok videos as you want."
  },
  {
    question: "Can I download TikTok audio only?",
    answer: "Yes, AnyTT allows you to extract and download just the audio/music from TikTok videos as MP3 files."
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
          getWebApplicationSchema(),
          getFAQSchema(aboutFaqs)
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
                AnyTT is your go-to free TikTok video downloader. 
                Download TikTok videos without watermark in HD quality - no registration, no limits, just vibes ✨
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

        {/* Supported Platform */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12">
              Download <span className="gradient-text">TikTok Videos</span>
            </h2>
            <div className="flex justify-center">
              <Link 
                to="/tiktok-downloader"
                className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform border-2 border-transparent hover:border-primary/50 max-w-sm"
              >
                <span className="text-5xl mb-4 block">🎵</span>
                <h3 className="text-2xl font-bold font-display mb-2">TikTok Downloader</h3>
                <p className="text-muted-foreground">Download TikTok videos without watermark in HD quality</p>
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
                  <h3 className="text-xl font-bold font-display mb-1">Copy the TikTok URL</h3>
                  <p className="text-muted-foreground">Open TikTok and copy the video link using the share button</p>
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
                  <p className="text-muted-foreground">Your TikTok video downloads instantly without watermark in HD quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for Rich Snippets */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-4">
              {aboutFaqs.map((faq, index) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default About;
