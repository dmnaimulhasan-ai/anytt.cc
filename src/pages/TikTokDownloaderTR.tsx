import { getLangKeywordString } from "@/lib/lang-keywords";
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
 * Turkish TikTok Downloader Landing Page
 * Optimized for Turkish-speaking markets
 */
const TikTokDownloaderTR = () => {
  const tiktokFaqsTR = [
    {
      question: "Anytt cc ile TikTok videolarını filigrensiz nasıl indiririm?",
      answer: "Anytt cc ile çok kolay: TikTok video bağlantısını kopyalayın, arama çubuğumuza yapıştırın ve 'İndir' düğmesine tıklayın. Videonuz filigrensiz HD kalitesinde kaydedilecektir."
    },
    {
      question: "Anytt cc TikTok video indirmek için ücretsiz mi?",
      answer: "Evet! Anytt cc %100 ücretsizdir. Gizli ücret yok, kayıt gerekmez ve indirme limiti yoktur. İstediğiniz kadar TikTok videosu indirin."
    },
    {
      question: "Anytt cc ile TikTok'tan MP3 ses indirebilir miyim?",
      answer: "Kesinlikle! Anytt cc herhangi bir TikTok videosundan ses çıkarmanızı sağlar. Bağlantıyı yapıştırın ve MP3 seçeneğini seçin."
    },
    {
      question: "Anytt cc iPhone ve Android'de çalışır mı?",
      answer: "Evet, Anytt cc tüm cihazlarda mükemmel çalışır: iPhone, Android, PC ve Mac. Herhangi bir uygulama yüklemenize gerek yoktur."
    },
    {
      question: "Anytt cc kullanmak güvenli mi?",
      answer: "Tamamen güvenlidir. Anytt cc verilerinizi veya indirdiğiniz videoları saklamaz. Gizliliğiniz korunmaktadır."
    },
    {
      question: "TikTok videoları hangi kalitede indiriliyor?",
      answer: "Anytt cc videoları orijinal HD kalitesinde (1080p) indirir. Video kalitesinden ödün vermeden filigrensiz indirme yapabilirsiniz."
    }
  ];

  const breadcrumbItems = [
    { name: "Ana Sayfa", url: BASE_URL },
    { name: "TikTok İndir", url: `${BASE_URL}/tr/tiktok-indir` }
  ];

  const allHreflang = [
    { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
    { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
    { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
    { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
    { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
    { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
    { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
    { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="tr">
      <SEOHead 
        title="Anytt cc - TikTok Video İndirme Filigrensiz Ücretsiz 2026"
        description="Anytt cc - En iyi ücretsiz TikTok video indirici. TikTok videolarını filigrensiz HD kalitesinde indirin. iPhone, Android, PC'de çalışır. Kayıt gerekmez."
        keywords={`${goldenKeywordsString}, ${getLangKeywordString("tr")}, tiktok video indirme, tiktok indirme, tiktok video indir, tiktok indir, tiktok video indirme programı, tiktok filigrensiz indir, tiktok video kaydet, tiktok mp4 indir, tiktok hd indir, tiktok indirici`}
        canonicalUrl={`${BASE_URL}/tr/tiktok-indir`}
        lang="tr"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsTR),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={allHreflang}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "TikTok İndir" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              TikTok Video İndirici
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              TikTok videolarını filigrensiz HD kalitesinde indirin. %100 ücretsiz, kayıt gerekmez, sınırsız indirme.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              TikTok video indir ücretsiz filigrensiz • TikTok video kaydet • TikTok HD indir
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="TikTok video bağlantısını buraya yapıştırın..."
              batchPlaceholder="Birden fazla TikTok bağlantısı yapıştırın (her satıra bir tane)"
              accentColor="primary"
              hideHeading
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              TikTok Videoları Nasıl İndirilir
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Bağlantıyı Kopyalayın</h3>
                <p className="text-sm text-muted-foreground">TikTok'u açın ve indirmek istediğiniz videonun bağlantısını kopyalayın</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Anytt cc'ye Yapıştırın</h3>
                <p className="text-sm text-muted-foreground">Bağlantıyı yukarıdaki arama çubuğuna yapıştırın</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">İndirin</h3>
                <p className="text-sm text-muted-foreground">İndir düğmesine tıklayın ve videonuzu HD olarak kaydedin</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section - Turkish SEO */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Eksiksiz TikTok Çözümünüz
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 TikTok İndirici</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok video indir", "tiktok indirme", "video kaydet", "tiktok online indir"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 Filigrensiz</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok filigrensiz", "logosuz video", "temiz indirme", "tiktok hd temiz"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 TikTok MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp3 indir", "ses indir tiktok", "tiktok müzik indir", "mp3 dönüştürücü"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🖼️ Slayt & Carousel</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok slayt gösterisi", "carousel indir", "tiktok fotoğraf", "foto modu tiktok"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎥 4K Ultra HD</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok 4K", "tiktok HD 1080p", "yüksek kalite video", "tiktok 4K indir"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎬 Canlı & Hikaye</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok canlı indir", "tiktok hikaye", "tiktok klipler", "canlı yayın indir"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🌍 Tüm Cihazlar</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok iphone", "tiktok android", "tiktok bilgisayar", "tiktok mac", "tiktok chrome"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 Özellikler</h3>
                <div className="flex flex-wrap gap-2">
                  {["hızlı indirme", "hd kalite", "uygulama gereksiz", "güvenli araç"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎯 Yüksek Kalite</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp4 hd", "video 1080p", "hızlı indirme", "tiktok web aracı"].map((k, i) => (
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
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {tiktokFaqsTR.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">Diğer dillerde de mevcuttur:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
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

export default TikTokDownloaderTR;