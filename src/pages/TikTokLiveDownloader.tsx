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
    question: "Can I download a TikTok Live stream with Anytt cc?",
    answer:
      "You can save TikTok Live replays and public LIVE recap videos that the creator has published to their profile. Paste the video link and Anytt cc downloads it in HD, without a watermark.",
  },
  {
    question: "Does Anytt cc capture an active TikTok livestream in real time?",
    answer:
      "No. Anytt cc downloads public, already-published LIVE videos and replays that appear as posts on a creator's profile. It does not screen-record an in-progress broadcast — for that you'd use a screen recorder like OBS or your device's built-in recorder.",
  },
  {
    question: "How do I find a TikTok LIVE replay link?",
    answer:
      "Open the creator's profile in the TikTok app or on tiktok.com, find the LIVE recap or saved LIVE video on their feed, tap Share, and copy the link. Paste it into Anytt cc to download.",
  },
  {
    question: "Are TikTok Lives downloaded without a watermark?",
    answer:
      "Yes. Anytt cc extracts the original file, so your download is watermark-free HD — perfect for archives, clips, or reactions.",
  },
  {
    question: "Can I download a TikTok Live on iPhone or Android?",
    answer:
      "Yes. Anytt cc works fully in your browser on iPhone, Android, iPad, and desktop. No app to install and no signup.",
  },
  {
    question: "Can I download private or password-protected TikTok Lives?",
    answer:
      "No. Anytt cc only works with public LIVE replays that anyone can view. We don't bypass privacy settings, and we don't support downloading private, subscriber-only, or gifted-view LIVEs.",
  },
  {
    question: "Is downloading a TikTok LIVE replay free?",
    answer:
      "Yes. Anytt cc is 100% free, with no daily limits, no popups, no ads, and no account required.",
  },
  {
    question: "Can I extract just the audio from a TikTok LIVE?",
    answer:
      "Yes. Use our TikTok to MP3 converter with the LIVE replay link to pull only the audio track as a 320 kbps MP3.",
  },
];

const TikTokLiveDownloader = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="TikTok Live Downloader — Save TikTok LIVE Replays HD | Anytt cc"
      description="Download public TikTok LIVE replays and recap videos in HD — no watermark, no signup, free forever. Works on iPhone, Android and PC."
      canonicalUrl={`${BASE_URL}/tiktok-live-downloader`}
      keywords={`tiktok live downloader, tiktok live download, save tiktok live, tiktok live replay download, download tiktok live video, tiktok livestream downloader, tiktok live recap download, tiktok live saver, tiktok live hd download, tiktok live no watermark, ${seoConfig.tiktok.keywords}`}
      jsonLd={[
        getWebApplicationSchema(),
        getHowToSchema("TikTok"),
        getFAQSchema(faqs),
        getBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "TikTok Live Downloader", url: `${BASE_URL}/tiktok-live-downloader` },
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
          <Breadcrumb items={[{ label: "TikTok Live Downloader" }]} />
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
              <span className="font-medium">🔴 HD LIVE replays • No watermark • Free</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
            <span className="gradient-text">TikTok Live</span>
            <br className="md:hidden" />
            <span className="text-foreground"> Downloader</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-base md:text-lg">
            Save public TikTok LIVE replays and recap videos in HD — no
            watermark, no signup, free forever. Works on iPhone, Android & PC.
          </p>
          <PlatformDownloader
            platform="tiktok"
            platformName="TikTok"
            platformIcon="🔴"
            functionName="tiktok-download"
            placeholder="Paste TikTok LIVE replay link..."
            batchPlaceholder="Paste TikTok LIVE URLs here 🔴&#10;One per line, up to 100 replays!"
            accentColor="primary"
            hideHeading
            customSubtitle="Download public TikTok LIVE replays in HD — no watermark, free"
          />
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
            <span className="gradient-text">TikTok Live</span> Downloader FAQ
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
            What is <span className="gradient-text">Anytt cc</span> TikTok Live Downloader?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Anytt cc TikTok Live Downloader lets you save public TikTok LIVE
              replays and recap videos in HD, without a watermark. Paste the
              link from a creator's profile and Anytt cc extracts the original
              file in one click — no app, no account, no popups.
            </p>
            <p>
              It works only with LIVEs the creator has published publicly on
              their profile (LIVE replays, LIVE recaps, and highlight clips).
              Anytt cc does not record active broadcasts and does not bypass
              private, subscriber-only, or restricted streams.
            </p>
            <p>
              Use it to archive your own LIVEs, save reaction moments, or clip
              highlights for repurposing on YouTube Shorts, Reels, or Twitch —
              always respecting the creator's rights.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
          <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
            <Link to="/tiktok-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">📥</span><span className="font-semibold">TikTok Video Downloader</span>
            </Link>
            <Link to="/tiktok-story-downloader" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors">
              <span className="text-xl">📖</span><span className="font-semibold">Story Downloader</span>
            </Link>
            <Link to="/tiktok-mp3-converter" className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors">
              <span className="text-xl">🎧</span><span className="font-semibold">TikTok to MP3</span>
            </Link>
          </nav>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default TikTokLiveDownloader;
