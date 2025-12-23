import { Link, ClipboardPaste, Download, Sparkles, Zap, Shield } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Find the vibe ✨",
    description: "Open TikTok and copy the video URL",
    color: "text-primary",
    glow: "shadow-glow-pink",
  },
  {
    icon: ClipboardPaste,
    title: "Paste & slay 💅",
    description: "Paste the URL and tap Download",
    color: "text-secondary",
    glow: "shadow-glow-cyan",
  },
  {
    icon: Download,
    title: "Get your video 🔥",
    description: "Download in HD without watermark",
    color: "text-accent",
    glow: "shadow-glow-purple",
  },
];

const features = [
  { icon: Zap, text: "Fast" },
  { icon: Shield, text: "Safe" },
  { icon: Sparkles, text: "No watermark" },
];

const HowToSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold font-display mb-3 md:mb-4">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base px-4">
            Three easy steps. No drama, just vibes ✌️
          </p>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 md:px-4 py-2 glass-card rounded-full text-xs md:text-sm"
            >
              <feature.icon className="h-4 w-4 text-primary" />
              <span className="text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card text-center p-6 md:p-8 glass-card rounded-2xl md:rounded-3xl relative group"
            >
              <div className="absolute -top-3 -right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xs md:text-sm">
                {index + 1}
              </div>
              <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 glass-card rounded-xl md:rounded-2xl flex items-center justify-center ${step.glow} transition-shadow group-hover:shadow-neon`}>
                <step.icon className={`h-6 w-6 md:h-8 md:w-8 ${step.color}`} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 font-display">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
