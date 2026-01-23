import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getOrganizationSchema, getFAQSchema } from "@/lib/seo-config";

const termsFaqs = [
  {
    question: "Can I use AnyTT for commercial purposes?",
    answer: "No, AnyTT is intended for personal, non-commercial use only. You should not use downloaded content for commercial purposes without permission from the original creator."
  },
  {
    question: "Is downloading TikTok videos legal?",
    answer: "Downloading videos for personal use is generally acceptable. However, you should respect copyright laws and the creator's rights. Do not redistribute copyrighted content without permission."
  },
  {
    question: "What happens if I misuse the service?",
    answer: "We reserve the right to terminate access for users who abuse the service, violate copyright laws, or engage in prohibited activities."
  },
  {
    question: "Does AnyTT guarantee service availability?",
    answer: "We strive to keep AnyTT available 24/7, but we cannot guarantee uninterrupted service. We may modify or discontinue features at any time."
  }
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service - AnyTT TikTok Video Downloader"
        description="Read AnyTT's terms of service. Understand the rules and guidelines for using our free TikTok video downloader."
        canonicalUrl={`${BASE_URL}/terms-of-service`}
        keywords="AnyTT terms of service, tiktok downloader terms, usage guidelines, legal terms, tiktok download rules"
        jsonLd={[getOrganizationSchema(), getFAQSchema(termsFaqs)]}
      />
      <Header />
      
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-card rounded-3xl p-6 md:p-10">
            <h1 className="text-section mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using AnyTT (anytt.cc), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT is a free online tool that allows users to download TikTok videos for personal use. We do not host any video content; we only provide links to content hosted on third-party platforms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use AnyTT only for personal, non-commercial purposes</li>
                  <li>Respect copyright and intellectual property rights</li>
                  <li>Not redistribute downloaded content without permission</li>
                  <li>Not use automated tools to abuse the service</li>
                  <li>Comply with all applicable laws in your jurisdiction</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. Copyright Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All videos downloaded through AnyTT remain the property of their original creators. Users are responsible for ensuring they have the right to download and use any content. AnyTT is not responsible for copyright infringement by users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Prohibited Activities</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Downloading content for commercial purposes without authorization</li>
                  <li>Attempting to reverse engineer or hack the service</li>
                  <li>Using the service to violate any laws</li>
                  <li>Submitting malicious URLs or attempting attacks</li>
                  <li>Overwhelming the service with excessive requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to keep AnyTT available 24/7, but we cannot guarantee uninterrupted service. We may modify or discontinue features at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or availability of any content downloaded through our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT shall not be liable for any damages arising from the use or inability to use our service, including but not limited to direct, indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of AnyTT after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">10. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us via Telegram: <a href="https://t.me/GEN_ZDownloader" className="text-primary hover:underline">@GEN_ZDownloader</a>
                </p>
              </section>
            </div>
          </div>

          {/* FAQ Section for Rich Snippets */}
          <div className="mt-12 glass-card rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-bold font-display mb-6">Terms FAQ</h2>
            <div className="space-y-4">
              {termsFaqs.map((faq, index) => (
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

export default TermsOfService;
