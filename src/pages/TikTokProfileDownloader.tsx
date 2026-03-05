import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo-config";

const ProfileDownloader = lazy(() => import("@/components/ProfileDownloader"));

const faqs = [
  {
    question: "How does the TikTok Profile Downloader work?",
    answer: "Enter any public TikTok username and we'll show all their recent videos. Select the ones you want and batch download them all at once — no watermark, HD quality!"
  },
  {
    question: "Can I download all videos from a TikTok profile?",
    answer: "Yes! Use the 'Select All' button to choose every video, then click 'Download All'. Videos are downloaded one by one with no watermark."
  },
  {
    question: "Is the Profile Downloader free?",
    answer: "100% free, no registration, no limits. Just enter a username and start downloading."
  },
];

const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const TikTokProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="TikTok Profile Downloader - Download All Videos from Any User | AnyTT"
        description="Download all TikTok videos from any user profile. Enter a username, select videos, and batch download without watermark in HD. Free, no login required."
        canonicalUrl={`${BASE_URL}/tiktok-profile-downloader`}
        keywords="tiktok profile downloader, download all tiktok videos, tiktok username downloader, batch download tiktok, tiktok user videos download, download tiktok profile videos"
        jsonLd={[
          getBreadcrumbSchema([
            { name: "Home", url: BASE_URL },
            { name: "TikTok Profile Downloader", url: `${BASE_URL}/tiktok-profile-downloader` }
          ]),
          getFAQSchema(faqs),
        ]}
      />
      <Header />
      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-4" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container mx-auto max-w-4xl">
            <Suspense fallback={<SectionLoader />}>
              <ProfileDownloader />
            </Suspense>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold font-display text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TikTokProfilePage;
