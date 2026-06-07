import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PlatformDownloader from "@/components/PlatformDownloader";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { 
  BASE_URL, 
  getWebApplicationSchema, 
  getVideoObjectSchema, 
  getHowToSchema, 
  getFAQSchema,
  getBreadcrumbSchema,
  goldenKeywordsString,
  allBanglaKeywords
} from "@/lib/seo-config";

/**
 * Bengali TikTok Downloader Landing Page
 * Targets Bangladesh + West Bengal (300M+ population, near-zero competition)
 */
const TikTokDownloaderBN = () => {
  const tiktokFaqsBN = [
    {
      question: "Anytt cc দিয়ে কিভাবে TikTok ভিডিও ডাউনলোড করবো?",
      answer: "Anytt cc দিয়ে TikTok ভিডিও ডাউনলোড করা খুবই সহজ। TikTok অ্যাপ থেকে ভিডিও লিংক কপি করুন, আমাদের সার্চ বারে পেস্ট করুন এবং 'ডাউনলোড' বাটনে ক্লিক করুন। আপনার ভিডিও HD কোয়ালিটিতে লোগো ছাড়া সেভ হয়ে যাবে।"
    },
    {
      question: "Anytt cc কি সম্পূর্ণ ফ্রি?",
      answer: "হ্যাঁ! Anytt cc ১০০% ফ্রি। কোনো হিডেন চার্জ নেই, রেজিস্ট্রেশন লাগে না এবং ডাউনলোডের কোনো লিমিট নেই। যত খুশি TikTok ভিডিও ডাউনলোড করুন।"
    },
    {
      question: "TikTok থেকে MP3 অডিও ডাউনলোড করা যায়?",
      answer: "অবশ্যই! Anytt cc দিয়ে আপনি যেকোনো TikTok ভিডিও থেকে অডিও এক্সট্র্যাক্ট করতে পারবেন। শুধু লিংক পেস্ট করুন এবং MP3 অপশন সিলেক্ট করুন।"
    },
    {
      question: "Anytt cc কি iPhone এবং Android এ কাজ করে?",
      answer: "হ্যাঁ, Anytt cc সব ডিভাইসে পারফেক্টলি কাজ করে: iPhone, Android, PC এবং Mac। কোনো অ্যাপ ইনস্টল করার দরকার নেই।"
    },
    {
      question: "Anytt cc ব্যবহার করা কি নিরাপদ?",
      answer: "সম্পূর্ণ নিরাপদ। Anytt cc আপনার কোনো ডেটা সংরক্ষণ করে না। আপনার প্রাইভেসি সম্পূর্ণ সুরক্ষিত।"
    },
    {
      question: "ওয়াটারমার্ক ছাড়া TikTok ভিডিও ডাউনলোড করা যায়?",
      answer: "হ্যাঁ! Anytt cc এর সবচেয়ে বড় সুবিধা হলো এটি TikTok ভিডিও ওয়াটারমার্ক/লোগো ছাড়া ডাউনলোড করে। HD 1080p কোয়ালিটিতে ক্লিন ভিডিও পাবেন।"
    },
    {
      question: "একসাথে অনেকগুলো ভিডিও ডাউনলোড করা যায়?",
      answer: "হ্যাঁ! Anytt cc তে ব্যাচ ডাউনলোড সাপোর্ট আছে। একসাথে অনেকগুলো TikTok লিংক পেস্ট করে দ্রুত ডাউনলোড করতে পারবেন।"
    }
  ];

  const breadcrumbItems = [
    { name: "হোম", url: BASE_URL },
    { name: "টিকটক ডাউনলোড", url: `${BASE_URL}/bn/tiktok-download` }
  ];

  const allHreflang = [
    { lang: "bn", url: `${BASE_URL}/bn/tiktok-download` },
    { lang: "hi", url: `${BASE_URL}/hi/tiktok-download` },
    { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
    { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
    { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
    { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
    { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
    { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
    { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
    { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="bn">
      <SEOHead 
        title="টিকটক ডাউনলোডার - লোগো ছাড়া HD ভিডিও | Anytt cc"
        description="Anytt cc দিয়ে লোগো ছাড়া HD কোয়ালিটিতে TikTok ভিডিও ডাউনলোড করুন। iPhone, Android, PC তে ফ্রি, রেজিস্ট্রেশন ছাড়া।"
        keywords={`${goldenKeywordsString}, ${allBanglaKeywords}, টিকটক ভিডিও ডাউনলোড, টিকটক ডাউনলোডার, লোগো ছাড়া টিকটক, ওয়াটারমার্ক ছাড়া, টিকটক এমপি৩, ফ্রি ডাউনলোড, tiktok video download bangla, tiktok downloader bangladesh, download tiktok without watermark bangla`}
        canonicalUrl={`${BASE_URL}/bn/tiktok-download`}
        lang="bn"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsBN),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={allHreflang}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "হোম", href: "/" },
            { label: "টিকটক ডাউনলোড" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              টিকটক ভিডিও ডাউনলোডার
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              লোগো/ওয়াটারমার্ক ছাড়া HD কোয়ালিটিতে TikTok ভিডিও ডাউনলোড করুন। ১০০% ফ্রি, রেজিস্ট্রেশন লাগে না।
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              ফ্রি টিকটক ভিডিও ডাউনলোড • লোগো ছাড়া • এইচডি কোয়ালিটি • MP3 অডিও
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="TikTok ভিডিও লিংক এখানে পেস্ট করুন..."
              batchPlaceholder="একাধিক TikTok লিংক পেস্ট করুন (প্রতি লাইনে একটি)"
              accentColor="primary"
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              কিভাবে TikTok ভিডিও ডাউনলোড করবেন
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">১</div>
                <h3 className="font-semibold mb-2">লিংক কপি করুন</h3>
                <p className="text-sm text-muted-foreground">TikTok অ্যাপ খুলুন এবং ভিডিও লিংক কপি করুন</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">২</div>
                <h3 className="font-semibold mb-2">Anytt cc তে পেস্ট করুন</h3>
                <p className="text-sm text-muted-foreground">উপরের সার্চ বারে লিংক পেস্ট করুন</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">৩</div>
                <h3 className="font-semibold mb-2">ডাউনলোড করুন</h3>
                <p className="text-sm text-muted-foreground">ডাউনলোড বাটনে ক্লিক করুন এবং HD ভিডিও সেভ করুন</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Anytt cc - Bangla */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              <span className="gradient-text">Anytt cc</span> কি?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Anytt cc হলো বিশ্বের সেরা ফ্রি TikTok ভিডিও ডাউনলোডার। এটি দিয়ে আপনি যেকোনো TikTok ভিডিও ওয়াটারমার্ক/লোগো ছাড়া HD কোয়ালিটিতে ডাউনলোড করতে পারবেন। কোনো অ্যাপ ইনস্টল বা রেজিস্ট্রেশনের দরকার নেই। শুধু লিংক কপি-পেস্ট করুন এবং ভিডিও সেভ করুন। iPhone, Android, Windows, Mac — সব ডিভাইসে কাজ করে। ব্যাচ ডাউনলোড, MP3 অডিও এক্সট্র্যাকশন, স্লাইডশো সেভ — সবই ফ্রি!
            </p>
            <p className="text-xs text-muted-foreground/60">
              <time dateTime="2026-02-28">সর্বশেষ আপডেট: ফেব্রুয়ারি ২৮, ২০২৬</time>
            </p>
          </div>
        </section>

        {/* Keywords Section - Bangla SEO */}
        <section className="py-12 px-4 bg-muted/30 hidden md:block">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - সম্পূর্ণ টিকটক সমাধান
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 টিকটক ডাউনলোড</h3>
                <div className="flex flex-wrap gap-2">
                  {["টিকটক ভিডিও ডাউনলোড", "TikTok download", "ভিডিও সেভ", "টিকটক অনলাইন"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 লোগো ছাড়া</h3>
                <div className="flex flex-wrap gap-2">
                  {["ওয়াটারমার্ক ছাড়া", "লোগো রিমুভ", "ক্লিন ভিডিও", "no watermark"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 টিকটক MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["টিকটক এমপি৩", "গান ডাউনলোড", "অডিও সেভ", "MP3 converter"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎥 HD & 4K</h3>
                <div className="flex flex-wrap gap-2">
                  {["এইচডি ভিডিও", "1080p ডাউনলোড", "4K TikTok", "হাই কোয়ালিটি"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">📱 সব ডিভাইস</h3>
                <div className="flex flex-wrap gap-2">
                  {["iPhone", "Android", "PC", "Mac", "Samsung"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 ফিচার</h3>
                <div className="flex flex-wrap gap-2">
                  {["ব্যাচ ডাউনলোড", "দ্রুত", "ফ্রি", "নিরাপদ"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              সচরাচর জিজ্ঞাসা
            </h2>
            <div className="space-y-4">
              {tiktokFaqsBN.map((faq, index) => (
                <details key={index} className="group bg-secondary/30 rounded-xl p-4">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Language Navigation */}
        <section className="py-8 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm text-muted-foreground mb-4">অন্যান্য ভাষায়ও পাওয়া যায়:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/hi/tiktok-download" className="text-primary hover:underline">हिन्दी</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
              <Link to="/tr/tiktok-indir" className="text-primary hover:underline">Türkçe</Link>
              <Link to="/th/tiktok-download" className="text-primary hover:underline">ไทย</Link>
              <Link to="/vi/tai-tiktok" className="text-primary hover:underline">Tiếng Việt</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TikTokDownloaderBN;
