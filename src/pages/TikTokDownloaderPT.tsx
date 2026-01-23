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
 * Portuguese TikTok Downloader Landing Page
 * Optimized for Brazilian and Portuguese-speaking markets
 */
const TikTokDownloaderPT = () => {
  const tiktokFaqsPT = [
    {
      question: "Como baixar vídeos do TikTok sem marca d'água com Anytt cc?",
      answer: "Com Anytt cc é muito fácil: copie o link do vídeo do TikTok, cole na nossa barra de pesquisa e clique em 'Baixar'. Seu vídeo será salvo em HD sem marca d'água."
    },
    {
      question: "O Anytt cc é grátis para baixar vídeos do TikTok?",
      answer: "Sim! O Anytt cc é 100% grátis. Não há taxas ocultas, sem cadastro e sem limite de downloads. Baixe quantos vídeos do TikTok quiser."
    },
    {
      question: "Posso baixar áudio MP3 do TikTok com Anytt cc?",
      answer: "Com certeza! O Anytt cc permite extrair áudio de qualquer vídeo do TikTok. Basta colar o link e selecionar a opção MP3."
    },
    {
      question: "O Anytt cc funciona no iPhone e Android?",
      answer: "Sim, o Anytt cc funciona perfeitamente em todos os dispositivos: iPhone, Android, PC e Mac. Não precisa instalar nenhum aplicativo."
    },
    {
      question: "É seguro usar o Anytt cc?",
      answer: "Totalmente seguro. O Anytt cc não armazena seus dados nem os vídeos que você baixa. Sua privacidade está protegida."
    }
  ];

  const breadcrumbItems = [
    { name: "Início", url: BASE_URL },
    { name: "Baixar TikTok", url: `${BASE_URL}/pt/baixar-tiktok` }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" lang="pt">
      <SEOHead 
        title="Anytt cc - Baixar Vídeos do TikTok Sem Marca D'água Grátis 2026"
        description="Anytt cc - O melhor baixador de vídeos TikTok grátis. Baixe vídeos do TikTok sem marca d'água em HD. Funciona no iPhone, Android, PC. Sem cadastro necessário."
        keywords="anytt cc, anytt cc baixar tiktok, baixar tiktok sem marca d'água, baixador de vídeos tiktok, salvar vídeo tiktok, tiktok sem logo, baixar tiktok grátis, tiktok mp4, tiktok hd, download tiktok brasil"
        canonicalUrl={`${BASE_URL}/pt/baixar-tiktok`}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqsPT),
          getBreadcrumbSchema(breadcrumbItems)
        ]}
        hreflang={[
          { lang: "pt", url: `${BASE_URL}/pt/baixar-tiktok` },
          { lang: "en", url: `${BASE_URL}/tiktok-downloader` },
          { lang: "es", url: `${BASE_URL}/es/descargar-tiktok` },
          { lang: "id", url: `${BASE_URL}/id/unduh-tiktok` },
          { lang: "x-default", url: `${BASE_URL}/tiktok-downloader` }
        ]}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Breadcrumb 
          items={[
            { label: "Início", href: "/" },
            { label: "Baixar TikTok" }
          ]} 
        />
        
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Anytt cc</span>
              <br />
              Baixador de TikTok
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Baixe vídeos do TikTok sem marca d'água em qualidade HD. 100% grátis, sem cadastro, downloads ilimitados.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              Baixar video TikTok grátis sem marca d'água • Salvar video TikTok sem logo • Download TikTok HD
            </p>
            
            <PlatformDownloader 
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Cole o link do vídeo do TikTok aqui..."
              batchPlaceholder="Cole múltiplos links do TikTok (um por linha)"
              accentColor="primary"
            />
          </div>
        </section>

        {/* How To Section */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Como Baixar Vídeos do TikTok
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Copie o Link</h3>
                <p className="text-sm text-muted-foreground">Abra o TikTok e copie o link do vídeo que deseja baixar</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Cole no Anytt cc</h3>
                <p className="text-sm text-muted-foreground">Cole o link na barra de pesquisa acima</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Baixe</h3>
                <p className="text-sm text-muted-foreground">Clique em baixar e salve seu vídeo em HD</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {tiktokFaqsPT.map((faq, index) => (
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
            <p className="text-sm text-muted-foreground mb-4">Também disponível em:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tiktok-downloader" className="text-primary hover:underline">English</Link>
              <Link to="/es/descargar-tiktok" className="text-primary hover:underline">Español</Link>
              <Link to="/id/unduh-tiktok" className="text-primary hover:underline">Indonesia</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TikTokDownloaderPT;
