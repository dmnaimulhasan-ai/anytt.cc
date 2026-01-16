import { Clipboard, Search, Download } from "lucide-react";

const steps = [
  {
    icon: Clipboard,
    step: "1",
    title: "Copy Link",
    description: "Copy the video link from TikTok or Facebook app",
  },
  {
    icon: Search,
    step: "2",
    title: "Paste & Search",
    description: "Paste the link above and tap the search button",
  },
  {
    icon: Download,
    step: "3",
    title: "Download",
    description: "Choose quality and download your video instantly",
  },
];

/**
 * How To Section - Simple 3-step guide
 * Mobile-first, clean design
 */
const HowToSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-section text-center mb-4">
          How to <span className="gradient-text">Download</span>
        </h2>
        <p className="text-center text-muted-foreground text-subhero mb-12 max-w-md mx-auto">
          It's super easy. Just 3 simple steps.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 text-center relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                {item.step}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 mt-2 rounded-2xl bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
