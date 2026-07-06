import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import { Link } from "react-router-dom";
import {
  seoConfig,
  BASE_URL,
  getFAQSchema,
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-config";

const slideshowFaqs = [
  {
    question: "How do I download a TikTok slideshow with Anytt cc?",
    answer:
      "Copy the URL of any TikTok photo mode post or carousel, paste it into Anytt cc, and click download. We detect the slideshow automatically and let you save every image in the original HD quality — no watermark, no signup.",
  },
  {
    question: "Can I download all photos from a TikTok slideshow at once?",
    answer:
      "Yes. Anytt cc TikTok slideshow downloader fetches every image in the carousel in a single request. You can save the full photo set with one click instead of screenshotting each slide.",
  },
  {
    question: "Are TikTok slideshow photos downloaded without watermark?",
    answer:
      "Absolutely. Anytt cc extracts the clean original JPG/PNG files from TikTok photo mode, so your images stay watermark-free and ready to repost or edit.",
  },
  {
    question: "Does the TikTok photo downloader work on iPhone and Android?",
    answer:
      "Yes. Anytt cc works entirely in your browser on iPhone, Android, iPad, Windows, and Mac. No app installation is needed to download TikTok photos or slideshows.",
  },
  {
    question: "What image quality do I get from the TikTok image downloader?",
    answer:
      "Anytt cc grabs the highest-resolution image TikTok stores for each slide, typically 1080p or higher. You get the same crisp quality the creator uploaded.",
  },
  {
    question: "Can I also download the background music from a slideshow?",
    answer:
      "Yes. Along with the photos, Anytt cc lets you save the slideshow's background audio as an MP3, so you can keep the full experience of the post offline.",
  },
  {
    question: "Is Anytt cc TikTok slideshow downloader free?",
    answer:
      "It is 100% free with no daily limits, no popups, no watermark, and no account required. Download as many TikTok slideshows and photos as you need.",
  },
  {
    question: "Can I batch download multiple TikTok slideshows?",
    answer:
      "Yes. Switch to Batch mode and paste multiple TikTok photo mode links. Anytt cc will process all of them and give you download buttons for each set of images.",
  },
  {
    question: "Is it safe to download TikTok photos with Anytt cc?",
    answer:
      "Yes. Anytt cc does not require login, does not store your links, and runs entirely over HTTPS. It is a safe, ad-free way to save TikTok slideshow photos.",
  },
  {
    question: "Can I download TikTok slideshows for reposting on Instagram or Pinterest?",
    answer:
      "You can save the images for personal use or to remix into your own edits. Please respect the original creator: credit them and only repost when you have permission.",
  },
];

const TikTokSlideshowDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="TikTok Slideshow Downloader — Save Photos & Carousels HD | Anytt cc"
        description="Download TikTok slideshows and photo mode carousels in HD with Anytt cc. Save every image without watermark — free, no signup, works on iPhone, Android & PC."
        canonicalUrl={`${BASE_URL}/tiktok-slideshow-downloader`}
        keywords={`tiktok slideshow downloader, tiktok photo downloader, tiktok image downloader, download tiktok slideshow, tiktok photo mode downloader, tiktok carousel downloader, save tiktok photos, tiktok slideshow saver, tiktok picture downloader, tiktok slideshow to mp4, tiktok photo download no watermark, tiktok slideshow download hd, tiktok images save online, ${seoConfig.tiktok.keywords}`}
        jsonLd={[
          getWebApplicationSchema(),
          getHowToSchema("TikTok"),
          getFAQSchema(slideshowFaqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "TikTok Slideshow Downloader", url: `${BASE_URL}/tiktok-slideshow-downloader` },
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
            <Breadcrumb items={[{ label: "TikTok Slideshow Downloader" }]} />

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full tag-pill text-sm text-foreground">
                <span className="font-medium">🖼️ HD photos • No watermark • Free forever</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black font-display mb-4 text-center leading-tight">
              <span className="gradient-text">TikTok Slideshow</span>
              <br className="md:hidden" />
              <span className="text-foreground"> Downloader</span>
            </h1>

            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-base md:text-lg">
              Save every photo from TikTok photo mode posts and carousels in
              original HD quality — no watermark, no signup, no popups.
            </p>

            <PlatformDownloader
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🖼️"
              functionName="tiktok-download"
              placeholder="Paste TikTok slideshow or photo link..."
              batchPlaceholder="Paste TikTok slideshow URLs here 🖼️&#10;One per line, up to 100 posts!"
              accentColor="primary"
              hideHeading
              customSubtitle="Download TikTok photo mode carousels & slideshows in HD — no watermark"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">TikTok Slideshow</span> Downloader FAQ
            </h2>
            <div className="space-y-4">
              {slideshowFaqs.map((faq, index) => (
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

        {/* What is Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              What is <span className="gradient-text">Anytt cc</span> TikTok Slideshow Downloader?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Anytt cc TikTok Slideshow Downloader is a free online tool that
                lets you save every image from TikTok photo mode posts and
                carousels in full HD. Just paste the link to any public
                slideshow and download all photos in one click — no app, no
                account, no watermark.
              </p>
              <p>
                Unlike screenshotting each slide, Anytt cc extracts the original
                image files TikTok serves to the app, preserving the exact
                resolution, color, and aspect ratio the creator uploaded. You
                also get the option to save the slideshow's background music as
                MP3, so nothing from the post is lost.
              </p>
              <p>
                Anytt cc is a lightweight, ad-free alternative to sites like
                savetik.cc, ssstik and snaptik for TikTok photo downloads. It
                works on iPhone, Android, iPad, Windows, Mac and Chromebook —
                anywhere you have a browser. Use it to build mood boards, save
                inspiration, or archive your favorite creator's photo posts.
              </p>
            </div>
          </div>
        </section>

        {/* Keywords Section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">TikTok Photo & Slideshow</span> — Features
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">🖼️ Slideshow Download</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok slideshow downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok carousel downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok photo mode downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">save tiktok slideshow</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">📷 Photo Download</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok photo downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok image downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">tiktok picture downloader</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">save tiktok images</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">✨ HD Quality</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">full hd</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">original resolution</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no compression</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">clean jpg</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">🚫 No Watermark</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no watermark</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">clean images</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">watermark-free</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">unbranded</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">📱 Any Device</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">iphone</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">android</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">ipad</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">desktop</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">⚡ Fast & Free</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no signup</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">no popups</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">unlimited</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">instant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Searches */}
        <section className="py-10 px-4 bg-muted/10 border-t border-border/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular TikTok Slideshow & Photo Searches</h3>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 leading-relaxed">
              <span>tiktok slideshow downloader</span><span>•</span>
              <span>tiktok photo downloader</span><span>•</span>
              <span>tiktok image downloader</span><span>•</span>
              <span>tiktok photo mode downloader</span><span>•</span>
              <span>tiktok carousel downloader</span><span>•</span>
              <span>save tiktok slideshow</span><span>•</span>
              <span>download tiktok photos</span><span>•</span>
              <span>tiktok picture downloader</span><span>•</span>
              <span>tiktok slideshow saver</span><span>•</span>
              <span>tiktok slideshow to mp4</span><span>•</span>
              <span>tiktok photo download no watermark</span><span>•</span>
              <span>tiktok slideshow hd</span><span>•</span>
              <span>tiktok images save online</span><span>•</span>
              <span>tiktok photo mode without watermark</span><span>•</span>
              <span>batch tiktok photo download</span>
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
                to="/tiktok-to-mp3-downloader"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors"
                title="Convert TikTok videos to MP3 audio"
              >
                <span className="text-xl">🎧</span>
                <span className="font-semibold">TikTok to MP3</span>
              </Link>
              <Link
                to="/tiktok-profile-downloader"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
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

export default TikTokSlideshowDownloader;
