import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I download on Android? 📱",
    answer: "Open TikTok, find your video, tap Share → Copy Link. Paste it here and hit Download. Easy!",
  },
  {
    question: "Does it work on iPhone? 🍎",
    answer: "Yup! Same process. For iOS 13+, you can save videos directly.",
  },
  {
    question: "Is this actually free? 💸",
    answer: "100% free forever! No hidden fees, no subscriptions, no bs.",
  },
  {
    question: "No watermark for real? 🎨",
    answer: "That's the whole point! Clean HD videos without TikTok watermarks.",
  },
  {
    question: "Is this safe? 🔒",
    answer: "Absolutely! No sketchy software, no registration, we don't store your data.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 glass-card rounded-full text-xs md:text-sm text-muted-foreground mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>Got questions?</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold font-display">
            <span className="gradient-text">FAQ</span>
          </h2>
        </div>
        
        <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-border/30 last:border-0"
              >
                <AccordionTrigger className="px-4 md:px-6 py-4 md:py-5 text-left hover:no-underline hover:bg-muted/30 active:bg-muted/50 text-foreground font-medium font-display group text-sm md:text-base">
                  <span className="group-hover:text-primary transition-colors pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-muted-foreground leading-relaxed text-sm">
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
