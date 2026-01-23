import { Shield, Zap, Smartphone, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Safe",
    description: "No registration required. We never store your data or videos.",
  },
  {
    icon: Zap,
    title: "Super Fast",
    description: "Download videos in seconds with our optimized servers.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "iPhone, Android, PC, Mac - works on any device with a browser.",
  },
  {
    icon: Globe,
    title: "No Limits",
    description: "Unlimited downloads, completely free. No hidden fees.",
  },
];

/**
 * About Section - Feature highlights
 * Clean cards, mobile-first layout
 */
const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-section text-center mb-4">
          Why <span className="gradient-text">Anytt cc</span>?
        </h2>
        <p className="text-center text-muted-foreground text-subhero mb-12 max-w-lg mx-auto">
          Anytt cc - The easiest way to download videos without watermark
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
      </div>
    </section>
  );
};

export default AboutSection;
