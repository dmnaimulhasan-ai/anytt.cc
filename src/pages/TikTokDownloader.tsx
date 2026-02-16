import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SEOHead from "@/components/SEOHead";
import PlatformDownloader from "@/components/PlatformDownloader";
import NativeBanner from "@/components/ads/NativeBanner";
import BannerAd from "@/components/ads/BannerAd";
import { Link } from "react-router-dom";
import {
  seoConfig, 
  BASE_URL, 
  getVideoObjectSchema, 
  getFAQSchema, 
  getWebApplicationSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  tiktokKeywords,
  banglaKeywords
} from "@/lib/seo-config";

const tiktokFaqs = [
  {
    question: "How do I download TikTok videos without watermark using Anytt cc?",
    answer: "Simply paste the TikTok video URL into Anytt cc and click download. Your video will be saved without the TikTok watermark in HD quality. Anytt cc makes it easy!"
  },
  {
    question: "Is Anytt cc better than SnapTik or SssTikTok?",
    answer: "Yes! Anytt cc is the best snaptik alternative and ssstiktok alternative. Download TikTok videos without watermark in HD quality - no app or registration required. Better than snap tik, ssstik, or tikmate!"
  },
  {
    question: "Is the Anytt cc TikTok downloader free?",
    answer: "Yes, Anytt cc TikTok video downloader is 100% free with no hidden fees, subscriptions, or limits on downloads. Use anytt cc unlimited times!"
  },
  {
    question: "Does Anytt cc work on iPhone and Android?",
    answer: "Yes, Anytt cc TikTok downloader works on all devices including iPhone, Android phones, tablets, and desktop computers. Access anytt.cc from any browser!"
  },
  {
    question: "How does the TikTok watermark remover work?",
    answer: "Anytt cc automatically removes TikTok watermarks and logos. Just paste your TikTok link and download video without watermark instantly - works like a tiktok logo remover!"
  },
  {
    question: "Can I use ss tiktok or tt downloader features here?",
    answer: "Absolutely! Anytt cc provides all ss tiktok and tt downloader features - download TikTok no watermark, save videos in HD, and convert to MP3. Better than sss tiktok!"
  },
  {
    question: "Can I download TikTok audio/music only with Anytt cc?",
    answer: "Yes, you can download just the audio/music from TikTok videos as MP3 files using Anytt cc downloader. Works as a tiktok mp3 downloader and tiktok to mp4 converter!"
  },
  {
    question: "Is Anytt cc safe to use?",
    answer: "Absolutely! Anytt cc doesn't require any registration or personal information. We don't store any of your data. Anytt cc is 100% safe and secure."
  },
  // New FAQ entries for expanded keywords
  {
    question: "Can I download TikTok slideshows and carousels with Anytt cc?",
    answer: "Yes! Anytt cc supports TikTok slideshow downloads. You can save TikTok slideshow as individual photos or download TikTok carousel images in high quality. Works as a slideshow saver and carousel downloader!"
  },
  {
    question: "Does Anytt cc support TikTok 4K and HD 1080p downloads?",
    answer: "Yes, Anytt cc downloads TikTok videos in the highest available quality — up to 4K and HD 1080p without watermark. It's the best TikTok 4K video saver free online!"
  },
  {
    question: "Can I download TikTok live streams and stories?",
    answer: "Anytt cc supports downloading TikTok stories and clips. For live stream recordings that have been saved by the creator, you can download them using Anytt cc. TikTok story downloader no watermark 2026!"
  },
  {
    question: "Does Anytt cc support TikTok photo mode downloads?",
    answer: "Yes! Anytt cc works with TikTok photo mode content. You can download TikTok carousel as mp4 or save individual photos. TikTok photo mode downloader online — free and fast!"
  },
  {
    question: "Can I download TikTok videos with captions and metadata?",
    answer: "Anytt cc downloads TikTok clips with original captions preserved. For metadata extraction, videos are saved with their full original quality. TikTok video metadata extractor free!"
  },
  {
    question: "Can I use Anytt cc for CapCut editing or YouTube Shorts?",
    answer: "Absolutely! Download TikTok videos with Anytt cc and use them in CapCut, Premiere Pro, or re-upload as YouTube Shorts. TikTok downloader for CapCut editing — perfect for content creators!"
  },
  {
    question: "How to download TikTok video without app?",
    answer: "With Anytt cc, you don't need any app! Just open anytt.cc in your browser, paste the TikTok link, and download. Works on Android 15, iPhone, PC, Mac — no app installation needed!"
  }
];

