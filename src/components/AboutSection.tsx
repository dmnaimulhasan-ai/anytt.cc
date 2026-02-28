import { Shield, Zap, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "100% Safe",
    description: "No registration required. Anytt cc never stores your data or videos.",
  },
  {
    icon: Zap,
    title: "Super Fast",
    description: "Anytt cc downloads videos in seconds with optimized servers.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "iPhone, Android, PC, Mac - Anytt cc works on any device with a browser.",
  },
  {
    icon: Globe,
    title: "No Limits",
    description: "Unlimited downloads with Anytt cc, completely free. No hidden fees.",
  },
];

/**
 * About Section - Feature highlights
 * Clean cards, mobile-first layout
 */
const AboutSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-section text-center mb-3 md:mb-4">
          Why Choose <span className="gradient-text">Anytt cc</span> TikTok Downloader?
        </h2>
        <p className="text-center text-muted-foreground text-subhero mb-8 md:mb-12 max-w-lg mx-auto">
          Anytt cc - The easiest way to download TikTok videos without watermark
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What is Anytt cc - SEO content block */}
        <div className="mt-10 text-center text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-foreground mb-3">What is Anytt cc?</h3>
          <p>
            Anytt cc is a fast, free, and safe online tool for downloading TikTok videos without watermark. It works on all devices — iPhone, Android, Windows, Mac, and Chromebook — directly from your browser. No app needed, no sign-up required. Anytt cc supports HD 1080p and 4K downloads, MP3 audio extraction, batch downloads, slideshows, stories, and more.{' '}
            <Link to="/faq" className="text-primary hover:underline">Read our FAQ</Link> or{' '}
            <Link to="/blog" className="text-primary hover:underline">explore our guides</Link> to learn more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
