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
 * Spanish TikTok Downloader Landing Page
 * Optimized for Spanish-speaking markets
 */
const TikTokDownloaderES = () => {
  const tiktokFaqsES = [
    {
      question: "¿Cómo descargar videos de TikTok sin marca de agua con Anytt cc?",
      answer: "Con Anytt cc es muy fácil: copia el enlace del video de TikTok, pégalo en nuestra barra de búsqueda y haz clic en 'Descargar'. Tu video se guardará en HD sin marca de agua."
    },
    {
      question: "¿Anytt cc es gratis para descargar videos de TikTok?",
      answer: "¡Sí! Anytt cc es 100% gratis. No hay cargos ocultos, sin registro y sin límites de descarga. Descarga tantos videos de TikTok como quieras."
    },
    {
      question: "¿Puedo descargar audio MP3 de TikTok con Anytt cc?",
      answer: "¡Absolutamente! Anytt cc te permite extraer audio de cualquier video de TikTok. Simplemente pega el enlace y selecciona la opción MP3."
    },
    {
      question: "¿Funciona Anytt cc en iPhone y Android?",
      answer: "Sí, Anytt cc funciona perfectamente en todos los dispositivos: iPhone, Android, PC y Mac. No necesitas instalar ninguna aplicación."
    },
    {
      question: "¿Es seguro usar Anytt cc?",
      answer: "Totalmente seguro. Anytt cc no almacena tus datos ni los videos que descargas. Tu privacidad está protegida."
    }
  ];

  const breadcrumbItems = [
    { name: "Inicio", url: BASE_URL },
    { name: "Descargar TikTok", url: `${BASE_URL}/es/descargar-tiktok` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="es">
      <SEOHead 
        title="Anytt cc - Descargar Videos de TikTok Sin Marca de Agua Gratis 2026"
        description="Anytt cc - El mejor descargador de videos TikTok gratis. Descarga videos de TikTok sin marca de agua en HD. Funciona en iPhone, Android, PC. Sin registro necesario."
        keywords="download TikTok, fast downloads, social media, video downloader, anytt cc, anytt cc descargar tiktok, descargar tiktok sin marca de agua, descargador de videos tiktok, guardar video tiktok, tiktok sin logo, descargar tiktok gratis, tiktok mp4, tiktok hd, bajar videos tiktok"
        canonicalUrl={`${BASE_URL}/es/descargar-tiktok`}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsES),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={[
          { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
          { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
          { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
          { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
          { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "Inicio", href: "/" },
            { label: "Descargar TikTok" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              Descargador de TikTok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Descarga videos de TikTok sin marca de agua en calidad HD. 100% gratis, sin registro, descargas ilimitadas.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              Descargar video TikTok gratis sin marca de agua • Video TikTok sin watermark • Guardar TikTok HD
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Pega el enlace del video de TikTok aquí..."
              batchPlaceholder="Pega múltiples enlaces de TikTok (uno por línea)"
              accentColor="primary"
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Cómo Descargar Videos de TikTok
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Copia el Enlace</h3>
                <p className="text-sm text-muted-foreground">Abre TikTok y copia el enlace del video que quieres descargar</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Pega en Anytt cc</h3>
                <p className="text-sm text-muted-foreground">Pega el enlace en la barra de búsqueda de arriba</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Descarga</h3>
                <p className="text-sm text-muted-foreground">Haz clic en descargar y guarda tu video en HD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section - Spanish SEO */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Tu Solución Completa de TikTok
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🔥 Descargador TikTok</h3>
                <div className="flex flex-wrap gap-2">
                  {["descargar video tiktok", "tiktok downloader gratis", "guardar video tiktok", "descargar tiktok online"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">💰 Sin Marca de Agua</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok sin watermark", "video sin logo", "descargar sin marca", "tiktok hd limpio"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎵 TikTok MP3</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp3 downloader", "descargar audio tiktok", "convertir tiktok a mp3", "tiktok música"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🌍 Todos los Dispositivos</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok iphone", "tiktok android", "tiktok pc", "tiktok mac", "tiktok chrome"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🚀 Características</h3>
                <div className="flex flex-wrap gap-2">
                  {["descarga rápida", "calidad hd", "sin aplicación", "herramienta segura"].map((k, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{k}</span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3">🎯 Alta Calidad</h3>
                <div className="flex flex-wrap gap-2">
                  {["tiktok mp4 hd", "video 1080p", "descarga rápida", "tiktok web tool"].map((k, i) => (
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
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {tiktokFaqsES.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">También disponible en:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/pt/baixar-tiktok" className="text-primary hover:underline">Português</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TikTokDownloaderES;