const TikTokDownloader = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoConfig.tiktok.title}
        description={seoConfig.tiktok.description}
        canonicalUrl={`${BASE_URL}/tiktok-downloader`}
        keywords={seoConfig.tiktok.keywords}
        jsonLd={[
          getWebApplicationSchema(),
          getVideoObjectSchema("TikTok"),
          getHowToSchema("TikTok"),
          getFAQSchema(tiktokFaqs),
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "TikTok Downloader", url: `${BASE_URL}/tiktok-downloader` }
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
            <Breadcrumb items={[{ label: "TikTok Downloader" }]} />
            
            <PlatformDownloader
              platform="tiktok"
              platformName="TikTok"
              platformIcon="🎵"
              functionName="tiktok-download"
              placeholder="Paste TikTok link..."
              batchPlaceholder="Paste TikTok URLs here 💕&#10;One per line, up to 100 videos!"
              accentColor="primary"
            />
          </div>
        </section>

        {/* Native Banner Ad */}
        <NativeBanner />

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              <span className="gradient-text">Anytt cc</span> TikTok Downloader FAQ
            </h2>
            <div className="space-y-4">
              {tiktokFaqs.map((faq, index) => (
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

        {/* What is Anytt cc - Descriptive Content Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black font-display text-center mb-8">
              What is <span className="gradient-text">Anytt cc</span> TikTok Downloader?
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Anytt cc is a free online TikTok video downloader that lets you save TikTok videos without watermark in HD quality. Whether you want to download TikTok videos to your iPhone, Android phone, or computer, Anytt cc makes it fast and easy — no app installation or account registration required.
              </p>
              <p>
                Unlike other TikTok downloaders like SnapTik, SssTikTok, or TikMate, Anytt cc removes the TikTok watermark automatically and delivers videos in their original 1080p HD resolution. You can also extract audio from any TikTok video as an MP3 file, making it perfect for saving trending sounds and music. Anytt cc supports batch downloading of up to 100 videos at once, saving you time when you need to download multiple TikTok clips.
              </p>
              <p>
                Anytt cc is completely free with no hidden fees, no daily limits, and no annoying pop-ups. Just paste your TikTok link, click download, and your video is ready in seconds. It works on any device with a web browser — iPhone, Android, Windows, Mac, and even Chromebook.
              </p>
            </div>
          </div>
        </section>

        {/* Keywords Section - SEO Rich Content */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="gradient-text">Anytt cc</span> - Your Complete TikTok Solution
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Primary Features */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🔥 TikTok Downloader
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.primary.slice(0, 5).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* No Watermark */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  💰 No Watermark
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.highIntent.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audio/MP3 */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎵 TikTok MP3 Download
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.audioExtended.slice(0, 5).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slideshow & Carousel */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🖼️ Slideshow & Carousel
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.slideshow.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Mode */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📸 Photo Mode
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.photoMode.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live & Story */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎬 Live & Story
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.liveAndStory.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4K Ultra HD */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎥 4K Ultra HD
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.hdAnd4k.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trending & SEO */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📈 Trending & SEO
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.trending.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Captions & Metadata */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  📋 Captions & Metadata
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.metadata.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Device Support */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🌍 Works Everywhere
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.device.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🚀 Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.feature.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Long-tail */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  🎯 HD Quality
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tiktokKeywords.longTail.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad */}
        <BannerAd />

        {/* Popular TikTok Searches - SEO Keywords Section */}
        <section className="py-10 px-4 bg-muted/10 border-t border-border/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular TikTok Downloads</h3>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/60 leading-relaxed">
              <span>snaptik alternative</span><span>•</span>
              <span>ssstiktok download</span><span>•</span>
              <span>tiktok no watermark download</span><span>•</span>
              <span>ss tiktok downloader</span><span>•</span>
              <span>tt video downloader</span><span>•</span>
              <span>tiktok watermark remover</span><span>•</span>
              <span>snap tik</span><span>•</span>
              <span>ssstik</span><span>•</span>
              <span>tikmate</span><span>•</span>
              <span>save tiktok video</span><span>•</span>
              <span>tiktok saver</span><span>•</span>
              <span>musicallydown</span><span>•</span>
              <span>tiktok to mp4</span><span>•</span>
              <span>download tiktok hd</span><span>•</span>
              <span>tiktok mp3</span><span>•</span>
              <span>4k tokkit</span><span>•</span>
              <span>savett</span><span>•</span>
              <span>tiktok dl</span><span>•</span>
              <span>tiktok reels download</span><span>•</span>
              <span>tiktok slideshow download</span><span>•</span>
              <span>tiktok to gif</span><span>•</span>
              <span>how to download tiktok</span><span>•</span>
              <span>tiktok download 1080p</span><span>•</span>
              <span>tiktok story download</span><span>•</span>
              <span>tiktok live download</span><span>•</span>
              <span>tiktok photo download</span><span>•</span>
              <span>tiktok grabber</span><span>•</span>
              <span>snaptik pro</span><span>•</span>
              <span>free tiktok downloader</span><span>•</span>
              <span>online tiktok video downloader</span><span>•</span>
              {/* Short golden keywords */}
              <span>TikTok mp3</span><span>•</span>
              <span>TikTok photos</span><span>•</span>
              <span>No watermark</span><span>•</span>
              <span>TikTok slideshow</span><span>•</span>
              <span>TikTok story</span><span>•</span>
              <span>TikTok clips</span><span>•</span>
              <span>TikTok audio</span><span>•</span>
              <span>Save TikTok</span><span>•</span>
              <span>TikTok live</span><span>•</span>
              <span>TikTok HD</span><span>•</span>
              <span>TikTok saver</span><span>•</span>
              <span>TikTok downloader</span><span>•</span>
              <span>TikTok watermark</span><span>•</span>
              <span>TikTok 4K</span><span>•</span>
              <span>TikTok metadata</span><span>•</span>
              <span>TikTok carousel</span><span>•</span>
              <span>TikTok captions</span><span>•</span>
              <span>TikTok song</span><span>•</span>
              <span>TikTok voiceover</span><span>•</span>
              <span>TikTok draft</span><span>•</span>
              <span>TikTok profile</span><span>•</span>
              <span>TikTok trends</span><span>•</span>
              <span>TikTok music</span><span>•</span>
              <span>TikTok trending</span><span>•</span>
              <span>TikTok search</span><span>•</span>
              <span>TikTok hashtags</span><span>•</span>
              <span>TikTok algorithm</span><span>•</span>
              <span>TikTok SEO</span><span>•</span>
              <span>TikTok video</span><span>•</span>
              <span>Photo mode</span><span>•</span>
              <span>TikTok logo</span><span>•</span>
              <span>TikTok rewatch</span><span>•</span>
              <span>TikTok views</span><span>•</span>
              <span>TikTok app</span><span>•</span>
              {/* Long-tail golden keywords */}
              <span>photo mode download</span><span>•</span>
              <span>save TikTok slideshow</span><span>•</span>
              <span>TikTok HD 1080p</span><span>•</span>
              <span>TikTok song download</span><span>•</span>
              <span>slideshow saver</span><span>•</span>
              <span>TikTok clips download</span><span>•</span>
              <span>TikTok audio extractor</span><span>•</span>
              <span>TikTok for CapCut</span><span>•</span>
              <span>download TikTok carousel as mp4</span><span>•</span>
              <span>TikTok mp3 320kbps</span><span>•</span>
              <span>TikTok video downloader for Android 15</span><span>•</span>
              <span>TikTok background music downloader</span><span>•</span>
              <span>TikTok video downloader HD 1080p no watermark</span><span>•</span>
              <span>Save TikTok slideshow as individual photos</span><span>•</span>
              <span>Download TikTok carousel images high quality</span><span>•</span>
              <span>TikTok story downloader no watermark 2026</span><span>•</span>
              <span>TikTok 4K video saver free online</span><span>•</span>
              <span>Save TikTok slideshow with music mp4</span><span>•</span>
              <span>TikTok no watermark downloader for PC</span><span>•</span>
              <span>TikTok photo mode downloader online</span><span>•</span>
              <span>Download TikTok live stream recording</span><span>•</span>
              <span>TikTok video metadata extractor free</span><span>•</span>
              <span>Download TikTok video with subtitles srt</span><span>•</span>
              <span>Bulk download TikTok videos by hashtag</span><span>•</span>
              <span>Download TikTok clips with original captions</span><span>•</span>
              <span>TikTok video downloader no logo mac</span><span>•</span>
              <span>TikTok video downloader without survey</span><span>•</span>
              <span>Download TikTok videos for Premiere Pro</span><span>•</span>
              <span>Save TikTok draft videos to gallery</span><span>•</span>
              <span>TikTok video downloader no watermark Linux</span><span>•</span>
              <span>Extract TikTok original sound high quality</span><span>•</span>
              <span>TikTok sound downloader to mp3 320kbps</span><span>•</span>
              <span>Download TikTok song without video</span><span>•</span>
              <span>Save TikTok trending audio for ringtone</span><span>•</span>
              <span>TikTok music downloader free no app</span><span>•</span>
              <span>TikTok voiceover to text converter free</span><span>•</span>
              <span>Download TikTok mp3 original sound only</span><span>•</span>
              <span>TikTok background music downloader online</span><span>•</span>
              <span>Convert TikTok to mp3 high resolution</span><span>•</span>
              <span>TikTok downloader for CapCut editing</span><span>•</span>
              <span>TikTok video downloader for YouTube Shorts</span><span>•</span>
              <span>How to download TikTok video without app</span><span>•</span>
              <span>Can I download TikTok slideshow as video</span><span>•</span>
              <span>Best way to download TikTok mp3 original</span><span>•</span>
              <span>Save TikTok profile picture full size</span><span>•</span>
              <span>Save TikTok videos to Google Drive</span><span>•</span>
              <span>Save TikTok videos for offline viewing app</span><span>•</span>
              {/* Format keywords */}
              <span>MP4 downloader</span><span>•</span>
              <span>MP3 extractor</span><span>•</span>
              <span>HD 1080p</span><span>•</span>
              <span>4K downloader</span><span>•</span>
              <span>fast downloader</span><span>•</span>
              <span>no login</span><span>•</span>
              <span>bulk save</span><span>•</span>
              <span>media saver</span><span>•</span>
              <span>video converter</span><span>•</span>
              <span>audio only</span><span>•</span>
              <span>high res</span><span>•</span>
              <span>one click</span><span>•</span>
              <span>free online</span><span>•</span>
              <span>slideshow saver</span><span>•</span>
              <span>metadata tool</span><span>•</span>
              {/* Bangla keywords */}
              <span>টিকটক ভিডিও</span><span>•</span>
              <span>লোগো ছাড়া</span><span>•</span>
              <span>ভিডিও ডাউনলোড</span><span>•</span>
              <span>টিকটক এমপি৩</span><span>•</span>
              <span>ওয়াটারমার্ক ছাড়া</span><span>•</span>
              <span>লোগো রিমুভ</span><span>•</span>
              <span>সেভ ভিডিও</span><span>•</span>
              <span>টিকটক গান</span><span>•</span>
              <span>এইচডি ভিডিও</span><span>•</span>
              <span>ফ্রি ডাউনলোড</span><span>•</span>
              <span>টিকটক সেভার</span><span>•</span>
              <span>টিকটক লোগো</span><span>•</span>
              <span>ডাউনলোড অ্যাপ</span><span>•</span>
              {/* Bangla transliterated */}
              <span>TikTok video download kivabe kore</span><span>•</span>
              <span>no watermark TikTok download bangla</span><span>•</span>
              <span>watermark chara TikTok download korar site</span><span>•</span>
              <span>TikTok mp3 download bangla tutorial</span><span>•</span>
              <span>HD quality TikTok download kivabe kore</span><span>•</span>
              <span>TikTok photo download bangla trick</span><span>•</span>
              <span>TikTok video download link sorasori</span><span>•</span>
              <span>TikTok watermark remover bangla site</span><span>•</span>
              <span>TikTok story download bangla free</span><span>•</span>
              <span>TikTok theke audio download korar niyom</span><span>•</span>
              <span>HD video download korar best site</span><span>•</span>
              <span>mobile gallery-te TikTok save korar upay</span><span>•</span>
              <span>online-e video download korar sahaj niyom</span>
            </div>
          </div>
        </section>

        {/* Internal Links - SEO optimized with proper anchors */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">Explore More</h2>
            <nav className="flex flex-wrap justify-center gap-4" aria-label="Related tools">
              <Link 
                to="/blog" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-primary/30 hover:border-primary/60 transition-colors"
                title="Read our video download guides"
              >
                <span className="font-semibold">📚 Guides & Tutorials</span>
              </Link>
              <Link 
                to="/faq" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border border-secondary/30 hover:border-secondary/60 transition-colors"
                title="Frequently asked questions about TikTok downloading"
              >
                <span className="font-semibold">❓ FAQ</span>
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TikTokDownloader;