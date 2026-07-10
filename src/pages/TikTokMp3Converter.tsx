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
    question: "How do I convert a TikTok video to MP3?",
    answer:
      "Copy any TikTok video link, paste it into Anytt cc, and choose the MP3 option. We extract the original audio and give you a clean 320 kbps MP3 file in seconds — no signup, no watermark.",
  },
  {
    question: "What audio quality does the TikTok MP3 converter produce?",
    answer:
      "Anytt cc converts TikTok audio to high-bitrate MP3 (up to 320 kbps) using the original soundtrack TikTok serves. The result matches the source quality — no re-encoding artifacts.",
  },
  {
    question: "Is the TikTok to MP3 converter free?",
    answer:
      "Yes, 100% free with no daily limit, no popups, no watermark, and no account required. Convert as many TikTok videos to MP3 as you want.",
  },
  {
    question: "Can I convert TikTok to MP3 on iPhone?",
    answer:
      "Yes. Anytt cc runs entirely in Safari or Chrome on iPhone. Paste the TikTok link, tap Convert, and save the MP3 to Files or your Music app — no app install needed.",
  },
  {
    question: "Can I convert TikTok to MP3 on Android?",
    answer:
      "Yes. On Android, tap Share on the TikTok video, copy the link, paste it into Anytt cc, and the MP3 downloads straight to your Downloads folder.",
  },
  {
    question: "Does the converter work for TikTok sounds and songs?",
    answer:
      "Yes. Anytt cc extracts whatever audio track is playing in the TikTok — original sound, viral song, voiceover, or remix — and converts it to MP3.",
  },
  {
    question: "How is this different from your TikTok to MP3 downloader page?",
    answer:
      "Both use the same engine. This page is optimized for people searching for a 'converter' — the MP3 output, bitrate, and file naming controls are the same as our main TikTok to MP3 tool.",
  },
  {
    question: "Can I batch convert multiple TikToks to MP3?",
    answer:
      "Yes. Switch to Batch mode and paste multiple TikTok URLs — Anytt cc converts each one and gives you an MP3 download button per video.",
  },
];

const TikTokMp3Converter = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="TikTok to MP3 Converter — Convert TikTok Audio to MP3 Free | Anytt cc"
      description="Convert TikTok videos to MP3 audio in 320 kbps — free, fast, no watermark, no signup. TikTok MP3 converter for iPhone, Android and PC."
      canonicalUrl={`${BASE_URL}/tiktok-mp3-converter`}
      keywords={`tiktok mp3 converter, tiktok to mp3 converter, convert tiktok to mp3, tiktok audio converter, tiktok mp3 online, tiktok sound to mp3, tiktok song to mp3, tiktok music converter, tiktok mp3 320kbps, tiktok mp3 free, tiktok video to audio, tiktok to mp3 iphone, tiktok to mp3 android, ${seoConfig.tiktok.keywords}`}
      jsonLd={[
        getWebApplicationSchema(),
        getHowToSchema("TikTok"),
        getFAQSchema(faqs),
        getBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "TikTok to MP3 Converter", url: `${BASE_URL}/tiktok-mp3-converter` },
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
          <Breadcrumb items={[{ label: "TikTok to MP3 Converter" }]} />
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
              <span className="font-medium">🎧 320 kbps MP3 • No watermark • Free</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
            <span className="gradient-text">TikTok to MP3</span>
            <br className="md:hidden" />
            <span className="text-foreground"> Converter</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-base md:text-lg">
            Convert any TikTok video to high-quality 320 kbps MP3 in seconds —
            free, no watermark, no signup, no popups.
          </p>
          <PlatformDownloader
            platform="tiktok"
            platformName="TikTok"
            platformIcon="🎧"
            functionName="tiktok-download"
            placeholder="Paste TikTok video link to convert to MP3..."
            batchPlaceholder="Paste TikTok URLs here 🎧&#10;One per line, up to 100 audios!"
            accentColor="primary"
            hideHeading
            customSubtitle="Convert TikTok videos to 320 kbps MP3 — no watermark, free forever"
          />
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
            <span className="gradient-text">TikTok MP3 Converter</span> FAQ
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
            What is <span className="gradient-text">Anytt cc</span> TikTok to MP3 Converter?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Anytt cc TikTok to MP3 Converter turns any TikTok video into a
              clean 320 kbps MP3 file in seconds. Paste the link, pick MP3,
              download — no watermark, no signup, no ads. It's the fastest way
              to save viral TikTok sounds, original audio, remixes, or full
              songs for offline listening.
            </p>
            <p>
              We extract the original audio track TikTok stores for each video
              — no re-encoding, no compression artifacts. Files are named after
              the creator so your music library stays organized.
            </p>
            <p>
              This is the "converter" companion to our{" "}
              <Link to="/tiktok-to-mp3-downloader" className="text-primary underline">TikTok to MP3 downloader</Link>
              . Same engine, optimized for search intent around audio
              conversion. Use whichever page you found first.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
          <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
            <Link to="/tiktok-to-mp3-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🎵</span><span className="font-semibold">TikTok to MP3 Downloader</span>
            </Link>
            <Link to="/tiktok-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors">
              <span className="text-xl">📥</span><span className="font-semibold">TikTok Video Downloader</span>
            </Link>
            <Link to="/tiktok-to-mov-converter" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🎬</span><span className="font-semibold">TikTok to MOV</span>
            </Link>
          </nav>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TikTokMp3Converter;
