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
  goldenKeywordsString
} from "@/lib/seo-config";

/**
 * Hindi TikTok Downloader Landing Page
 * Targets India's largest language market (600M+ Hindi speakers)
 */
const TikTokDownloaderHI = () => {
  const tiktokFaqsHI = [
    {
      question: "Anytt cc से TikTok वीडियो कैसे डाउनलोड करें?",
      answer: "Anytt cc से TikTok वीडियो डाउनलोड करना बहुत आसान है। TikTok ऐप से वीडियो लिंक कॉपी करें, हमारे सर्च बार में पेस्ट करें और 'डाउनलोड' बटन पर क्लिक करें। आपका वीडियो HD क्वालिटी में बिना वॉटरमार्क के सेव हो जाएगा।"
    },
    {
      question: "क्या Anytt cc पूरी तरह फ्री है?",
      answer: "हाँ! Anytt cc 100% फ्री है। कोई छुपा हुआ चार्ज नहीं, रजिस्ट्रेशन की जरूरत नहीं और डाउनलोड की कोई लिमिट नहीं।"
    },
    {
      question: "क्या TikTok से MP3 ऑडियो डाउनलोड हो सकता है?",
      answer: "बिल्कुल! Anytt cc से आप किसी भी TikTok वीडियो से ऑडियो एक्सट्रैक्ट कर सकते हैं। बस लिंक पेस्ट करें और MP3 ऑप्शन चुनें।"
    },
    {
      question: "Anytt cc iPhone और Android पर काम करता है?",
      answer: "हाँ, Anytt cc सभी डिवाइस पर काम करता है: iPhone, Android, PC और Mac। कोई ऐप इंस्टॉल करने की जरूरत नहीं।"
    },
    {
      question: "क्या Anytt cc सुरक्षित है?",
      answer: "पूरी तरह सुरक्षित। Anytt cc आपका कोई डेटा स्टोर नहीं करता। आपकी प्राइवेसी पूरी तरह सुरक्षित है।"
    },
    {
      question: "बिना वॉटरमार्क के TikTok वीडियो डाउनलोड हो सकता है?",
      answer: "हाँ! Anytt cc की सबसे बड़ी खासियत यही है - TikTok वीडियो बिना वॉटरमार्क/लोगो के HD 1080p क्वालिटी में डाउनलोड करें।"
    },
    {
      question: "एक साथ कई वीडियो डाउनलोड हो सकते हैं?",
      answer: "हाँ! Anytt cc में बैच डाउनलोड सपोर्ट है। एक साथ कई TikTok लिंक पेस्ट करके तेजी से डाउनलोड करें।"
    }
  ];

  const breadcrumbItems = [
    { name: "होम", url: BASE_URL },
    { name: "TikTok डाउनलोड", url: `${BASE_URL}/hi/tiktok-download` }
  ];

  const allHreflang = [
    { lang: "hi", url: `${BASE_URL}/hi/tiktok-download` },
    { lang: "bn", url: `${BASE_URL}/bn/tiktok-download` },
    { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
    { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
    { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
    { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
    { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
    { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
    { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
    { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
  ];

  const hindiKeywordsStr = "टिकटॉक वीडियो डाउनलोड, टिकटॉक डाउनलोडर, बिना वॉटरमार्क, टिकटॉक एमपी3, फ्री डाउनलोड, वीडियो सेव, टिकटॉक HD, लोगो हटाएं, टिकटॉक ऑडियो, टिकटॉक सेवर, tiktok video download hindi, tiktok downloader india, download tiktok without watermark hindi, tiktok download kaise kare, tiktok video save kaise kare";

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="hi">
      <SEOHead 
        title="Anytt cc - टिकटॉक वीडियो डाउनलोडर | बिना वॉटरमार्क फ्री डाउनलोड 2026"
        description="Anytt cc - सबसे अच्छा फ्री टिकटॉक वीडियो डाउनलोडर। बिना वॉटरमार्क/लोगो के HD क्वालिटी में TikTok वीडियो डाउनलोड करें। iPhone, Android, PC पर काम करता है। रजिस्ट्रेशन की जरूरत नहीं।"
        keywords={`${goldenKeywordsString}, ${hindiKeywordsStr}`}
        canonicalUrl={`${BASE_URL}/hi/tiktok-download`}
        lang="hi"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsHI),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={allHreflang}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "होम", href: "/" },
            { label: "TikTok डाउनलोड" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              टिकटॉक वीडियो डाउनलोडर
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              बिना वॉटरमार्क/लोगो के HD क्वालिटी में TikTok वीडियो डाउनलोड करें। 100% फ्री, रजिस्ट्रेशन की जरूरत नहीं।
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              फ्री टिकटॉक वीडियो डाउनलोड • बिना लोगो • HD क्वालिटी • MP3 ऑडियो
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="TikTok वीडियो लिंक यहाँ पेस्ट करें..."
              batchPlaceholder="कई TikTok लिंक पेस्ट करें (हर लाइन में एक)"
              accentColor="primary"
              hideHeading
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              TikTok वीडियो कैसे डाउनलोड करें
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">१</div>
                <h3 className="font-semibold mb-2">लिंक कॉपी करें</h3>
                <p className="text-sm text-muted-foreground">TikTok ऐप खोलें और वीडियो लिंक कॉपी करें</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">२</div>
                <h3 className="font-semibold mb-2">Anytt cc में पेस्ट करें</h3>
                <p className="text-sm text-muted-foreground">ऊपर सर्च बार में लिंक पेस्ट करें</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">३</div>
                <h3 className="font-semibold mb-2">डाउनलोड करें</h3>
                <p className="text-sm text-muted-foreground">डाउनलोड बटन क्लिक करें और HD वीडियो सेव करें</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Anytt cc - Hindi */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              <span className="gradient-text">Anytt cc</span> क्या है?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Anytt cc दुनिया का सबसे अच्छा फ्री TikTok वीडियो डाउनलोडर है। इससे आप कोई भी TikTok वीडियो बिना वॉटरमार्क/लोगो के HD क्वालिटी में डाउनलोड कर सकते हैं। कोई ऐप इंस्टॉल या रजिस्ट्रेशन की जरूरत नहीं। बस लिंक कॉपी-पेस्ट करें और वीडियो सेव करें। iPhone, Android, Windows, Mac — सभी डिवाइस पर काम करता है। बैच डाउनलोड, MP3 ऑडियो एक्सट्रैक्शन, स्लाइडशो सेव — सब कुछ फ्री!
            </p>
            <p className="text-xs text-muted-foreground/60">
              <time dateTime="2026-02-28">अंतिम अपडेट: 28 फरवरी, 2026</time>
            </p>
          </div>
        </section>

        {/* Keywords Section - Hindi SEO */}
        <section className="py-12 px-4 bg-muted/30 hidden md:block">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - संपूर्ण टिकटॉक समाधान
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 टिकटॉक डाउनलोड</h3>
                <div className="flex flex-wrap gap-2">
                  {["टिकटॉक वीडियो डाउनलोड", "TikTok download", "वीडियो सेव", "टिकटॉक ऑनलाइन"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 बिना वॉटरमार्क</h3>
                <div className="flex flex-wrap gap-2">
                  {["वॉटरमार्क हटाएं", "लोगो फ्री", "क्लीन वीडियो", "no watermark"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 टिकटॉक MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["टिकटॉक एमपी3", "गाना डाउनलोड", "ऑडियो सेव", "MP3 converter"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎥 HD & 4K</h3>
                <div className="flex flex-wrap gap-2">
                  {["HD वीडियो", "1080p डाउनलोड", "4K TikTok", "हाई क्वालिटी"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">📱 सभी डिवाइस</h3>
                <div className="flex flex-wrap gap-2">
                  {["iPhone", "Android", "PC", "Mac", "Samsung"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 फीचर्स</h3>
                <div className="flex flex-wrap gap-2">
                  {["बैच डाउनलोड", "तेज", "फ्री", "सुरक्षित"].map((k, i) => (
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
              अक्सर पूछे जाने वाले सवाल
            </h2>
            <div className="space-y-4">
              {tiktokFaqsHI.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">अन्य भाषाओं में भी उपलब्ध:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/bn/tiktok-download" className="text-primary hover:underline">বাংলা</Link>
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

export default TikTokDownloaderHI;
