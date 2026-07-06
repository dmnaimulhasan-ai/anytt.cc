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
 * Thai TikTok Downloader Landing Page
 * Optimized for Thai-speaking markets
 */
const TikTokDownloaderTH = () => {
  const tiktokFaqsTH = [
    {
      question: "ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำด้วย Anytt cc ได้อย่างไร?",
      answer: "ง่ายมากกับ Anytt cc: คัดลอกลิงก์วิดีโอ TikTok วางในแถบค้นหาของเรา แล้วคลิก 'ดาวน์โหลด' วิดีโอของคุณจะถูกบันทึกในคุณภาพ HD โดยไม่มีลายน้ำ"
    },
    {
      question: "Anytt cc ดาวน์โหลดวิดีโอ TikTok ฟรีหรือไม่?",
      answer: "ใช่! Anytt cc ฟรี 100% ไม่มีค่าใช้จ่ายแอบแฝง ไม่ต้องลงทะเบียน และไม่จำกัดการดาวน์โหลด ดาวน์โหลดวิดีโอ TikTok ได้มากเท่าที่คุณต้องการ"
    },
    {
      question: "ดาวน์โหลดเสียง MP3 จาก TikTok ด้วย Anytt cc ได้ไหม?",
      answer: "ได้แน่นอน! Anytt cc ช่วยให้คุณแยกเสียงจากวิดีโอ TikTok ใดก็ได้ เพียงวางลิงก์แล้วเลือกตัวเลือก MP3"
    },
    {
      question: "Anytt cc ใช้งานได้บน iPhone และ Android ไหม?",
      answer: "ใช่ Anytt cc ทำงานได้อย่างสมบูรณ์แบบบนทุกอุปกรณ์: iPhone, Android, PC และ Mac ไม่ต้องติดตั้งแอปใดๆ"
    },
    {
      question: "การใช้ Anytt cc ปลอดภัยหรือไม่?",
      answer: "ปลอดภัยอย่างสมบูรณ์ Anytt cc ไม่เก็บข้อมูลของคุณหรือวิดีโอที่คุณดาวน์โหลด ความเป็นส่วนตัวของคุณได้รับการปกป้อง"
    },
    {
      question: "วิดีโอ TikTok ดาวน์โหลดได้ในคุณภาพอะไร?",
      answer: "Anytt cc ดาวน์โหลดวิดีโอในคุณภาพ HD ดั้งเดิม (1080p) คุณสามารถดาวน์โหลดโดยไม่สูญเสียคุณภาพวิดีโอ"
    }
  ];

  const breadcrumbItems = [
    { name: "หน้าแรก", url: BASE_URL },
    { name: "ดาวน์โหลด TikTok", url: `${BASE_URL}/th/tiktok-download` }
  ];

  const allHreflang = [
    { lang: "th", url: `${BASE_URL}/th/tiktok-download` },
    { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
    { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
    { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
    { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
    { lang: "tr", url: `${BASE_URL}/tr/tiktok-indir` },
    { lang: "vi", url: `${BASE_URL}/vi/tai-tiktok` },
    { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="th">
      <SEOHead 
        title="Anytt cc - ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำ ฟรี 2026"
        description="Anytt cc - ตัวดาวน์โหลดวิดีโอ TikTok ฟรีที่ดีที่สุด ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำ คุณภาพ HD ใช้งานได้บน iPhone, Android, PC ไม่ต้องลงทะเบียน"
        keywords={`${goldenKeywordsString}, ${getLangKeywordString("th")}, โหลดtiktok, ดาวน์โหลด tiktok, โหลดวีดีโอ tiktok, โหลดคลิป tiktok, ดาวน์โหลดวีดีโอ tiktok, โหลด tiktok ไม่มีลายน้ำ, เซฟวิดีโอ tiktok, tiktok mp3, โหลดเสียง tiktok`}
        canonicalUrl={`${BASE_URL}/th/tiktok-download`}
        lang="th"
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsTH),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={allHreflang}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "หน้าแรก", href: "/" },
            { label: "ดาวน์โหลด TikTok" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              ดาวน์โหลดวิดีโอ TikTok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              ดาวน์โหลดวิดีโอ TikTok ไม่มีลายน้ำ คุณภาพ HD ฟรี 100% ไม่ต้องลงทะเบียน ดาวน์โหลดไม่จำกัด
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              โหลดวิดีโอ TikTok ฟรีไม่มีลายน้ำ • เซฟวิดีโอ TikTok • ดาวน์โหลด TikTok HD
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="วางลิงก์วิดีโอ TikTok ที่นี่..."
              batchPlaceholder="วางลิงก์ TikTok หลายรายการ (หนึ่งรายการต่อบรรทัด)"
              accentColor="primary"
              hideHeading
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              วิธีดาวน์โหลดวิดีโอ TikTok
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">คัดลอกลิงก์</h3>
                <p className="text-sm text-muted-foreground">เปิด TikTok แล้วคัดลอกลิงก์วิดีโอที่คุณต้องการดาวน์โหลด</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">วางใน Anytt cc</h3>
                <p className="text-sm text-muted-foreground">วางลิงก์ในแถบค้นหาด้านบน</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">ดาวน์โหลด</h3>
                <p className="text-sm text-muted-foreground">คลิกดาวน์โหลดและบันทึกวิดีโอของคุณในคุณภาพ HD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section - Thai SEO */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - โซลูชัน TikTok ครบวงจร
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 ดาวน์โหลด TikTok</h3>
                <div className="flex flex-wrap gap-2">
                  {["โหลดวิดีโอ tiktok", "ดาวน์โหลด tiktok", "เซฟวิดีโอ tiktok", "โหลด tiktok ออนไลน์"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 ไม่มีลายน้ำ</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok ไม่มีลายน้ำ", "วิดีโอไม่มีโลโก้", "โหลดไม่มีเครื่องหมาย", "tiktok hd สะอาด"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 TikTok MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp3 ดาวน์โหลด", "โหลดเสียง tiktok", "แปลง tiktok เป็น mp3", "เพลง tiktok"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🖼️ สไลด์โชว์ & คาร์รูเซล</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok สไลด์โชว์", "ดาวน์โหลดคาร์รูเซล", "รูปภาพ tiktok", "โหมดรูปภาพ tiktok"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎥 4K Ultra HD</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok 4K", "tiktok HD 1080p", "วิดีโอคุณภาพสูง", "ดาวน์โหลด tiktok 4K"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎬 ไลฟ์ & สตอรี่</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok live ดาวน์โหลด", "tiktok story", "tiktok คลิป", "ดาวน์โหลดถ่ายทอดสด"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🌍 ทุกอุปกรณ์</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok iphone", "tiktok android", "tiktok pc", "tiktok mac", "tiktok chrome"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 คุณสมบัติ</h3>
                <div className="flex flex-wrap gap-2">
                  {["ดาวน์โหลดเร็ว", "คุณภาพ hd", "ไม่ต้องติดตั้งแอป", "เครื่องมือปลอดภัย"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎯 คุณภาพสูง</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp4 hd", "วิดีโอ 1080p", "ดาวน์โหลดเร็ว", "tiktok เว็บทูล"].map((k, i) => (
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
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-4">
              {tiktokFaqsTH.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">มีให้บริการในภาษาอื่นด้วย:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
              <Link to="/tr/tiktok-indir" className="text-primary hover:underline">Türkçe</Link>
              <Link to="/vi/tai-tiktok" className="text-primary hover:underline">Tiếng Việt</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TikTokDownloaderTH;