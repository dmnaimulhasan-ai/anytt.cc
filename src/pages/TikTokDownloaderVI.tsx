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
  getBreadcrumbSchema
} from "@/lib/seo-config";

/**
 * Vietnamese TikTok Downloader Landing Page
 * Optimized for Vietnamese-speaking markets
 */
const TikTokDownloaderVI = () => {
  const tiktokFaqsVI = [
    {
      question: "Làm thế nào để tải video TikTok không có logo bằng Anytt cc?",
      answer: "Với Anytt cc rất đơn giản: sao chép liên kết video TikTok, dán vào thanh tìm kiếm của chúng tôi và nhấp vào 'Tải xuống'. Video của bạn sẽ được lưu ở chất lượng HD không có logo."
    },
    {
      question: "Anytt cc có miễn phí để tải video TikTok không?",
      answer: "Có! Anytt cc miễn phí 100%. Không có phí ẩn, không cần đăng ký và không giới hạn tải xuống. Tải bao nhiêu video TikTok tùy thích."
    },
    {
      question: "Tôi có thể tải âm thanh MP3 từ TikTok bằng Anytt cc không?",
      answer: "Hoàn toàn được! Anytt cc cho phép bạn trích xuất âm thanh từ bất kỳ video TikTok nào. Chỉ cần dán liên kết và chọn tùy chọn MP3."
    },
    {
      question: "Anytt cc có hoạt động trên iPhone và Android không?",
      answer: "Có, Anytt cc hoạt động hoàn hảo trên tất cả các thiết bị: iPhone, Android, PC và Mac. Không cần cài đặt bất kỳ ứng dụng nào."
    },
    {
      question: "Sử dụng Anytt cc có an toàn không?",
      answer: "Hoàn toàn an toàn. Anytt cc không lưu trữ dữ liệu của bạn hoặc các video bạn tải xuống. Quyền riêng tư của bạn được bảo vệ."
    },
    {
      question: "Video TikTok được tải xuống ở chất lượng nào?",
      answer: "Anytt cc tải video ở chất lượng HD gốc (1080p). Bạn có thể tải xuống mà không mất chất lượng video."
    },
    {
      question: "Anytt cc có hỗ trợ tải nhiều video cùng lúc không?",
      answer: "Có! Anytt cc hỗ trợ tải hàng loạt. Bạn có thể dán nhiều liên kết TikTok cùng một lúc để tải xuống nhanh chóng."
    }
  ];

  const breadcrumbItems = [
    { name: "Trang chủ", url: BASE_URL },
    { name: "Tải TikTok", url: `${BASE_URL}/vi/tai-tiktok` }
  ];

  const allHreflang = [
    { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
    { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
    { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
    { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
    { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
    { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
    { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
    { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="vi">
      <SEOHead 
        title="Anytt cc - Tải Video TikTok Không Logo Miễn Phí 2026"
        description="Anytt cc - Công cụ tải video TikTok miễn phí tốt nhất. Tải video TikTok không có logo chất lượng HD. Hoạt động trên iPhone, Android, PC. Không cần đăng ký."
        keywords="download TikTok, fast downloads, social media, video downloader, anytt cc, tải video tiktok, tải tiktok không logo, download video tiktok không watermark, tải video tiktok không có logo, tải nhạc tiktok, tải tiktok miễn phí, lưu video tiktok, tiktok mp4, tiktok hd"
        canonicalUrl={`${BASE_URL}/vi/tai-tiktok`}
        lang="vi"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsVI),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={allHreflang}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tải TikTok" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              Tải Video TikTok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Tải video TikTok không có logo chất lượng HD. Miễn phí 100%, không cần đăng ký, tải không giới hạn.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              Tải video TikTok miễn phí không logo • Lưu video TikTok • Tải TikTok HD
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Dán liên kết video TikTok vào đây..."
              batchPlaceholder="Dán nhiều liên kết TikTok (mỗi dòng một liên kết)"
              accentColor="primary"
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Cách Tải Video TikTok
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Sao Chép Liên Kết</h3>
                <p className="text-sm text-muted-foreground">Mở TikTok và sao chép liên kết video bạn muốn tải xuống</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Dán Vào Anytt cc</h3>
                <p className="text-sm text-muted-foreground">Dán liên kết vào thanh tìm kiếm ở trên</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Tải Xuống</h3>
                <p className="text-sm text-muted-foreground">Nhấp vào tải xuống và lưu video của bạn ở chất lượng HD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section - Vietnamese SEO */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Giải Pháp TikTok Toàn Diện
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 Tải TikTok</h3>
                <div className="flex flex-wrap gap-2">
                  {["tải video tiktok", "download tiktok", "lưu video tiktok", "tải tiktok online"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 Không Logo</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok không logo", "video không watermark", "tải không dấu", "tiktok hd sạch"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 TikTok MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp3 tải", "tải nhạc tiktok", "chuyển tiktok sang mp3", "nhạc tiktok"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🌍 Mọi Thiết Bị</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok iphone", "tiktok android", "tiktok pc", "tiktok mac", "tiktok chrome"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 Tính Năng</h3>
                <div className="flex flex-wrap gap-2">
                  {["tải nhanh", "chất lượng hd", "không cần app", "công cụ an toàn"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎯 Chất Lượng Cao</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp4 hd", "video 1080p", "tải nhanh", "tiktok web tool"].map((k, i) => (
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
              Câu Hỏi Thường Gặp
            </h2>
            <div className="space-y-4">
              {tiktokFaqsVI.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">Cũng có sẵn bằng:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
              <Link to="/tr/tiktok-indir" className="text-primary hover:underline">Türkçe</Link>
              <Link to="/th/tiktok-download" className="text-primary hover:underline">ไทย</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TikTokDownloaderVI;