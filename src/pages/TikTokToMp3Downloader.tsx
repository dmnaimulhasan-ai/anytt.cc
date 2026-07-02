import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import { Link } from "react-router-dom";
import {
  seoConfig,
  BASE_URL,
  getVideoObjectSchema,
  getFAQSchema,
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-config";

const mp3Faqs = [
  {
    question: "How do I convert TikTok videos to MP3 with Anytt cc?",
    answer: "Paste any TikTok video URL into Anytt cc, click download, then select the 'Download Audio Only' button. We extract the original high-quality audio and save it as an MP3 file instantly — no watermark, no registration required."
  },
  {
    question: "Is the TikTok to MP3 conversion free?",
    answer: "Yes, Anytt cc TikTok to MP3 downloader is 100% free with no hidden fees, subscriptions, or daily limits. Convert as many TikTok videos to MP3 as you want."
  },
  {
    question: "What quality is the extracted MP3 audio?",
    answer: "Anytt cc extracts the original TikTok audio track at the highest available bitrate, up to 320kbps MP3. You get crystal-clear sound perfect for ringtones, playlists, or offline listening."
  },
  {
    question: "Does Anytt cc work as a TikTok sound downloader?",
    answer: "Absolutely! Anytt cc is the best TikTok sound downloader online. Save trending sounds, background music, voiceovers, and original audio from any public TikTok video as a high-quality MP3 file."
  },
  {
    question: "Can I download TikTok music on iPhone and Android?",
    answer: "Yes, Anytt cc TikTok MP3 downloader works on all devices including iPhone, Android, tablets, and desktop computers. Just open anytt.cc in your browser and paste the TikTok link."
  },
  {
    question: "Is it legal to download TikTok audio as MP3?",
    answer: "Downloading TikTok audio for personal offline use is generally permitted. You should not redistribute or use the audio commercially without the creator's permission. Anytt cc provides downloads for personal use only."
  },
  {
    question: "Can I use Anytt cc as a TikTok ringtone downloader?",
    answer: "Yes! Extract any TikTok audio with Anytt cc, download the MP3, then set it as your ringtone on iPhone or Android. It's the easiest way to turn viral TikTok sounds into custom ringtones."
  },
  {
    question: "Does Anytt cc remove watermarks from the audio too?",
    answer: "TikTok watermarks are visual overlays on videos, so they don't affect audio. Anytt cc extracts the clean original audio track directly from TikTok, giving you pristine MP3 files every time."
  },
  {
    question: "Can I batch download TikTok audio as MP3?",
    answer: "Yes! Switch to Batch mode, paste up to 100 TikTok URLs, and Anytt cc will process them all. You can then download each audio track individually as an MP3 file."
  },
  {
    question: "Is Anytt cc safe to use for TikTok MP3 downloads?",
    answer: "Absolutely! Anytt cc doesn't require any registration or personal information. We don't store your data. It's 100% safe and secure for converting TikTok to MP3."
  }
];

const TikTokToMp3Downloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="TikTok to MP3 Downloader — Free Audio Extractor | Anytt cc"
        description="Convert TikTok videos to MP3 for free with Anytt cc. Extract high-quality audio, trending sounds & music without watermark. Works on iPhone, Android & PC — no signup needed."
        canonicalUrl={`${BASE_URL}/tiktok-to-mp3-downloader`}
        keywords={`tiktok to mp3, tiktok mp3 downloader, convert tiktok to mp3, download tiktok audio, tiktok sound downloader, tiktok music download, extract tiktok audio, tiktok audio downloader, tiktok mp3 converter, tiktok to mp3 free, save tiktok sound as mp3, tiktok ringtone downloader, tiktok background music downloader, ${seoConfig.tiktok.keywords}`}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(mp3Faqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "TikTok to MP3 Downloader", url: `${BASE_URL}/tiktok-to-mp3-downloader` }
          ])
        ]}
      />
      <Header />
      <main>
        <section className="hero-gradient min-h-[65vh] py-8 md:py-12 pb-16 md:pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="floating-blob blob-1" />
          <div className="floating-blob blob-2" />
          <div className="floating-blob blob-3" />

          <div className="container mx-auto relative z-10">
            <Breadcrumb items={[{ label: "TikTok to MP3 Downloader" }]} />

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
                <span className="font-medium">🎵 High-quality MP3 • No watermark • Free forever</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
              <span className="gradient-text">TikTok to MP3</span>
              <br className="md:hidden" />
              <span className="text-foreground"> Downloader</span>
            </h1>

            <PlatformDownloader
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Paste TikTok link to extract audio..."
              batchPlaceholder="Paste TikTok URLs here 💕&#10;One per line, up to 100 videos!"
              accentColor="primary"
              hideHeading
              customSubtitle="Extract high-quality audio from TikTok videos as MP3 — no watermark, no signup"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">TikTok to MP3</span> FAQ
            </h2>
            <div className="space-y-4">
              {mp3Faqs.map((faq, index) => (
                <details key={index} className="glass-card rounded-2xl p-5 group">
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

        {/* What is TikTok to MP3 - Descriptive Content Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              What is <span className="gradient-text">Anytt cc</span> TikTok to MP3 Downloader?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Anytt cc TikTok to MP3 Downloader is a free online tool that lets you extract audio from any TikTok video and save it as a high-quality MP3 file. Whether you want to save trending sounds, background music, voiceovers, or original audio tracks, Anytt cc makes it fast and easy — no app installation or account registration required.
              </p>
              <p>
                Unlike other converters, Anytt cc extracts the original audio track directly from TikTok, preserving the full quality up to 320kbps. You can also download the video without watermark if you prefer the full MP4. Anytt cc supports batch processing of up to 100 videos at once, saving you time when you need multiple audio tracks.
              </p>
              <p>
                Anytt cc is completely free with no hidden fees, no daily limits, and no annoying pop-ups. Just paste your TikTok link, click download, and your MP3 is ready in seconds. It works on any device with a web browser — iPhone, Android, Windows, Mac, and even Chromebook.
              </p>
            </div>
          </div>
        </section>

        {/* Keywords Section - SEO Rich Content */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">TikTok to MP3</span> — Keywords & Features
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎵 TikTok MP3 Download
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok to mp3</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok mp3 downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">convert tiktok to mp3</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok audio download</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok sound downloader</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🔊 High Quality Audio
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">320kbps mp3</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">original sound</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no quality loss</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">crystal clear</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📱 Works Everywhere
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">iphone mp3</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">android audio</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">pc converter</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">mac compatible</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🔔 Ringtones & Sounds
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok ringtone</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">viral sound mp3</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">trending audio</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">background music</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  ⚡ Fast & Free
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no signup</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no watermark</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">unlimited</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">instant download</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎤 Voiceovers & Music
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">voiceover extract</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">music only</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">song downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">audio extractor</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular TikTok MP3 Searches - SEO Keywords Section */}
        <section className="py-10 px-4 bg-muted/10 border-t border-border/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular TikTok to MP3 Searches</h3>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 leading-relaxed">
              <span>tiktok to mp3</span><span>•</span>
              <span>tiktok mp3 downloader</span><span>•</span>
              <span>convert tiktok to mp3</span><span>•</span>
              <span>download tiktok audio</span><span>•</span>
              <span>tiktok sound downloader</span><span>•</span>
              <span>tiktok music download</span><span>•</span>
              <span>extract tiktok audio</span><span>•</span>
              <span>tiktok audio downloader</span><span>•</span>
              <span>tiktok mp3 converter</span><span>•</span>
              <span>tiktok to mp3 free</span><span>•</span>
              <span>save tiktok sound as mp3</span><span>•</span>
              <span>tiktok ringtone downloader</span><span>•</span>
              <span>tiktok background music downloader</span><span>•</span>
              <span>tiktok song downloader</span><span>•</span>
              <span>tiktok voiceover to mp3</span><span>•</span>
              <span>tiktok trending audio mp3</span><span>•</span>
              <span>tiktok original sound download</span><span>•</span>
              <span>tiktok mp3 320kbps</span><span>•</span>
              <span>tiktok audio extractor online</span><span>•</span>
              <span>tiktok to mp3 iphone</span><span>•</span>
              <span>tiktok to mp3 android</span><span>•</span>
              <span>batch tiktok mp3 download</span>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 px-4 bg-muted/20 border-t border-border/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Related downloader tools">
              <Link
                to="/tiktok-downloader"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
                title="Download TikTok videos without watermark"
              >
                <span className="text-xl">🎵</span>
                <span className="font-semibold">TikTok Video Downloader</span>
              </Link>
              <Link
                to="/tiktok-profile-downloader"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors"
                title="Download all videos from a TikTok profile"
              >
                <span className="text-xl">👤</span>
                <span className="font-semibold">Profile Downloader</span>
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TikTokToMp3Downloader;
