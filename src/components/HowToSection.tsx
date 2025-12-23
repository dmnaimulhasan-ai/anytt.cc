import { Link, ClipboardPaste, Download, Sparkles, Zap, Shield } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Find the vibe ✨",
    description: "Open TikTok, find a video and copy its URL. It's giving easy.",
    color: "text-primary",
    glow: "shadow-glow-pink",
  },
  {
    icon: ClipboardPaste,
    title: "Paste & slay 💅",
    description: 'Paste the video URL and click "Go" — no cap, that\'s it.',
    color: "text-secondary",
    glow: "shadow-glow-cyan",
  },
  {
    icon: Download,
    title: "Download & flex 🔥",
    description: "Get your video in HD without watermark. Main character energy fr.",
    color: "text-accent",
    glow: "shadow-glow-purple",
  },
];

const features = [
  { icon: Zap, text: "Lightning fast" },
  { icon: Shield, text: "100% Safe" },
  { icon: Sparkles, text: "No watermark" },
];

const HowToSection = () => {
  return (
    <section className="py-20 px-6 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three easy steps to get your favorite TikToks. No drama, no stress, just vibes ✌️
          </p>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm"
            >
              <feature.icon className="h-4 w-4 text-primary" />
              <span className="text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card text-center p-8 glass-card rounded-3xl relative group"
            >
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              <div className={`w-16 h-16 mx-auto mb-4 glass-card rounded-2xl flex items-center justify-center ${step.glow} transition-shadow group-hover:shadow-neon`}>
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
