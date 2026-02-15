import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getFAQSchema, getOrganizationSchema } from "@/lib/seo-config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const pinterestFaqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is the AnyTT Pinterest Video Downloader?",
        answer: "AnyTT Pinterest Downloader is a free online tool that lets you download Pinterest videos, Idea Pins, and Story Pins in HD quality. No app or registration required."
      },
      {
        question: "Is the Pinterest downloader free?",
        answer: "Yes, AnyTT is 100% free with no hidden fees, subscriptions, or download limits. You can download unlimited Pinterest videos without paying anything."
      },
      {
        question: "Do I need a Pinterest account to download?",
        answer: "No, you don't need a Pinterest account to use AnyTT. Simply copy the video link and paste it on our site to download."
      },
      {
        question: "Is it safe to download Pinterest videos?",
        answer: "Yes, AnyTT is completely safe. We don't require any personal information, don't install anything on your device, and don't store your download history."
      }
    ]
  },
  {
    category: "Pinterest Downloads",
    questions: [
      {
        question: "How do I download Pinterest videos?",
        answer: "Copy the Pinterest video link from the app or website, paste it into AnyTT, and click Download. The video will be saved in HD quality to your device."
      },
      {
        question: "Can I download Pinterest Idea Pins?",
        answer: "Yes! AnyTT supports Idea Pins (formerly Story Pins). Just copy the Idea Pin link and paste it to download the video content."
      },
      {
        question: "Can I download Pinterest Story Pins?",
        answer: "Yes, Story Pins (now called Idea Pins) can be downloaded using AnyTT. The process is the same as downloading regular video pins."
      },
      {
        question: "Why does it say 'No video found'?",
        answer: "This usually means the pin is an image, not a video. Make sure the pin has a play button or video indicator. Only video pins can be downloaded as videos."
      },
      {
        question: "Can I download private Pinterest pins?",
        answer: "No, only public Pinterest pins can be downloaded. Private boards and pins require the owner's permission to access."
      },
      {
        question: "Can I download from pin.it short links?",
        answer: "Yes! AnyTT automatically resolves Pinterest short links (pin.it) to their full URLs and downloads the video content."
      }
    ]
  },
  {
    category: "Device Support",
    questions: [
      {
        question: "Does it work on iPhone/iPad?",
        answer: "Yes! AnyTT works on all iOS devices using Safari. After downloading, videos are saved to your Files app. You can then move them to Photos."
      },
      {
        question: "Does it work on Android?",
        answer: "Yes, AnyTT works perfectly on Android phones and tablets using Chrome or any browser. Videos are saved to your Downloads folder or Gallery."
      },
      {
        question: "Can I download Pinterest videos on PC/Mac?",
        answer: "Absolutely! AnyTT works on any computer with a web browser. Just paste the link and save the video to your preferred location."
      },
      {
        question: "Do I need to install an app?",
        answer: "No app installation required! AnyTT works entirely in your web browser on any device - mobile, tablet, or desktop."
      }
    ]
  },
  {
    category: "Quality & Format",
    questions: [
      {
        question: "What video quality is available?",
        answer: "AnyTT downloads Pinterest videos in the highest available quality, typically HD (720p or 1080p) depending on the original upload."
      },
      {
        question: "What file format are the downloads?",
        answer: "Videos are downloaded in MP4 format, which is compatible with virtually all devices and video players."
      },
      {
        question: "Can I download Pinterest GIFs?",
        answer: "Yes, animated content from Pinterest can be downloaded. GIF-style pins are typically saved as short video clips."
      },
      {
        question: "Why is my video quality lower than expected?",
        answer: "Download quality depends on the original upload. If the creator uploaded in lower quality, the download will match that quality."
      }
    ]
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        question: "Why isn't my download working?",
        answer: "Common issues include: the pin being an image (not video), invalid URL, or the pin being deleted/private. Try copying the full URL directly from your browser."
      },
      {
        question: "The video won't play after downloading",
        answer: "Make sure you have a compatible video player. MP4 files work on most devices. Try VLC player if your default player doesn't work."
      },
      {
        question: "Download is taking too long",
        answer: "Download speed depends on your internet connection and video file size. Longer videos take more time. Try during off-peak hours for faster speeds."
      },
      {
        question: "How do I find the Pinterest video link?",
        answer: "In the Pinterest app, tap Share on the pin and select 'Copy Link'. On desktop, copy the URL from your browser's address bar while viewing the pin."
      }
    ]
  },
  {
    category: "Boards, Carousels & Bulk",
    questions: [
      {
        question: "Can I download an entire Pinterest board at once?",
        answer: "AnyTT supports bulk downloading. Use our batch mode to paste multiple pin URLs from a board and download them all at once. It works as a Pinterest board bulk downloader — save entire Pinterest board to gallery!"
      },
      {
        question: "Does AnyTT support Pinterest carousel downloads?",
        answer: "Yes! AnyTT can download Pinterest carousel content. Simply paste the carousel pin URL and download the video or image content. Pinterest carousel downloader no watermark!"
      },
      {
        question: "How do I bulk download Pinterest pins with titles?",
        answer: "Use AnyTT's batch download feature — paste multiple Pinterest URLs (one per line) and download them all. You can save Pinterest board to zip file for easy organization."
      },
      {
        question: "Can I download Pinterest images for Figma or Shopify?",
        answer: "Yes! Download Pinterest images with AnyTT and use them in Figma for mood boards, in Shopify for product inspiration, or in Canva for designs. Pinterest image downloader for Figma and Shopify!"
      },
      {
        question: "Is there a way to save Pinterest boards for offline use?",
        answer: "AnyTT lets you download Pinterest videos and save them locally for offline viewing. Perfect for saving boards for travel, client presentations, or research projects!"
      },
      {
        question: "Can I download Pinterest GIFs?",
        answer: "Yes! Animated content and GIF-style pins from Pinterest can be downloaded with AnyTT. They are saved as short video clips in MP4 format. Pinterest gif downloader for mobile!"
      }
    ]
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-lg pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-muted-foreground leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const PinterestFAQ = () => {
  const allFaqs = pinterestFaqData.flatMap(cat => cat.questions);

  const pinterestFaqKeywords = [
    "pinterest video downloader faq",
    "pinterest download help",
    "how to download pinterest videos",
    "pinterest downloader questions",
    "pinterest video saver help",
    "download pinterest faq",
    "pinterest idea pin download help",
    "pinterest story pin faq",
    "save pinterest video questions",
    "pinterest download guide",
    "pinterest downloader tutorial",
    "pinterest video download help",
    "anytt pinterest faq",
    "pinterest download troubleshooting",
    "pinterest saver questions"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pinterest FAQ - Pinterest Video Downloader Help & Questions"
        description="Get answers to common questions about downloading Pinterest videos with AnyTT. Learn how to save Idea Pins, Story Pins, and video pins on any device."
        canonicalUrl={`${BASE_URL}/pinterest-faq`}
        keywords={pinterestFaqKeywords.join(", ")}
        jsonLd={[
          getOrganizationSchema(),
          getFAQSchema(allFaqs)
        ]}
      />
      <Header />
      
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">📌</span>
            <h1 className="text-section mb-4">Pinterest Downloader FAQ</h1>
            <p className="text-subhero text-muted-foreground">
              Everything you need to know about downloading Pinterest videos
            </p>
          </div>

          {/* Quick CTA */}
          <div className="text-center mb-12">
            <Link to="/pinterest-downloader">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Download Pinterest Videos Now →
              </Button>
            </Link>
          </div>

          <div className="space-y-12">
            {pinterestFaqData.map((category, idx) => (
              <section key={idx} className="glass-card rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4 text-primary">{category.category}</h2>
                <div>
                  {category.questions.map((item, qIdx) => (
                    <FAQItem key={qIdx} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Related Links */}
          <div className="mt-12 glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-4">Related Guides</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/pinterest-downloader" className="text-primary hover:underline flex items-center gap-2">
                  → Pinterest Video Downloader
                </Link>
              </li>
              <li>
                <Link to="/blog/how-to-download-pinterest-videos-free" className="text-primary hover:underline flex items-center gap-2">
                  → How to Download Pinterest Videos Free
                </Link>
              </li>
              <li>
                <Link to="/blog/pinterest-idea-pin-download-guide" className="text-primary hover:underline flex items-center gap-2">
                  → Pinterest Idea Pin Download Guide
                </Link>
              </li>
              <li>
                <Link to="/blog/best-pinterest-video-downloaders-2026" className="text-primary hover:underline flex items-center gap-2">
                  → Best Pinterest Video Downloaders 2026
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary hover:underline flex items-center gap-2">
                  → TikTok Downloader FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help! Reach out to us on Telegram.
            </p>
            <a
              href="https://t.me/GEN_ZDownloader"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PinterestFAQ;
