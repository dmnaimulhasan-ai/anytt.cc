import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getOrganizationSchema, getFAQSchema } from "@/lib/seo-config";

const privacyFaqs = [
  {
    question: "Does AnyTT collect my personal data?",
    answer: "No, AnyTT does not collect personal information like your name, email, or phone number. We only process the video URLs you submit temporarily."
  },
  {
    question: "Are my downloaded videos stored on AnyTT servers?",
    answer: "No, we do not store any downloaded videos. Videos are processed in real-time and sent directly to your device. Nothing is saved on our servers."
  },
  {
    question: "Does AnyTT use cookies?",
    answer: "We use minimal essential cookies for basic functionality and anonymous analytics. You can disable cookies in your browser settings."
  },
  {
    question: "Is my TikTok account safe when using AnyTT?",
    answer: "Yes, AnyTT never asks for your TikTok login credentials. We only need the public video URL to process downloads."
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy - AnyTT TikTok Video Downloader"
        description="Read AnyTT's privacy policy. Learn how we protect your data and respect your privacy when using our free TikTok video downloader service."
        canonicalUrl={`${BASE_URL}/privacy-policy`}
        keywords="AnyTT privacy policy, tiktok downloader privacy, data protection, user privacy, safe tiktok download"
        jsonLd={[getOrganizationSchema(), getFAQSchema(privacyFaqs)]}
      />
      <Header />
      
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-card rounded-3xl p-6 md:p-10">
            <h1 className="text-section mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our TikTok video downloader service at anytt.cc.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect minimal information to provide our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Video URLs:</strong> The TikTok links you paste to download videos (not stored permanently)</li>
                  <li><strong>Usage Data:</strong> Anonymous statistics like page views and download counts</li>
                  <li><strong>Device Info:</strong> Browser type and operating system for compatibility</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Information We Don't Collect</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Personal identification information (name, email, phone)</li>
                  <li>TikTok account credentials or login information</li>
                  <li>Downloaded video content</li>
                  <li>Browsing history outside our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. How We Use Information</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Process your TikTok video download requests</li>
                  <li>Improve our service and user experience</li>
                  <li>Analyze usage patterns anonymously</li>
                  <li>Prevent abuse and ensure service stability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use essential cookies for basic functionality and analytics cookies to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not work properly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for analytics and advertising. These services have their own privacy policies. We do not sell your data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement security measures to protect against unauthorized access. However, no internet transmission is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 13. We do not knowingly collect information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this policy periodically. Changes will be posted on this page with an updated date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy concerns, contact us via Telegram: <a href="https://t.me/GEN_ZDownloader" className="text-primary hover:underline">@GEN_ZDownloader</a>
                </p>
              </section>
            </div>
          </div>

          {/* FAQ Section for Rich Snippets */}
          <div className="mt-12 glass-card rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-bold font-display mb-6">Privacy FAQ</h2>
            <div className="space-y-4">
              {privacyFaqs.map((faq, index) => (
                <details key={index} className="border-b border-border pb-4 last:border-0">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center py-2">
                    <span>{faq.question}</span>
                    <span className="text-muted-foreground">+</span>
                  </summary>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
