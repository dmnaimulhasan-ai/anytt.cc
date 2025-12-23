import { Link, ClipboardPaste, Download, Sparkles, Zap, Shield, Heart } from "lucide-react";

const steps = [
  {
    icon: Link,
    emoji: "🔗",
    title: "Copy the link",
    description: "Find a TikTok & copy URL",
    color: "text-primary",
    glow: "shadow-glow-pink",
  },
  {
    icon: ClipboardPaste,
    emoji: "📋",
    title: "Paste it here",
    description: "Drop the link & hit go",
    color: "text-secondary",
    glow: "shadow-glow-cyan",
  },
  {
    icon: Download,
    emoji: "⬇️",
    title: "Download",
    description: "Get HD video, no watermark",
    color: "text-accent",
    glow: "shadow-glow-purple",
  },
];

const features = [
  { icon: Zap, text: "Fast af", emoji: "⚡" },
  { icon: Shield, text: "100% Safe", emoji: "🔒" },
  { icon: Heart, text: "Free forever", emoji: "💕" },
];

const HowToSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black font-display mb-4">
            How it <span className="gradient-text">works</span> ✨
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base md:text-lg">
            3 steps. That's literally it. 
          </p>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-full text-sm font-medium"
            >
              <span>{feature.emoji}</span>
              <span className="text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card text-center p-7 glass-card rounded-3xl relative group cursor-default"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary flex items-center justify-center text-primary-foreground font-black text-lg shadow-neon">
                {index + 1}
              </div>
              
              <div className="text-4xl mb-4">{step.emoji}</div>
              
              <h3 className="text-lg font-bold text-foreground mb-2 font-display">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
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
