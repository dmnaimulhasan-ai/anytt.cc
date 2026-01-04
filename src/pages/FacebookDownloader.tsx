import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import { Link } from "react-router-dom";
import { Youtube } from "lucide-react";
import { 
  seoConfig, 
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema 
} from "@/lib/seo-config";

const facebookFaqs = [
  {
    question: "How do I download Facebook videos?",
    answer: "Copy the Facebook video URL from the share button, paste it into AnyTT, and click download. Your video will be saved in HD quality."
  },
  {
    question: "Can I download Facebook Reels?",
    answer: "Yes, AnyTT supports downloading Facebook Reels, Stories, and regular videos in high quality."
  },
  {
    question: "Do I need to login to download Facebook videos?",
    answer: "No, you don't need to login to Facebook or create any account. Just paste the video URL and download."
  },
  {
    question: "What quality can I download Facebook videos in?",
    answer: "AnyTT downloads Facebook videos in the highest available quality, typically HD or Full HD."
  },
  {
    question: "Is it free to use the Facebook downloader?",
    answer: "Yes, our Facebook video downloader is 100% free with no limits or hidden charges."
  }
];

const FacebookDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.facebook.title}
        description={seoConfig.facebook.description}
        canonicalUrl={`${BASE_URL}/facebook-downloader`}
        keywords={seoConfig.facebook.keywords}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("Facebook"),
          getFAQSchema(facebookFaqs)
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          <div className="floating-blob blob-3" />
          
          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "Facebook Downloader" }]} />
            
            <PlatformDownloader
              platform="facebook"
              platformName="Facebook"
              platformIcon="📘"
              functionName="facebook-download"
              placeholder="Paste Facebook video link..."
              batchPlaceholder="Paste Facebook video URLs here 💕&#10;One per line, up to 100 videos!"
              accentColor="blue"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">Facebook Downloader</span> FAQ
            </h2>
            <div className="space-y-4">
              {facebookFaqs.map((faq, index) => (
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

export default FacebookDownloader;
