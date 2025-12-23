import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I download a TikTok video on Android? 📱",
    answer: "Open the TikTok app, find your video, tap Share → Copy Link. Paste it here and hit Go. It's literally that easy bestie.",
  },
  {
    question: "Does it work on iPhone/iPad? 🍎",
    answer: "Yup! Same process. For iOS 13+, you can save videos directly. Older versions might need the Documents app but we got you covered.",
  },
  {
    question: "Is this actually free? No cap? 💸",
    answer: "100% free forever! No hidden fees, no subscriptions, no bs. Download unlimited videos without paying a single cent.",
  },
  {
    question: "Can I really download without watermark? 🎨",
    answer: "That's literally the whole point! We remove TikTok watermarks so you get clean, HD videos. Chef's kiss 💋",
  },
  {
    question: "What formats can I download? 🎬",
    answer: "MP4 for videos (HD quality) and MP3 for audio-only downloads. Best of both worlds fr fr.",
  },
  {
    question: "Is this safe to use? 🔒",
    answer: "Absolutely safe! No sketchy software, no registration required, we don't store your data. Your privacy is our priority.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm text-muted-foreground mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>Got questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            <span className="gradient-text">FAQ</span>
          </h2>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-border/30 last:border-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-muted/30 text-foreground font-medium font-display group">
                  <span className="group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
