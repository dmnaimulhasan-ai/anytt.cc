import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL, getOrganizationSchema } from "@/lib/seo-config";

const DMCA = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="DMCA Policy - AnyTT Video Downloader"
        description="AnyTT's DMCA policy and copyright complaint procedure. Learn how to report copyright infringement and our content removal process."
        canonicalUrl={`${BASE_URL}/dmca`}
        keywords="AnyTT DMCA, copyright policy, content removal, DMCA takedown, copyright complaint"
        jsonLd={[getOrganizationSchema()]}
      />
      <Header />
      
      <main className="px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-card rounded-3xl p-6 md:p-10">
            <h1 className="text-section mb-8">DMCA Policy</h1>
            <p className="text-muted-foreground mb-8">Digital Millennium Copyright Act Compliance</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT respects the intellectual property rights of others and expects users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond promptly to valid copyright infringement notices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Our Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AnyTT is a video downloading tool that provides links to content hosted on third-party platforms (TikTok). We do not host, store, or control any video content. All videos remain on their original platforms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Reporting Copyright Infringement</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you believe your copyrighted work has been accessed through our service in a way that constitutes copyright infringement, please provide:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Identification of the copyrighted work claimed to be infringed</li>
                  <li>Identification of the URL or material that is infringing</li>
                  <li>Your contact information (name, email, phone number)</li>
                  <li>A statement that you have a good faith belief that the use is not authorized</li>
                  <li>A statement that the information is accurate, under penalty of perjury</li>
                  <li>Your physical or electronic signature</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">4. How to Submit a DMCA Notice</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Send your DMCA takedown notice via Telegram to: <a href="https://t.me/GEN_ZDownloader" className="text-primary hover:underline">@GEN_ZDownloader</a>
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Please include "DMCA Notice" in your message subject/first line.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">5. Our Response</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Upon receiving a valid DMCA notice, we will:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                  <li>Acknowledge receipt of your notice</li>
                  <li>Investigate the claim promptly</li>
                  <li>Take appropriate action, which may include blocking access to specific URLs</li>
                  <li>Notify you of the action taken</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">6. Counter-Notification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you believe content was removed due to mistake or misidentification, you may submit a counter-notification with the required information as specified in the DMCA.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">7. Repeat Infringers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate access for users who repeatedly infringe copyrights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">8. Good Faith</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Please note that misrepresentation of material as infringing can result in liability. Consider whether fair use applies before submitting a DMCA notice.
                </p>
              </section>

              <section className="bg-muted/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Contact for DMCA Issues</h2>
                <p className="text-muted-foreground">
                  <strong>Telegram:</strong> <a href="https://t.me/GEN_ZDownloader" className="text-primary hover:underline">@GEN_ZDownloader</a>
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  We aim to respond to all DMCA notices within 48 business hours.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DMCA;
