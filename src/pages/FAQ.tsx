import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getFAQSchema, getOrganizationSchema } from "@/lib/seo-config";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is AnyTT?",
        answer: "AnyTT is a free online TikTok video downloader that allows you to save TikTok videos without watermarks. It's fast, free, and works on all devices."
      },
      {
        question: "Is AnyTT free to use?",
        answer: "Yes, AnyTT is 100% free with no hidden fees, subscriptions, or download limits. You can download unlimited TikTok videos without paying anything."
      },
      {
        question: "Do I need to create an account?",
        answer: "No registration or account is required. Simply paste the TikTok video URL and download instantly."
      }
    ]
  },
  {
    category: "TikTok Downloads",
    questions: [
      {
        question: "How do I download TikTok videos without watermark?",
        answer: "Copy the TikTok video link, paste it into AnyTT, and click Download. The video will be saved without the TikTok watermark in HD quality."
      },
      {
        question: "Can I download TikTok audio/music?",
        answer: "Yes! AnyTT extracts the audio from TikTok videos so you can download just the music in MP3 format."
      },
      {
        question: "Does it work with private TikTok videos?",
        answer: "No, only public TikTok videos can be downloaded. Private videos require the owner's permission."
      },
      {
        question: "Can I download TikTok slideshows?",
        answer: "Yes, TikTok slideshows and photo carousels can be downloaded just like regular videos."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        question: "Does AnyTT work on iPhone/iPad?",
        answer: "Yes! AnyTT works on all iOS devices. After downloading, videos are saved to your Files or Photos app."
      },
      {
        question: "Does it work on Android?",
        answer: "Yes, AnyTT works perfectly on Android phones and tablets. Videos are saved to your Downloads folder."
      },
      {
        question: "What video quality is available?",
        answer: "We offer HD quality downloads (usually 720p or 1080p) depending on the original TikTok video quality."
      },
      {
        question: "Why is my download slow?",
        answer: "Download speed depends on your internet connection. Try during off-peak hours or check your connection."
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

const FAQPage = () => {
  const allFaqs = faqData.flatMap(cat => cat.questions);

  return (
    <div className="min-h-screen bg-background">
        <SEOHead
          title="FAQ - AnyTT TikTok Video Downloader | Frequently Asked Questions"
          description="Get answers to common questions about downloading TikTok videos with AnyTT. Learn how to save TikTok videos without watermark on any device."
        canonicalUrl={`${BASE_URL}/faq`}
        keywords="AnyTT FAQ, TikTok downloader help, TikTok download questions, how to download TikTok videos, video saver FAQ"
        jsonLd={[
          getOrganizationSchema(),
          getFAQSchema(allFaqs)
        ]}
      />
      <Header />
      
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-section mb-4">Frequently Asked Questions</h1>
            <p className="text-subhero text-muted-foreground">
              Everything you need to know about using AnyTT
            </p>
          </div>

          <div className="space-y-12">
            {faqData.map((category, idx) => (
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

export default FAQPage;
