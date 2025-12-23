import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this actually free? 💸",
    answer: "Yep! 100% free, no cap. No hidden fees, no subscriptions, no bs. Download unlimited videos from any platform.",
  },
  {
    question: "What platforms do you support? 📱",
    answer: "We support TikTok, Instagram Reels, YouTube Shorts, Facebook videos, X/Twitter videos, and Snapchat! Just paste any link.",
  },
  {
    question: "Does it work on iPhone? 🍎",
    answer: "For sure! Same process. iOS 13+ can save directly. We got you.",
  },
  {
    question: "No watermark fr? 🎨",
    answer: "That's the whole point bestie! Clean HD videos without platform watermarks.",
  },
  {
    question: "Is this safe to use? 🔒",
    answer: "Absolutely! No sketchy downloads, no registration. We don't store anything.",
  },
  {
    question: "Can I download multiple videos? 📦",
    answer: "Yes! Use batch mode to download up to 100 videos at once. Mix and match from different platforms too!",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-display mb-2">
            <span className="gradient-text">FAQ</span> 🤔
          </h2>
          <p className="text-muted-foreground">Got questions? We got answers.</p>
        </div>
        
        <div className="glass-card rounded-3xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-border/20 last:border-0"
              >
                <AccordionTrigger className="px-5 md:px-6 py-5 text-left hover:no-underline hover:bg-muted/20 active:bg-muted/30 text-foreground font-bold font-display text-base group">
                  <span className="group-hover:text-primary transition-colors pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 md:px-6 pb-5 text-muted-foreground leading-relaxed">
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
