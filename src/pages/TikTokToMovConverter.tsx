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
    question: "How do I convert a TikTok video to MOV?",
    answer:
      "Paste the TikTok link into Anytt cc, download the source MP4 in HD, then rename the .mp4 to .mov — QuickTime and iMovie will open it natively. TikTok stores videos as MP4 with H.264, which is the same codec MOV containers use.",
  },
  {
    question: "Is MOV really the same as MP4?",
    answer:
      "Almost. MOV is Apple's QuickTime container and MP4 is the ISO standard, but both commonly wrap H.264 video and AAC audio. Most Apple apps (Final Cut, iMovie, QuickTime, Keynote) accept either — simply renaming the extension works in the vast majority of cases.",
  },
  {
    question: "Can I import the downloaded TikTok into Final Cut Pro or iMovie?",
    answer:
      "Yes. Download the HD MP4 with Anytt cc and drag it straight into Final Cut Pro, iMovie, DaVinci Resolve, Premiere Pro, or CapCut. All of them read TikTok's H.264 MP4 without conversion.",
  },
  {
    question: "Is the video downloaded without a TikTok watermark?",
    answer:
      "Yes. Anytt cc grabs the clean original file with no watermark or username overlay, so it's ready to edit or repurpose in your video editor.",
  },
  {
    question: "What resolution do I get?",
    answer:
      "The maximum quality TikTok serves — usually 1080p HD, sometimes higher for creator uploads. No re-encoding, no quality loss.",
  },
  {
    question: "Does the TikTok to MOV converter work on Mac and iPhone?",
    answer:
      "Yes. It runs in any browser on Mac, iPhone, iPad, Windows, or Android. On Mac and iPhone, the downloaded file plays natively in QuickTime and Photos.",
  },
  {
    question: "Is the TikTok to MOV converter free?",
    answer:
      "Yes — 100% free, unlimited downloads, no signup, no popups, no ads.",
  },
];

const TikTokToMovConverter = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="TikTok to MOV Converter — Download TikTok for iMovie & Final Cut | Anytt cc"
      description="Convert TikTok videos to MOV / QuickTime format for iMovie, Final Cut Pro and Keynote. Free HD download, no watermark, no signup — works on Mac & iPhone."
      canonicalUrl={`${BASE_URL}/tiktok-to-mov-converter`}
      keywords={`tiktok to mov, tiktok to mov converter, convert tiktok to mov, tiktok mov download, tiktok for imovie, tiktok for final cut pro, tiktok quicktime download, tiktok download mac, tiktok to keynote, tiktok mov no watermark, tiktok hd for editing, ${seoConfig.tiktok.keywords}`}
      jsonLd={[
        getWebApplicationSchema(),
        getHowToSchema("TikTok"),
        getFAQSchema(faqs),
        getBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "TikTok to MOV Converter", url: `${BASE_URL}/tiktok-to-mov-converter` },
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
          <Breadcrumb items={[{ label: "TikTok to MOV Converter" }]} />
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
              <span className="font-medium">🎬 iMovie & Final Cut ready • HD • No watermark</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
            <span className="gradient-text">TikTok to MOV</span>
            <br className="md:hidden" />
            <span className="text-foreground"> Converter</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-base md:text-lg">
            Download TikTok videos in HD, ready for iMovie, Final Cut Pro,
            QuickTime and Keynote. No watermark, no signup, free forever.
          </p>
          <PlatformDownloader
            platform="tiktok"
            platformName="TikTok"
            platformIcon="🎬"
            functionName="tiktok-download"
            placeholder="Paste TikTok link for MOV / QuickTime editing..."
            batchPlaceholder="Paste TikTok URLs here 🎬&#10;One per line, up to 100 clips!"
            accentColor="primary"
            hideHeading
            customSubtitle="Download HD TikTok clips for iMovie, Final Cut and QuickTime"
          />
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
            <span className="gradient-text">TikTok to MOV</span> FAQ
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
            What is <span className="gradient-text">Anytt cc</span> TikTok to MOV Converter?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Anytt cc TikTok to MOV Converter is a free tool for creators and
              editors who want to pull TikTok clips straight into Apple's
              editing stack — iMovie, Final Cut Pro, QuickTime Player, or
              Keynote. Paste any TikTok link and get an HD, watermark-free file
              you can drop into your timeline immediately.
            </p>
            <p>
              TikTok serves videos as H.264 MP4, which is the same codec Apple
              uses inside MOV containers. In practice you can rename the .mp4
              to .mov and every QuickTime-based app will open it natively — no
              re-encoding, no quality loss, no third-party converter needed.
            </p>
            <p>
              Use it to build B-roll libraries, cut YouTube compilations, or
              archive your own TikToks in a format your Mac editors love.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
          <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
            <Link to="/tiktok-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">📥</span><span className="font-semibold">TikTok HD Downloader</span>
            </Link>
            <Link to="/tiktok-mp3-converter" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors">
              <span className="text-xl">🎧</span><span className="font-semibold">TikTok to MP3</span>
            </Link>
            <Link to="/tiktok-slideshow-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🖼️</span><span className="font-semibold">Slideshow Downloader</span>
            </Link>
          </nav>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TikTokToMovConverter;
