import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import { Link } from "react-router-dom";
import {
  BASE_URL,
  getFAQSchema,
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  seoConfig,
} from "@/lib/seo-config";

const faqs = [
  {
    question: "How do I download a TikTok story with Anytt cc?",
    answer:
      "Open the public TikTok story you want to save, copy the link from the share menu, paste it into Anytt cc, and click download. We fetch the original story video or photo instantly — no watermark, no signup.",
  },
  {
    question: "Can I download TikTok stories without a watermark?",
    answer:
      "Yes. Anytt cc TikTok story downloader saves stories in their clean original quality, without the TikTok watermark or username overlay burned in.",
  },
  {
    question: "Does the TikTok story saver work on iPhone and Android?",
    answer:
      "Yes. It runs entirely in your browser on iPhone, Android, iPad, Windows and Mac. You don't need to install any app to save TikTok stories.",
  },
  {
    question: "Can I download someone else's TikTok story?",
    answer:
      "You can save any publicly shared TikTok story that you can view without logging in. Anytt cc does not bypass private accounts or protected content.",
  },
  {
    question: "What quality do TikTok stories download in?",
    answer:
      "Anytt cc grabs the highest-resolution version TikTok stores for each story — typically 1080p HD for videos and full-resolution JPG for photo stories.",
  },
  {
    question: "Are TikTok stories saved anonymously?",
    answer:
      "Yes. Anytt cc processes stories through our own servers, so the creator is not notified that you saved their story. Your download is private.",
  },
  {
    question: "Is the TikTok story downloader really free?",
    answer:
      "It's 100% free with no daily limits, no popups, no ads, and no account. Download as many public TikTok stories as you like.",
  },
  {
    question: "Can I download TikTok stories in bulk?",
    answer:
      "Yes. Switch to Batch mode and paste multiple TikTok story links (one per line). Anytt cc processes them together and gives you a download button for each.",
  },
];

const TikTokStoryDownloader = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="TikTok Story Downloader — Save TikTok Stories HD Free | Anytt cc"
      description="Download TikTok stories in HD without watermark. Free, anonymous TikTok story saver — works on iPhone, Android & PC. No app, no signup, no ads."
      canonicalUrl={`${BASE_URL}/tiktok-story-downloader`}
      keywords={`tiktok story downloader, tiktok story saver, download tiktok story, save tiktok story, tiktok story download hd, tiktok story no watermark, tiktok story downloader anonymous, tiktok story downloader online, tiktok stories saver, download tiktok stories iphone, download tiktok stories android, tiktok story download free, ${seoConfig.tiktok.keywords}`}
      jsonLd={[
        getWebApplicationSchema(),
        getHowToSchema("TikTok"),
        getFAQSchema(faqs),
        getBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "TikTok Story Downloader", url: `${BASE_URL}/tiktok-story-downloader` },
        ]),
      ]}
    />
    <Header />
    <main>
      <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
        <div className="floating-blob blob-1" />
        <div className="floating-blob blob-2" />
        <div className="floating-blob blob-3" />
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: "TikTok Story Downloader" }]} />
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
              <span className="font-medium">📖 HD stories • Anonymous • No watermark</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
            <span className="gradient-text">TikTok Story</span>
            <br className="md:hidden" />
            <span className="text-foreground"> Downloader</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-base md:text-lg">
            Save any public TikTok story in HD — no watermark, anonymous,
            free forever. Works on iPhone, Android, iPad and desktop.
          </p>
          <PlatformDownloader
            platform="tiktok"
            platformName="TikTok"
            platformIcon="📖"
            functionName="tiktok-download"
            placeholder="Paste TikTok story link..."
            batchPlaceholder="Paste TikTok story URLs here 📖&#10;One per line, up to 100 stories!"
            accentColor="primary"
            hideHeading
            customSubtitle="Download TikTok stories in HD — no watermark, anonymous, free"
          />
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
            <span className="gradient-text">TikTok Story</span> Downloader FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-2xl p-5 group">
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

      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
            What is <span className="gradient-text">Anytt cc</span> TikTok Story Downloader?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Anytt cc TikTok Story Downloader is a free online tool that lets
              you save any public TikTok story — video or photo — in full HD.
              Just paste the story link and download in one click. No app, no
              account, no watermark, and completely anonymous.
            </p>
            <p>
              Unlike screen recording, Anytt cc extracts the original media file
              TikTok serves to the app, preserving the exact resolution, audio,
              and aspect ratio the creator uploaded. It's the cleanest way to
              archive stories from your favorite creators before they expire.
            </p>
            <p>
              Anytt cc works on iPhone, Android, iPad, Windows, Mac and
              Chromebook — anywhere you have a browser. Use it to save your own
              stories, keep a private moodboard, or archive content from public
              accounts you follow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
          <nav className="flex flex-wrap justify-center gap-4" aria-label="Related downloader tools">
            <Link to="/tiktok-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🎵</span><span className="font-semibold">TikTok Video Downloader</span>
            </Link>
            <Link to="/tiktok-slideshow-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors">
              <span className="text-xl">🖼️</span><span className="font-semibold">Slideshow Downloader</span>
            </Link>
            <Link to="/tiktok-live-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🔴</span><span className="font-semibold">Live Downloader</span>
            </Link>
          </nav>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TikTokStoryDownloader;
