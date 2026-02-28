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
 * Indonesian TikTok Downloader Landing Page
 * Optimized for Indonesian market
 */
const TikTokDownloaderID = () => {
  const tiktokFaqsID = [
    {
      question: "Bagaimana cara download video TikTok tanpa watermark dengan Anytt cc?",
      answer: "Dengan Anytt cc sangat mudah: salin link video TikTok, tempel di kotak pencarian kami dan klik 'Download'. Video Anda akan tersimpan dalam HD tanpa watermark."
    },
    {
      question: "Apakah Anytt cc gratis untuk download video TikTok?",
      answer: "Ya! Anytt cc 100% gratis. Tidak ada biaya tersembunyi, tanpa registrasi dan tanpa batas download. Download video TikTok sebanyak yang Anda mau."
    },
    {
      question: "Bisakah saya download audio MP3 TikTok dengan Anytt cc?",
      answer: "Tentu saja! Anytt cc memungkinkan Anda mengekstrak audio dari video TikTok manapun. Cukup tempel linknya dan pilih opsi MP3."
    },
    {
      question: "Apakah Anytt cc berfungsi di iPhone dan Android?",
      answer: "Ya, Anytt cc berfungsi sempurna di semua perangkat: iPhone, Android, PC dan Mac. Tidak perlu menginstal aplikasi apapun."
    },
    {
      question: "Apakah aman menggunakan Anytt cc?",
      answer: "Sangat aman. Anytt cc tidak menyimpan data Anda maupun video yang Anda download. Privasi Anda terlindungi."
    }
  ];

  const breadcrumbItems = [
    { name: "Beranda", url: BASE_URL },
    { name: "Unduh TikTok", url: `${BASE_URL}/id/unduh-tiktok` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="id">
      <SEOHead 
        title="Anytt cc - Download Video TikTok Tanpa Watermark Gratis 2026"
        description="Anytt cc - Pengunduh video TikTok gratis terbaik. Download video TikTok tanpa watermark dalam HD. Berfungsi di iPhone, Android, PC. Tanpa registrasi diperlukan."
        keywords={`${goldenKeywordsString}, download TikTok, fast downloads, social media, video downloader, anytt cc, anytt cc unduh tiktok, download tiktok tanpa watermark, pengunduh video tiktok, simpan video tiktok, tiktok tanpa logo, download tiktok gratis, tiktok mp4, tiktok hd, unduh video tiktok indonesia`}
        canonicalUrl={`${BASE_URL}/id/unduh-tiktok`}
        lang="id"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsID),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={[
          { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
          { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
          { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
          { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
          { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
          { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
          { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
          { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "Beranda", href: "/" },
            { label: "Unduh TikTok" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              Pengunduh TikTok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Download video TikTok tanpa watermark dalam kualitas HD. 100% gratis, tanpa registrasi, download tanpa batas.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              Download video TikTok gratis tanpa watermark • Cara download TikTok tanpa watermark • Simpan TikTok HD
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Tempel link video TikTok di sini..."
              batchPlaceholder="Tempel banyak link TikTok (satu per baris)"
              accentColor="primary"
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Cara Download Video TikTok
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Salin Link</h3>
                <p className="text-sm text-muted-foreground">Buka TikTok dan salin link video yang ingin Anda download</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Tempel di Anytt cc</h3>
                <p className="text-sm text-muted-foreground">Tempel link di kotak pencarian di atas</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Download</h3>
                <p className="text-sm text-muted-foreground">Klik download dan simpan video Anda dalam HD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section - Indonesian SEO */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Solusi TikTok Lengkap Anda
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 Pengunduh TikTok</h3>
                <div className="flex flex-wrap gap-2">
                  {["download video tiktok", "tiktok downloader gratis", "simpan video tiktok", "unduh tiktok online"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 Tanpa Watermark</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok tanpa watermark", "video tanpa logo", "download tanpa tanda", "tiktok hd bersih"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 TikTok MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp3 downloader", "download audio tiktok", "konversi tiktok ke mp3", "tiktok musik"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🖼️ Slideshow & Carousel</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok slideshow", "download carousel", "foto tiktok", "mode foto tiktok"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎥 4K Ultra HD</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok 4K", "tiktok HD 1080p", "video kualitas tinggi", "download tiktok 4K"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎬 Live & Story</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok live download", "tiktok story", "tiktok clips", "download siaran langsung"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🌍 Semua Perangkat</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok iphone", "tiktok android", "tiktok pc", "tiktok mac", "tiktok chrome"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 Fitur</h3>
                <div className="flex flex-wrap gap-2">
                  {["download cepat", "kualitas hd", "tanpa aplikasi", "alat aman"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎯 Kualitas Tinggi</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp4 hd", "video 1080p", "download cepat", "tiktok web tool"].map((k, i) => (
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
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="space-y-4">
              {tiktokFaqsID.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">Juga tersedia dalam:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
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

export default TikTokDownloaderID;
