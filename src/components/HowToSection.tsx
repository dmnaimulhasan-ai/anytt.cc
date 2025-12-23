import { Link, ClipboardPaste, Download } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Find a TikTok video link",
    description: "Open TikTok, find a video and copy its URL.",
  },
  {
    icon: ClipboardPaste,
    title: "Paste the video URL",
    description: 'Paste the video URL to the input box and click the "Search" button.',
  },
  {
    icon: Download,
    title: "Download the Video or Audio",
    description: 'Click the "Download" buttons to save the video or audio.',
  },
];

const HowToSection = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          How to Use TikTok Video Downloader
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-card text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
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
